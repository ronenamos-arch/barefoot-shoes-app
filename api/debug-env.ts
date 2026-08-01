export default function handler(req: any, res: any) {
  res.status(200).json({
    hasWebhookUrl: !!process.env.GOOGLE_SHEETS_WEBHOOK_URL,
    webhookUrlLength: (process.env.GOOGLE_SHEETS_WEBHOOK_URL || "").length,
    hasKvUrl: !!process.env.KV_REST_API_URL,
    kvUrlPrefix: (process.env.KV_REST_API_URL || "").slice(0, 12),
    allEnvKeysContainingGoogle: Object.keys(process.env).filter(k => k.toUpperCase().includes("GOOGLE")),
    allEnvKeysContainingWebhook: Object.keys(process.env).filter(k => k.toUpperCase().includes("WEBHOOK")),
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV
  });
}
