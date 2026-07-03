export default function handler(req: any, res: any) {
  res.json({
    paypalClientId: process.env.VITE_PAYPAL_CLIENT_ID || process.env.PAYPAL_CLIENT_ID || "",
    paypalHostedButtonId: process.env.VITE_PAYPAL_HOSTED_BUTTON_ID || process.env.PAYPAL_HOSTED_BUTTON_ID || "",
    paypalCustomUrl: process.env.VITE_PAYPAL_CUSTOM_URL || process.env.PAYPAL_CUSTOM_URL || "https://www.paypal.com/ncp/payment/SB9M86R8YG8LW"
  });
}
