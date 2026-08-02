const admin = require("firebase-admin")
const { getFirestore } = require("firebase-admin/firestore")
const fs = require("fs")
const path = require("path")
require("dotenv").config()

let db

function initializeFirebase() {
  if (typeof admin.apps !== 'undefined' && admin.apps.length) {
    db = getFirestore()
    return db
  }

  const serviceAccountPath = path.join(__dirname, "..", "serviceAccountKey.json")

  if (fs.existsSync(serviceAccountPath)) {
    const serviceAccount = require(serviceAccountPath)
    admin.initializeApp({
      credential: admin.cert(serviceAccount),
      projectId: serviceAccount.project_id,
    })
  } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    admin.initializeApp()
  } else {
    throw new Error("Firebase service account or GOOGLE_APPLICATION_CREDENTIALS not found")
  }

  db = getFirestore()
  return db
}

module.exports = initializeFirebase()