# የ ConnectBahirdar አጠቃቀም መመሪያ (Setup Guide)

ይህ ፕሮጀክት በሁለት ዋና ዋና ክፍሎች የተከፈለ ነው፡ የዌብሳይቱ ገጽ (Frontend) እና አውቶሜሽን ሲስተሙ (Backend)። በትክክል እንዲሰራ የሚከተሉትን ደረጃዎች ይከተሉ፦

### 1. Google Apps Script ማዘጋጀት
1. ወደ [script.google.com](https://script.google.com) ይግቡ።
2. "New Project" የሚለውን ይጫኑ።
3. በ `automation/GAS_Setup.js` ውስጥ ያለውን ኮድ በሙሉ ኮፒ አድርገው እዚህ ላይ ይለጥፉት።
4. በኮዱ ውስጥ ያሉትን እነዚህን ቦታዎች በራስዎ መረጃ ይተኩ፡
   - `YOUR_GEMINI_API_KEY_HERE`: የእርስዎን የ Gemini AI ቁልፍ ያስገቡ።
   - `YOUR_TELEGRAM_BOT_TOKEN_HERE`: ከ Telegram @BotFather ያገኙትን ቦት ቶከን ያስገቡ።
   - `YOUR_CHAT_ID_HERE`: መረጃው እንዲመጣ የሚፈልጉትን የቴሌግራም Chat ID ያስገቡ።

### 2. ማስተላለፍ (Deployment)
1. በ Google Apps Script ገጽ ላይ "Deploy" -> "New Deployment" የሚለውን ይጫኑ።
2. "Select type" የሚለውን መርጠው "Web App" ይበሉ።
3. "Who has access" የሚለውን "Anyone" አድርገው "Deploy" ይበሉት።
4. የተሰጠዎትን **Web App URL** ኮፒ አድርገው ይያዙ።

### 3. ዌብሳይቱን ከሲስተሙ ጋር ማገናኘት
1. `index.html` ፋይልን ይክፈቱ።
2. ወደ ታች በመውረድ `const scriptUrl = "..."` በሚለው ቦታ ላይ የቅድሙን Web App URL ይለጥፉ።

### 4. GitHub ላይ መጫን
1. እነዚህን ፋይሎች ወደ እርስዎ የ GitHub ሪፖዚተሪ ይጫኑ (Push)።
2. በ Settings ውስጥ GitHub Pages በማብራት ዌብሳይቱን በነፃ ማሰራጨት ይችላሉ።

ጥያቄ ካለዎት መጠየቅ ይችላሉ!
