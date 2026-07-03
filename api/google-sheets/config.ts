import path from "path";
import fs from "fs";
import { kv } from "@vercel/kv";

const DATA_DIR = path.join(process.cwd(), "data");
const GOOGLE_CONFIG_FILE = path.join(DATA_DIR, "google-config.json");
const useKV = !!process.env.KV_REST_API_URL;

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
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(GOOGLE_CONFIG_FILE, JSON.stringify(config, null, 2), "utf-8");
    } catch (error) {
      console.error("Error writing google config:", error);
    }
  }
}

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || "1234";

export default async function handler(req: any, res: any) {
  const passcode = req.headers["x-admin-passcode"] || req.query.passcode;

  if (passcode !== ADMIN_PASSCODE) {
    return res.status(401).json({ error: "Passcode admin שגוי או חסר" });
  }

  if (req.method === "GET") {
    const config: any = await readGoogleConfig();
    return res.json({
      spreadsheetId: config.spreadsheetId || "",
      autoSync: config.autoSync !== false,
      hasToken: !!config.accessToken,
      webhookUrl: config.webhookUrl || ""
    });
  }

  if (req.method === "POST") {
    const { spreadsheetId, accessToken, autoSync, webhookUrl } = req.body;
    const config: any = await readGoogleConfig();

    if (spreadsheetId !== undefined) config.spreadsheetId = spreadsheetId;
    if (accessToken !== undefined) config.accessToken = accessToken;
    if (autoSync !== undefined) config.autoSync = autoSync;
    if (webhookUrl !== undefined) config.webhookUrl = webhookUrl;

    await writeGoogleConfig(config);
    return res.json({
      success: true,
      config: {
        spreadsheetId: config.spreadsheetId,
        autoSync: config.autoSync,
        hasToken: !!config.accessToken,
        webhookUrl: config.webhookUrl
      }
    });
  }

  res.status(405).json({ error: "Method not allowed" });
}
