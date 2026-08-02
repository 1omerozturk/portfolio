const db = require('../config/firebase')

function normalizeDoc(snapshot) {
  if (!snapshot) return null
  const data = snapshot.data ? snapshot.data() : snapshot
  return { id: snapshot.id || data.id, ...data }
}

function sortDocs(docs, field = 'createdAt', direction = 'desc') {
  return [...docs].sort((a, b) => {
    const left = a[field] || 0
    const right = b[field] || 0
    if (left === right) return 0
    return direction === 'asc' ? left - right : right - left
  })
}

async function getCollectionDocs(collectionName, options = {}) {
  const snapshot = await db.collection(collectionName).get()
  return snapshot.docs.map(normalizeDoc)
}

async function getDocById(collectionName, id) {
  const snapshot = await db.collection(collectionName).doc(id).get()
  return snapshot.exists ? normalizeDoc(snapshot) : null
}

async function createDoc(collectionName, payload) {
  const data = {
    ...payload,
    createdAt: payload.createdAt || new Date(),
    updatedAt: payload.updatedAt || new Date()
  }

  const ref = db.collection(collectionName).doc()
  await ref.set(data)
  return { id: ref.id, ...data }
}

async function updateDoc(collectionName, id, payload) {
  const ref = db.collection(collectionName).doc(id)
  const snapshot = await ref.get()

  if (!snapshot.exists) {
    return null
  }

  await ref.update({ ...payload, updatedAt: new Date() })
  const fresh = await ref.get()
  return normalizeDoc(fresh)
}

async function deleteDoc(collectionName, id) {
  await db.collection(collectionName).doc(id).delete()
  return true
}

module.exports = {
  normalizeDoc,
  sortDocs,
  getCollectionDocs,
  getDocById,
  createDoc,
  updateDoc,
  deleteDoc
}
