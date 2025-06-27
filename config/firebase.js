const admin = require("firebase-admin");

if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  console.error("ENV FIREBASE_SERVICE_ACCOUNT yok!");
  process.exit(1);
}

const creds = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(creds),
  databaseURL: process.env.FIREBASE_DB_URL,
});
