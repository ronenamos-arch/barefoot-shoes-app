import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { kv } from "@vercel/kv";

const app = express();
const PORT = 3000;
const DATA_DIR = path.join(process.cwd(), "data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");
const GOOGLE_CONFIG_FILE = path.join(DATA_DIR, "google-config.json");

// Ensure data directory and orders file exist if not on Vercel
if (!process.env.VERCEL) {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(ORDERS_FILE)) {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2), "utf-8");
  }
}

app.use(express.json());

// Helper to check if KV is available
const useKV = !!process.env.KV_REST_API_URL;

// Helper to read orders
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
      const data = fs.readFileSync(ORDERS_FILE, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error reading orders file:", error);
      return [];
    }
  }
}

// Helper to write orders
async function writeOrders(orders: any[]) {
  if (useKV) {
    try {
      await kv.set("orders", orders);
    } catch (error) {
      console.error("Error writing orders to KV:", error);
    }
  } else {
    try {
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

async function writeGoogleConfig(config: any) {
  if (useKV) {
    try {
      await kv.set("google-config", config);
    } catch (error) {
      console.error("Error writing google config to KV:", error);
    }
  } else {
    try {
      fs.writeFileSync(GOOGLE_CONFIG_FILE, JSON.stringify(config, null, 2), "utf-8");
    } catch (error) {
      console.error("Error writing google config:", error);
    }
  }
}

async function appendOrderToGoogleSheet(order: any) {
  const config = await readGoogleConfig() as any;

  // 1. If a direct Webhook URL is configured, use it (100% reliable, permanent, works for guests without login)
  if (config.webhookUrl) {
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

      const response = await fetch(config.webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        console.log(`Successfully pushed order ${order.id} to Google Sheets Webhook`);
        return true;
      } else {
        const errText = await response.text();
        console.error(`Failed pushing to Google Sheets Webhook: ${response.status} ${errText}`);
      }
    } catch (error) {
      console.error("Error pushing to Webhook:", error);
    }
  }

  // 2. Fallback to standard Google Sheets API (Requires active Admin OAuth session)
  if (!config.spreadsheetId || !config.accessToken || !config.autoSync) {
    return false;
  }

  try {
    const range = "הזמנות!A:L";
    const formattedItems = order.items && Array.isArray(order.items)
      ? order.items.map((item: any) => `${item.name} (${item.color}, מידה ${item.size}) x${item.quantity}`).join(", ")
      : "";

    const dateStr = new Date(order.createdAt).toLocaleString("he-IL", { timeZone: "Asia/Jerusalem" });

    const values = [
      [
        order.id,
        dateStr,
        order.fullName,
        order.phoneNumber,
        order.city,
        order.address,
        order.email || "",
        `₪${order.totalPrice}`,
        formattedItems,
        order.paymentMethod,
        order.status,
        order.trackingNumber || ""
      ]
    ];

    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${config.accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ values })
    });

    if (response.ok) {
      console.log(`Successfully appended order ${order.id} to Google Sheet`);
      return true;
    } else {
      const errText = await response.text();
      console.error(`Failed to append order to Google Sheet: ${response.status} ${errText}`);
      return false;
    }
  } catch (error) {
    console.error("Error appending order to Google Sheet:", error);
    return false;
  }
}

// Secret Passcode for Admin Actions
const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || "1234";

// Middleware to check admin passcode
const requireAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const passcode = req.headers["x-admin-passcode"] || req.query.passcode;
  if (passcode === ADMIN_PASSCODE) {
    next();
  } else {
    res.status(401).json({ error: "Passcode admin שגוי או חסר" });
  }
};

// --- API ROUTES ---

// 0. Get PayPal Configuration from server environment variables
app.get("/api/paypal-config", (req, res) => {
  res.json({
    paypalClientId: process.env.VITE_PAYPAL_CLIENT_ID || process.env.PAYPAL_CLIENT_ID || "",
    paypalHostedButtonId: process.env.VITE_PAYPAL_HOSTED_BUTTON_ID || process.env.PAYPAL_HOSTED_BUTTON_ID || "",
    paypalCustomUrl: process.env.VITE_PAYPAL_CUSTOM_URL || process.env.PAYPAL_CUSTOM_URL || "https://www.paypal.com/ncp/payment/SB9M86R8YG8LW"
  });
});

// 1. Submit a new order
app.post("/api/orders", async (req, res) => {
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
    status: "חדש", // "חדש" | "בטיפול" | "נשלח" | "בוטל"
    trackingNumber: "",
    createdAt: new Date().toISOString(),
    syncedToGoogle: false
  };

  // Try appending to Google Sheet if configured
  const synced = await appendOrderToGoogleSheet(newOrder);
  if (synced) {
    newOrder.syncedToGoogle = true;
  }

  orders.unshift(newOrder);
  await writeOrders(orders);

  res.status(201).json({ success: true, order: newOrder });
});

// Google Sheets Configuration endpoints
app.get("/api/google-sheets/config", async (req, res) => {
  const config: any = await readGoogleConfig();
  res.json({
    spreadsheetId: config.spreadsheetId || "",
    autoSync: config.autoSync !== false,
    hasToken: !!config.accessToken,
    webhookUrl: config.webhookUrl || ""
  });
});

app.post("/api/google-sheets/config", async (req, res) => {
  const { spreadsheetId, accessToken, autoSync, webhookUrl } = req.body;
  const config: any = await readGoogleConfig();

  if (spreadsheetId !== undefined) config.spreadsheetId = spreadsheetId;
  if (accessToken !== undefined) config.accessToken = accessToken;
  if (autoSync !== undefined) config.autoSync = autoSync;
  if (webhookUrl !== undefined) config.webhookUrl = webhookUrl;

  await writeGoogleConfig(config);
  res.json({
    success: true,
    config: {
      spreadsheetId: config.spreadsheetId,
      autoSync: config.autoSync,
      hasToken: !!config.accessToken,
      webhookUrl: config.webhookUrl
    }
  });
});

// 2. Get all orders (Admin only)
app.get("/api/orders", requireAdmin, async (req, res) => {
  const orders = await readOrders();
  res.json({ orders });
});

// 3. Update order status or tracking number (Admin only)
app.put("/api/orders/:id", requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { status, trackingNumber } = req.body;

  const orders = await readOrders();
  const index = orders.findIndex((o: any) => o.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "הזמנה לא נמצאה" });
  }

  if (status !== undefined) {
    orders[index].status = status;
  }
  if (trackingNumber !== undefined) {
    orders[index].trackingNumber = trackingNumber;
  }

  await writeOrders(orders);
  res.json({ success: true, order: orders[index] });
});

// 4. Delete/Archive order (Admin only)
app.delete("/api/orders/:id", requireAdmin, async (req, res) => {
  const { id } = req.params;
  let orders = await readOrders();
  const index = orders.findIndex((o: any) => o.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "הזמנה לא נמצאה" });
  }

  orders.splice(index, 1);
  await writeOrders(orders);
  res.json({ success: true, message: "ההזמנה נמחקה בהצלחה" });
});

// --- VITE MIDDLEWARE SETUP FOR DEV VS STATIC PROD ---
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    // Serve static files, but skip API routes
    app.use((req, res, next) => {
      if (req.path.startsWith("/api/")) {
        next();
      } else {
        express.static(distPath)(req, res, next);
      }
    });
    // SPA fallback for non-API routes
    app.get("*", (req, res) => {
      if (!req.path.startsWith("/api/")) {
        res.sendFile(path.join(distPath, "index.html"));
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

if (!process.env.VERCEL) {
  startServer();
}

export default app;
