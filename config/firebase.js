const admin = require("firebase-admin");

let credentials;
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  credentials = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
  credentials = require("../serviceAccountKey.json"); // yereldeki dosya
}

admin.initializeApp({
  credential: admin.credential.cert(credentials),
  databaseURL: process.env.FIREBASE_DB_URL,
});
