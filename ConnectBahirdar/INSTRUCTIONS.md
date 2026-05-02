# የ ConnectBahirdar AI አውቶሜሽን አዘገጃጀት መመሪያ (Setup Instructions)

ይህ መመሪያ በዌብሳይትዎ እና በቴሌግራም ቦትዎ የሚመጡ መረጃዎችን በራስ-ሰር እንዲመዘገቡ እና ማሳወቂያ እንዲደርስዎ ለማድረግ ይረዳል።

## ደረጃ 1: Google Apps Script ማዘጋጀት

1. [Google Apps Script](https://script.google.com/) ይክፈቱ።
2. **"New Project"** የሚለውን ይጫኑ።
3. በፕሮጀክቱ ውስጥ ያለውን ኮድ በሙሉ ያጥፉ እና በ `ConnectBahirdar/GAS_Setup.js` ውስጥ ያለውን ኮድ ኮፒ አድርገው ይለጥፉ።
4. በኮዱ አናት ላይ (Configuration section) የሚከተሉትን ይተኩ፦
   - `GEMINI_API_KEY`: የእርስዎን የ Gemini API Key ይለጥፉ ([ከዚህ ያግኙ](https://aistudio.google.com/app/apikey))።
5. ፕሮጀክቱን ሴቭ (Save) ያድርጉ።

## ደረጃ 2: የዌብ አፕሊኬሽን (Web App) መዘርጋት

1. በላይ በኩል ያለውን **"Deploy"** ቁልፍ ይጫኑ -> **"New Deployment"**።
2. **"Select type"** የሚለውን ተጭነው **"Web App"** ይምረጡ።
3. **"Execute as"** የሚለውን **"Me"** ያድርጉ።
4. **"Who has access"** የሚለውን **"Anyone"** ያድርጉ (ይህ በጣም አስፈላጊ ነው)።
5. **"Deploy"** ይበሉ እና የሚመጣውን ፈቃድ (Authorization) ይቀበሉ።
6. በመጨረሻ የሚሰጥዎትን **"Web App URL"** ኮፒ አድርገው ይያዙ።

## ደረጃ 3: ዌብሳይቱን ማገናኘት

1. በ `ConnectBahirdar/index.html` ፋይል ውስጥ መስመር 267 አካባቢ የሚገኘውን `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` የሚለውን ይፈልጉ።
2. በደረጃ 2 ያገኙትን URL እዚያ ላይ ይተኩ።
3. ፋይሉን ሴቭ አድርገው ወደ GitHub ይላኩ (Push)።

## ደረጃ 4: ቴሌግራም ቦቱን ማገናኘት (Webhook)

1. በ Google Apps Script ኤዲተር ውስጥ ወደ ታች ወርደው `setWebhook` የሚለውን ፋንክሽን ይፈልጉ።
2. `PASTE_YOUR_DEPLOYED_WEB_APP_URL_HERE` የሚለው ቦታ ላይ የእርስዎን Web App URL ይለጥፉ።
3. በላይ በኩል ካለው ዝርዝር ውስጥ `setWebhook` የሚለውን መርጠው **"Run"** ይጫኑ።
4. አሁን ቦትዎ ላይ መልእክት ሲላክ ቀጥታ ወደ Google Sheet ይገባል!

## ማሳሰቢያዎች
- **Google Sheets:** መጀመሪያ መልእክት ሲላክ ሲስተሙ ራሱ `ConnectBahirdar_DB` የሚል ፋይል በ Google Drive ላይ ይፈጥርልዎታል።
- **Gmail:** ሲስተሙ በርስዎ ስም ለደንበኞች ኢሜይል እንዲልክ ፈቃድ መጠየቁ አይቀሬ ነው።
- **PDF:** ለእያንዳንዱ ጥያቄ PDF ተዘጋጅቶ በ Google Drive ላይ ይቀመጣል።

ማንኛውም ችግር ካጋጠመዎት ይጠይቁኝ!
