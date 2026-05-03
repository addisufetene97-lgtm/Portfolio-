/**
 * ConnectBahirdar AI Automation Setup
 * This script handles incoming data from a web form and Telegram bot,
 * processes it using Gemini AI, and stores it in Google Sheets.
 */

const CONFIG = {
  GEMINI_API_KEY: 'YOUR_GEMINI_API_KEY_HERE',
  TELEGRAM_BOT_TOKEN: 'YOUR_TELEGRAM_BOT_TOKEN_HERE',
  SHEET_NAME: 'ConnectBahirdar_DB'
};

/**
 * Handle POST requests from the website form
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const result = processData(data, 'Website');
    return ContentService.createTextOutput(JSON.stringify({ status: 'success', result: result }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle Telegram Webhook
 */
function doGet(e) {
  if (e.parameter.text) {
    // Basic test endpoint
    return ContentService.createTextOutput("Automation is running!");
  }

  // Telegram webhook payload usually comes as POST, but some setups use GET parameters
  // For standard Telegram webhooks, we use doPost but handle the structure differently
}

/**
 * Main processing function
 */
function processData(data, source) {
  const ss = getOrCreateSheet();
  const sheet = ss.getSheets()[0];

  const text = data.message || data.text || '';
  const intent = analyzeIntentWithGemini(text);

  const timestamp = new Date();
  const name = data.name || 'Anonymous';
  const contact = data.contact || data.email || 'No contact';

  sheet.appendRow([timestamp, source, name, contact, text, intent]);

  // Notify via Telegram if source is Website
  if (source === 'Website') {
    sendTelegramMessage(`New Lead from ${source}:\nName: ${name}\nContact: ${contact}\nMessage: ${text}\nAI Intent: ${intent}`);
  }

  return intent;
}

/**
 * AI Intent Analysis using Gemini
 */
function analyzeIntentWithGemini(text) {
  if (!text || CONFIG.GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') return 'Unknown';

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${CONFIG.GEMINI_API_KEY}`;

  const payload = {
    contents: [{
      parts: [{
        text: `Analyze the following message and classify it as either "Demand" (if they want to buy/find something) or "Supply" (if they are selling/offering something). Just return the one word. Message: "${text}"`
      }]
    }]
  };

  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload)
  };

  try {
    const response = UrlFetchApp.fetch(url, options);
    const result = JSON.parse(response.getContentText());
    return result.candidates[0].content.parts[0].text.trim();
  } catch (e) {
    return 'Analysis Failed';
  }
}

/**
 * Google Sheet Management
 */
function getOrCreateSheet() {
  const files = DriveApp.getFilesByName(CONFIG.SHEET_NAME);
  if (files.hasNext()) {
    return SpreadsheetApp.open(files.next());
  } else {
    const ss = SpreadsheetApp.create(CONFIG.SHEET_NAME);
    const sheet = ss.getSheets()[0];
    sheet.appendRow(['Timestamp', 'Source', 'Name', 'Contact', 'Message', 'AI Intent']);
    return ss;
  }
}

/**
 * Telegram Bot Notification
 */
function sendTelegramMessage(text) {
  if (CONFIG.TELEGRAM_BOT_TOKEN === 'YOUR_TELEGRAM_BOT_TOKEN_HERE') return;

  const url = `https://api.telegram.org/bot${CONFIG.TELEGRAM_BOT_TOKEN}/sendMessage`;
  // You'll need a Chat ID here. Usually you get it from an initial message to the bot.
  // For this setup, we assume you have your own ID or a group ID.
  const chatId = 'YOUR_CHAT_ID_HERE';

  const payload = {
    chat_id: chatId,
    text: text
  };

  UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload)
  });
}

/**
 * Setup Webhook for Telegram
 */
function setWebhook() {
  const url = "YOUR_WEB_APP_URL_HERE";
  const telegramUrl = `https://api.telegram.org/bot${CONFIG.TELEGRAM_BOT_TOKEN}/setWebhook?url=${url}`;
  const response = UrlFetchApp.fetch(telegramUrl);
  Logger.log(response.getContentText());
}
