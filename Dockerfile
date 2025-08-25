# שימוש בתמונה רשמית של Node.js כבסיס
FROM node:20-alpine

# הגדרת ספריית עבודה בתוך הקונטיינר
WORKDIR /app

# העתקת קבצי package.json ו- package-lock.json (אם יש)
COPY package*.json ./

# התקנת התלויות
# RUN npm install --production
RUN npm install

# העתקת שאר הקוד לתוך הקונטיינר
COPY . .

# בניית הפרויקט (אם יש צורך, למשל אם משתמשים ב- TypeScript)
RUN npm run build

# פתיחת הפורט שהאפליקציה רצה עליו (ברירת מחדל Nest הוא 3000)
EXPOSE 3000

# הפקודה שמריצה את האפליקציה
CMD ["node", "dist/main.js"]
