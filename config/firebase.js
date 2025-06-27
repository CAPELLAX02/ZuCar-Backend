// backend/config/firebase.js
const { initializeApp, cert } = require('firebase-admin/app');
const { getDatabase }        = require('firebase-admin/database');

if (!process.env.FIREBASE_SERVICE_ACCOUNT)
  throw new Error('FIREBASE_SERVICE_ACCOUNT env yok!');

const serviceKey = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

initializeApp({
  credential : cert(serviceKey),
  databaseURL: process.env.FIREBASE_DB_URL
});

module.exports = getDatabase();      // <-- doğrudan DB nesnesini dışa aktar
