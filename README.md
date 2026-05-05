# ConnectBahirDar Hub

ConnectBahirDar is a multi-purpose platform designed for residents and business owners in Bahir Dar, Ethiopia. This repository hosts two main modules accessible through a central portal.

## 🚀 Modules

### 1. [Rental Management System](./rental/index.html)
A streamlined application for property owners to list their houses for rent.
- **Features:** Multi-step form, photo uploads, automated commission calculation (15%), and lead tracking.

### 2. [Professional Services](./services/index.html)
A landing page to connect clients with skilled technicians.
- **Features:** AI-powered lead classification (Gemini AI), automated logging to Google Sheets, and Telegram notifications.

## 🛠 Setup & Deployment

1. **Root Access:** Deploy the root `index.html` to GitHub Pages. It will serve as the gateway to both projects.
2. **Backend (Services):** Follow the instructions in `services/automation/GAS_Setup.js` to set up the Google Apps Script for the Professional Services module.
3. **Backend (Rental):** Update the `scriptUrl` in `rental/index.html` to point to your data processing script.

---

# የ ConnectBahirDar መግቢያ

ይህ መጋዘን (Repository) ሁለት ዋና ዋና ክፍሎችን የያዘ ነው፡

1. **የቤት ኪራይ አስተዳደር (Rental):** ቤቶን ለማከራየት የሚጠቀሙበት።
2. **የሙያ አገልግሎቶች (Services):** የዲሽ፣ የኤሌክትሮኒክስ እና የቧንቧ ባለሙያዎችን ለማግኘት የሚጠቀሙበት።

እያንዳንዱ ክፍል የየራሱ ዝርዝር መመሪያ አለው።
