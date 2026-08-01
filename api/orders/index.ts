import path from "path";
import fs from "fs";
import { kv } from "@vercel/kv";

const DATA_DIR = path.join(process.cwd(), "data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");
const GOOGLE_CONFIG_FILE = path.join(DATA_DIR, "google-config.json");
const useKV = !!process.env.KV_REST_API_URL;

async function readOrders() {
  if (useKV) {
    try {
      const data = await kv.get("orders");
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Error reading orders from KV:", error);
      return [];
    }
  } else {
    try {
      if (!fs.existsSync(ORDERS_FILE)) return [];
      const data = fs.readFileSync(ORDERS_FILE, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error reading orders file:", error);
      return [];
    }
  }
}

async function writeOrders(orders: any[]) {
  if (useKV) {
    try {
      await kv.set("orders", orders);
    } catch (error) {
      console.error("Error writing orders to KV:", error);
    }
  } else {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf-8");
    } catch (error) {
      console.error("Error writing orders file:", error);
    }
  }
}

async function readGoogleConfig() {
  if (useKV) {
    try {
      const data = await kv.get("google-config");
      if (data) return data;
    } catch (error) {
      console.error("Error reading google config from KV:", error);
    }
  } else {
    try {
      if (fs.existsSync(GOOGLE_CONFIG_FILE)) {
        const data = fs.readFileSync(GOOGLE_CONFIG_FILE, "utf-8");
        return JSON.parse(data);
      }
    } catch (error) {
      console.error("Error reading google config:", error);
    }
  }
  return { spreadsheetId: "", accessToken: "", webhookUrl: "", autoSync: true };
}

async function appendOrderToGoogleSheet(order: any) {
  const config = await readGoogleConfig() as any;
  const webhookUrl = config.webhookUrl || process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    return { synced: false, debug: "no webhookUrl resolved (config empty and GOOGLE_SHEETS_WEBHOOK_URL env var not set)" };
  }

  {
    try {
      const formattedItems = order.items && Array.isArray(order.items)
        ? order.items.map((item: any) => `${item.name} (${item.color}, מידה ${item.size}) x${item.quantity}`).join(", ")
        : "";
      const dateStr = new Date(order.createdAt).toLocaleString("he-IL", { timeZone: "Asia/Jerusalem" });

      const payload = {
        id: order.id,
        createdAt: dateStr,
        fullName: order.fullName,
        phoneNumber: order.phoneNumber,
        city: order.city,
        address: order.address,
        email: order.email || "",
        totalPrice: `₪${order.totalPrice}`,
        items: formattedItems,
        paymentMethod: order.paymentMethod,
        status: order.status,
        trackingNumber: order.trackingNumber || ""
      };

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        console.log(`Successfully pushed order ${order.id} to Google Sheets Webhook`);
        return { synced: true, debug: "ok" };
      } else {
        const errText = await response.text();
        console.error(`Failed pushing to Google Sheets Webhook: ${response.status} ${errText}`);
        return { synced: false, debug: `webhook responded ${response.status}: ${errText.slice(0, 200)}` };
      }
    } catch (error: any) {
      console.error("Error pushing to Webhook:", error);
      return { synced: false, debug: `fetch threw: ${error?.message || error}` };
    }
  }
}

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || "1234";

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const {
      fullName,
      phoneNumber,
      city,
      address,
      email,
      paymentMethod,
      items,
      totalPrice,
      paymentDetails
    } = req.body;

    if (!fullName || !phoneNumber || !city || !address) {
      return res.status(400).json({ error: "שדות חובה חסרים" });
    }

    const orders = await readOrders();
    const newOrder = {
      id: "ORD-" + Math.floor(Math.random() * 900000 + 100000),
      fullName,
      phoneNumber,
      city,
      address,
      email: email || "",
      paymentMethod,
      items: items || [],
      totalPrice,
      paymentDetails: paymentDetails || {},
      status: "חדש",
      trackingNumber: "",
      createdAt: new Date().toISOString(),
      syncedToGoogle: false
    };

    const syncResult = await appendOrderToGoogleSheet(newOrder);
    if (syncResult.synced) {
      newOrder.syncedToGoogle = true;
    }

    orders.unshift(newOrder);
    await writeOrders(orders);

    return res.status(201).json({ success: true, order: newOrder, syncDebug: syncResult.debug });
  }

  if (req.method === "GET") {
    const passcode = req.headers["x-admin-passcode"] || req.query.passcode;
    if (passcode !== ADMIN_PASSCODE) {
      return res.status(401).json({ error: "Passcode admin שגוי או חסר" });
    }

    const orders = await readOrders();
    return res.json({ orders });
  }

  res.status(405).json({ error: "Method not allowed" });
}
