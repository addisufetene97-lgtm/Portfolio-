# የ ConnectBahirdar AI አውቶሜሽን አዘገጃጀት መመሪያ (Setup Instructions)

ይህ መመሪያ በዌብሳይትዎ እና በቴሌግራም ቦትዎ የሚመጡ መረጃዎችን በራስ-ሰር በ Google Sheet ላይ እንዲመዘገቡ እና በ AI እንዲተነተኑ ለማድረግ ይረዳል።

## ደረጃ 1: Google Apps Script ማዘጋጀት

1. [Google Apps Script](https://script.google.com/) ይክፈቱ።
2. **"New Project"** የሚለውን ይጫኑ።
3. በፕሮጀክቱ ውስጥ ያለውን ኮድ በሙሉ ያጥፉ እና በ `ConnectBahirdar/GAS_Setup.js` ውስጥ ያለውን ኮድ ኮፒ አድርገው ይለጥፉ።
4. በኮዱ አናት ላይ (Configuration section) የሚከተሉትን ይተኩ፦
   - `GEMINI_API_KEY`: የእርስዎን የ Gemini API Key ይለጥፉ ([ከዚህ ያግኙ](https://aistudio.google.com/app/apikey))።
   - `TELEGRAM_BOT_TOKEN`: የእርስዎን የቴሌግራም ቦት ቶከን ይለጥፉ (ከ @BotFather ያገኙትን)።
5. ፕሮጀክቱን ሴቭ (Save) ያድርጉ።

## ደረጃ 2: የዌብ አፕሊኬሽን (Web App) መዘርጋት

1. በላይ በኩል ያለውን **"Deploy"** ቁልፍ ይጫኑ -> **"New Deployment"**።
2. **"Select type"** የሚለውን ተጭነው **"Web App"** ይምረጡ።
3. **"Execute as"** የሚለውን **"Me"** ያድርጉ።
4. **"Who has access"** የሚለውን **"Anyone"** ያድርጉ (ይህ በጣም አስፈላጊ ነው)።
5. **"Deploy"** ይበሉ እና የሚመጣውን ፈቃድ (Authorization) ይቀበሉ።
6. በመጨረሻ የሚሰጥዎትን **"Web App URL"** ኮፒ አድርገው ይያዙ።

## ደረጃ 3: ዌብሳይቱን ማገናኘት

1. በ `ConnectBahirdar/index.html` ፋይል ውስጥ መስመር 278 አካባቢ የሚገኘውን `scriptUrl` የሚለውን ይፈልጉ።
2. በደረጃ 2 ያገኙትን URL እዚያ ላይ ይተኩ (ከ `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` ይልቅ)።
3. ፋይሉን ሴቭ አድርገው ወደ GitHub ይላኩ (Push)።

## ደረጃ 4: ቴሌግራም ቦቱን ማገናኘት (Webhook)

1. በ Google Apps Script ኤዲተር ውስጥ ወደ ታች ወርደው `setWebhook` የሚለውን ፋንክሽን ይፈልጉ።
2. `YOUR_WEB_APP_URL_HERE` የሚለው ቦታ ላይ የእርስዎን Web App URL ይለጥፉ።
3. በላይ በኩል ካለው ዝርዝር ውስጥ `setWebhook` የሚለውን መርጠው **"Run"** ይጫኑ።
4. አሁን ቦትዎ ላይ መልእክት ሲላክ ቀጥታ ወደ Google Sheet ይገባል!

## ሲስተሙ ምን ይሰራል?
- **Google Sheets:** መጀመሪያ መልእክት ሲላክ ሲስተሙ ራሱ `ConnectBahirdar_DB` የሚል ፋይል በ Google Drive ላይ ይፈጥርልዎታል።
- **AI Intent:** Gemini AI ተጠቅሞ ጥያቄው "Demand" (ፈላጊ) ወይስ "Supply" (አቅራቢ) መሆኑን ይለያል።
- **Success Message:** ዌብሳይቱ ላይ ደንበኛው መረጃ ሲሞላ "እናመሰግናለን! መረጃው ደርሶናል። በ 5 ደቂቃ ውስጥ እንደውልልሃለን።" የሚል መልእክት ያሳያል።

ማንኛውም ችግር ካጋጠመዎት ይጠይቁኝ!
