const admin = require("firebase-admin");
const path  = require("path");

let creds;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  creds = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
}
else {
  const keyPath = path.resolve(__dirname, "../serviceAccountKey.json"); 
  creds = require(keyPath);
}

admin.initializeApp({
  credential: admin.credential.cert(creds),
  databaseURL: process.env.FIREBASE_DB_URL,
});
