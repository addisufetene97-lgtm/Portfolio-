# ConnectBahirdar - Skilled Professional Services & AI Automation

ConnectBahirdar is a specialized landing page and automation system designed to connect skilled professionals (Dish technicians, Electronics repair, and Plumbers) with clients in Bahir Dar, Ethiopia.

## 🚀 Features

- **Responsive Landing Page:** Built with HTML/CSS/JS, featuring Amharic content and mobile-friendly design.
- **AI-Powered Lead Classification:** Uses Google Gemini AI to classify customer requests as "Demand" or "Supply".
- **Automated Logging:** Saves all customer inquiries directly to a Google Sheet.
- **Instant Notifications:** Sends real-time alerts to a Telegram Bot when a new order is placed.
- **Direct Contact:** Integrated WhatsApp and phone buttons for immediate communication.

## 📁 Project Structure

- `index.html`: The main website with the service booking form.
- `automation/GAS_Setup.js`: The Google Apps Script code for backend automation and AI integration.
- `README.md`: Project overview.

## 🛠 Setup Instructions

1.  **Google Apps Script:** Create a new project at [script.google.com](https://script.google.com) and paste the contents of `automation/GAS_Setup.js`.
2.  **API Keys:**
    - Obtain a Gemini API key from Google AI Studio.
    - Create a Telegram Bot via @BotFather.
    - Update the placeholders in `GAS_Setup.js` with your keys.
3.  **Deployment:** Deploy the script as a Web App and copy the URL.
4.  **Frontend Sync:** Paste the Web App URL into the `scriptUrl` constant in `index.html`.

## 📞 Support

For improvements or customizations, contact the developer.
