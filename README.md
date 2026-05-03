# ConnectBahirdar

ConnectBahirdar is a professional service-matching platform based in Bahir Dar, Ethiopia. It connects customers with local experts in satellite dish installation, electrical repairs, appliance maintenance, and professional painting.

## Features

- **Service Booking:** Easy-to-use interface for customers to request specific professional help.
- **AI-Powered Backend:** Integrated with Google Apps Script and Gemini AI to classify leads (Demand vs. Supply).
- **Real-time Notifications:** Automated Telegram alerts for every new request.
- **Data Management:** All leads are automatically logged into a Google Sheet database.
- **Amharic Language Support:** Fully localized for the local community.

## How it Works

1. **User Request:** A customer selects a service and enters their contact details.
2. **Success Feedback:** The website provides immediate confirmation ("እናመሰግናለን!") while processing the data.
3. **Automation:** The data is sent to a serverless backend (Google Apps Script).
4. **AI Analysis:** Gemini AI classifies the intent of the request.
5. **Alert:** You receive a Telegram notification with the customer's details and the AI's analysis.

## Setup for Owners

To activate the AI and Telegram notifications on your own account:
1. Go to the `automation/` directory.
2. Follow the steps in `INSTRUCTIONS.md` (written in Amharic).
3. Deploy the code in `GAS_Setup.js` to your Google Apps Script account.

---
© 2024 ConnectBahirdar. All rights reserved.
