// Client-side Google Sheets API integration

export interface GoogleSheetConfig {
  spreadsheetId: string;
  autoSync: boolean;
  hasToken: boolean;
  webhookUrl?: string;
}

// 1. Create a brand new Google Spreadsheet with headers
export async function createOrdersSpreadsheet(accessToken: string): Promise<string> {
  const response = await fetch("https://sheets.googleapis.com/v4/spreadsheets", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      properties: {
        title: "Barefoot Israel - הזמנות חנות 👟"
      },
      sheets: [
        {
          properties: {
            title: "הזמנות"
          }
        }
      ]
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`שגיאה ביצירת גיליון: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  const spreadsheetId = data.spreadsheetId;

  // Initialize Headers
  await setupSpreadsheetHeaders(spreadsheetId, accessToken);

  return spreadsheetId;
}

// 2. Write headers to the first row
export async function setupSpreadsheetHeaders(spreadsheetId: string, accessToken: string): Promise<void> {
  const headers = [
    [
      "מזהה הזמנה",
      "תאריך ושעה",
      "שם לקוח",
      "טלפון",
      "עיר",
      "כתובת",
      "אימייל",
      "סכום כולל",
      "פריטים",
      "אמצעי תשלום",
      "סטטוס",
      "מספר מעקב"
    ]
  ];

  const range = "הזמנות!A1:L1";
  const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}?valueInputOption=USER_ENTERED`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ values: headers })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`שגיאה בכתיבת כותרות הגיליון: ${errorText}`);
  }
}

// 3. Clear data from A2:L1000 (used before a full mirror sync)
export async function clearSpreadsheetData(spreadsheetId: string, accessToken: string): Promise<void> {
  const range = "הזמנות!A2:L1000";
  await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}:clear`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  });
}

// 4. Upload/Overwrite sheet with all orders (Absolute Mirror)
export async function syncAllOrdersToSheet(
  spreadsheetId: string,
  accessToken: string,
  orders: any[]
): Promise<void> {
  // First clear old rows to prevent leftovers if order count decreases
  await clearSpreadsheetData(spreadsheetId, accessToken);

  if (orders.length === 0) return;

  // Format order rows (the API has hebrew dates and nicely structured lists)
  const rows = orders.map((order) => {
    const dateStr = new Date(order.createdAt).toLocaleString("he-IL", { timeZone: "Asia/Jerusalem" });
    const formattedItems = order.items && Array.isArray(order.items)
      ? order.items.map((item: any) => `${item.name} (${item.color}, מידה ${item.size}) x${item.quantity}`).join(", ")
      : "";

    return [
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
    ];
  });

  const range = `הזמנות!A2:L${rows.length + 1}`;
  const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}?valueInputOption=USER_ENTERED`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ values: rows })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`שגיאה בסנכרון ההזמנות לגיליון: ${errorText}`);
  }
}
