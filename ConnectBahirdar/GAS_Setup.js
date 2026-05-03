/**
 * ConnectBahirdar AI Standalone Agent
 * Handles website bookings and Telegram bot messages.
 */

// --- CONFIGURATION ---
const CONFIG = {
  TELEGRAM_BOT_TOKEN: 'YOUR_TELEGRAM_BOT_TOKEN_HERE',
  OWNER_CHAT_ID: '331179859',
  GEMINI_API_KEY: 'YOUR_GEMINI_API_KEY_HERE',
  SPREADSHEET_ID: '', // Optional: If empty, it will create one or use the active one
  DRIVE_FOLDER_ID: ''  // Optional: Folder to store PDFs
};

/**
 * Main entry point for POST requests (from Website and Telegram Webhook)
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Check if request is from the Website
    if (data.source === 'website') {
      return handleWebsiteData(data);
    }

    // Otherwise, assume it's a Telegram Update
    if (data.message) {
      return handleTelegramUpdate(data);
    }

    return ContentService.createTextOutput(JSON.stringify({status: 'success', message: 'Unknown source ignored'})).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    console.error('Error in doPost:', err);
    return ContentService.createTextOutput(JSON.stringify({status: 'error', message: err.message})).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handles data sent from the ConnectBahirdar website
 */
function handleWebsiteData(data) {
  const ss = getSpreadsheet();
  const sheet = ss.getSheets()[0];

  // 1. Record in Sheet
  const timestamp = new Date();
  sheet.appendRow([timestamp, data.name, data.phone, data.email || 'N/A', data.profession, 'Website', 'Pending']);

  // 2. Classify with Gemini
  const prompt = `Classify this professional request for "${data.profession}" by "${data.name}". Is it a 'Customer' (someone needing help) or a 'Provider' (someone offering skills)? Respond with only one word: Customer or Provider.`;
  const classification = classifyWithGemini(prompt);

  // Update sheet with classification
  const lastRow = sheet.getLastRow();
  sheet.getRange(lastRow, 7).setValue(classification);

  // 3. Generate PDF in Drive
  let fileUrl = 'Not Generated';
  try {
    fileUrl = generateAndSavePDF(data, timestamp, classification);
  } catch (e) {
    console.error('PDF Error:', e);
  }

  // 4. Send Gmail Confirmation (if email exists)
  if (data.email) {
    sendGmailConfirmation(data.email, data.name, data.profession);
  }

  // 5. Notify Owner via Telegram
  const msg = `🔔 *አዲስ የጥገና ጥያቄ (ከዌብሳይት)*\n\n👤 ስም: ${data.name}\n📞 ስልክ: ${data.phone}\n📧 ኢሜይል: ${data.email || 'የለም'}\n🛠 አገልግሎት: ${data.profession}\n🏷 አይነት: ${classification}\n📄 PDF: ${fileUrl}`;
  sendTelegramMessage(CONFIG.OWNER_CHAT_ID, msg);

  return ContentService.createTextOutput(JSON.stringify({status: 'success'})).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Handles updates from the Telegram Bot
 */
function handleTelegramUpdate(update) {
  const msg = update.message;
  const chatId = msg.chat.id.toString();
  const text = msg.text || '';
  const name = msg.from.first_name || 'Unknown';

  // Ignore messages from the owner to avoid loops, unless it's a command
  if (chatId === CONFIG.OWNER_CHAT_ID && !text.startsWith('/')) {
    return;
  }

  const ss = getSpreadsheet();
  const sheet = ss.getSheets()[0];

  // 1. Use Gemini to extract info from text
  const prompt = `Extract name, phone, and service requested from this Amharic/English message: "${text}".
  If missing, use "Unknown". Also classify as 'Customer' or 'Provider'.
  Return JSON format: {"name": "...", "phone": "...", "service": "...", "type": "..."}`;

  let extracted = {name: name, phone: 'Unknown', service: 'Unknown', type: 'Unknown'};
  try {
    const aiResponse = classifyWithGemini(prompt);
    extracted = JSON.parse(aiResponse.replace(/```json|```/g, ''));
  } catch (e) {
    console.error('AI Extraction Error:', e);
  }

  // 2. Record in Sheet
  const timestamp = new Date();
  sheet.appendRow([timestamp, extracted.name, extracted.phone, 'N/A', extracted.service, 'Telegram', extracted.type]);

  // 3. Reply to user
  const reply = `ሰላም ${name}! መልእክትዎ ደርሶናል። በቅርቡ እናገኝዎታለን። 🙏`;
  sendTelegramMessage(chatId, reply);

  // 4. Notify Owner
  const ownerMsg = `🔔 *አዲስ መልእክት (ከቴሌግራም)*\n\n👤 ስም: ${extracted.name}\n📞 ስልክ: ${extracted.phone}\n🛠 አገልግሎት: ${extracted.service}\n🏷 አይነት: ${extracted.type}\n💬 ሙሉ መልእክት: ${text}`;
  sendTelegramMessage(CONFIG.OWNER_CHAT_ID, ownerMsg);
}

/**
 * Calls Gemini API for classification or extraction
 */
function classifyWithGemini(prompt) {
  if (CONFIG.GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') return 'Unclassified';

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${CONFIG.GEMINI_API_KEY}`;
  const payload = {
    contents: [{ parts: [{ text: prompt }] }]
  };

  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload)
  };

  const response = UrlFetchApp.fetch(url, options);
  const json = JSON.parse(response.getContentText());
  return json.candidates[0].content.parts[0].text.trim();
}

/**
 * Creates a simple PDF in Google Drive
 */
function generateAndSavePDF(data, date, type) {
  const html = `
    <h1>ConnectBahirdar Service Request</h1>
    <p><b>Date:</b> ${date}</p>
    <p><b>Name:</b> ${data.name}</p>
    <p><b>Phone:</b> ${data.phone}</p>
    <p><b>Email:</b> ${data.email || 'N/A'}</p>
    <p><b>Service:</b> ${data.profession}</p>
    <p><b>Type:</b> ${type}</p>
    <hr>
    <p>Generated by ConnectBahirdar AI Agent</p>
  `;

  const blob = Utilities.newBlob(html, 'text/html', `Request_${data.name}.html`);
  const pdf = blob.getAs('application/pdf');

  let folder;
  if (CONFIG.DRIVE_FOLDER_ID) {
    folder = DriveApp.getFolderById(CONFIG.DRIVE_FOLDER_ID);
  } else {
    folder = DriveApp.getRootFolder();
  }

  const file = folder.createFile(pdf);
  file.setName(`ConnectBahirdar_${data.name}_${new Date().getTime()}.pdf`);
  return file.getUrl();
}

/**
 * Sends a message via Telegram Bot API
 */
function sendTelegramMessage(chatId, text) {
  const url = `https://api.telegram.org/bot${CONFIG.TELEGRAM_BOT_TOKEN}/sendMessage`;
  const payload = {
    chat_id: chatId,
    text: text,
    parse_mode: 'Markdown'
  };

  UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload)
  });
}

/**
 * Sends confirmation email via Gmail
 */
function sendGmailConfirmation(email, name, profession) {
  const subject = `ConnectBahirdar - ጥያቄዎ ደርሶናል`;
  const body = `ሰላም ${name}፣\n\nለ ${profession} የላኩት የጥገና ጥያቄ በስኬት ደርሶናል። በ 5 ደቂቃ ውስጥ ባለሙያ ደውሎ ያነጋግርዎታል።\n\nስለመረጡን እናመሰግናለን!\nConnectBahirdar`;

  GmailApp.sendEmail(email, subject, body);
}

/**
 * Helper to get or create Spreadsheet
 */
function getSpreadsheet() {
  if (CONFIG.SPREADSHEET_ID) {
    return SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  }

  // Try to find an existing one named ConnectBahirdar_DB
  const files = DriveApp.getFilesByName('ConnectBahirdar_DB');
  if (files.hasNext()) {
    const file = files.next();
    return SpreadsheetApp.open(file);
  }

  // Create new one
  const ss = SpreadsheetApp.create('ConnectBahirdar_DB');
  const sheet = ss.getSheets()[0];
  sheet.appendRow(['Timestamp', 'Name', 'Phone', 'Email', 'Service', 'Source', 'AI Classification']);
  sheet.setFrozenRows(1);
  return ss;
}

/**
 * Use this function ONCE to set up the Telegram Webhook
 * Run this from the GAS editor after deploying as Web App
 */
function setWebhook() {
  const webAppUrl = 'PASTE_YOUR_DEPLOYED_WEB_APP_URL_HERE';
  const url = `https://api.telegram.org/bot${CONFIG.TELEGRAM_BOT_TOKEN}/setWebhook?url=${webAppUrl}`;
  const response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}
