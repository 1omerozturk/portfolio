const db = require('../config/firebase')

function normalizeDoc(snapshot) {
  if (!snapshot) return null
  const data = snapshot.data ? snapshot.data() : snapshot
  return { ...data, id: snapshot.id || data.id }
}

function dateValue(value) {
  if (value && typeof value.toMillis === 'function') return value.toMillis()
  if (value instanceof Date) return value.getTime()
  if (typeof value === 'number') return Number.isFinite(value) ? value : 0
  const parsed = typeof value === 'string' ? Date.parse(value) : NaN
  return Number.isFinite(parsed) ? parsed : 0
}

function sortDocs(docs, field = 'createdAt', direction = 'desc') {
  return [...docs].sort((a, b) => {
    const left = dateValue(a[field])
    const right = dateValue(b[field])
    if (left === right) return 0
    return direction === 'asc' ? left - right : right - left
  })
}

async function getCollectionDocs(collectionName, options = {}) {
  let query = db.collection(collectionName)
  for (const [field, value] of Object.entries(options.filters || {})) {
    query = query.where(field, '==', value)
  }
  if (options.orderBy) query = query.orderBy(options.orderBy, options.direction === 'asc' ? 'asc' : 'desc')
  if (Number.isSafeInteger(options.limit) && options.limit > 0) query = query.limit(options.limit)
  const snapshot = await query.get()
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
  return { ...data, id: ref.id }
}

async function updateDoc(collectionName, id, payload) {
  const ref = db.collection(collectionName).doc(id)
  const snapshot = await ref.get()

  if (!snapshot.exists) {
    return null
  }

  await ref.update({ ...Object.fromEntries(Object.entries(payload).filter(([key, value]) => value !== undefined && !['id', '_id', 'createdAt', 'updatedAt'].includes(key))), updatedAt: new Date() })
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


