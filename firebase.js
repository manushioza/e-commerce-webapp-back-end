
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');


const serviceAccount = require('./ecommerce-webapp-2d799-firebase-adminsdk-9ap8v-e5c3b689f5.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore()

module.exports.db = db;
