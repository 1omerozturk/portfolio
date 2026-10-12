const { GoogleAuth } = require('google-auth-library')
const path = require('node:path')
const fs = require('node:fs')
const db = require('../config/firebase')
const { getCollectionDocs, getDocById } = require('./firestoreRepository')
let client
let cached
const folderId = () => {
  const id = process.env.DRIVE_CERTIFICATES_FOLDER_ID || '10D6vat-EtrsnRW72RDxx568DfIqP1gj8'
  if (!/^[a-zA-Z0-9_-]{10,200}$/.test(id)) throw new Error('INVALID_FOLDER')
  return id
}
async function request(suffix, params) {
  if (!client) {
    const localKeyFile = path.join(__dirname, '..', 'serviceAccountKey.json')
    const keyFile = fs.existsSync(localKeyFile) ? localKeyFile : process.env.GOOGLE_APPLICATION_CREDENTIALS
    client = await new GoogleAuth({ ...(keyFile ? { keyFile } : {}), scopes: ['https://www.googleapis.com/auth/drive.readonly'] }).getClient()
  }
  return (await client.request({ url: `https://www.googleapis.com/drive/v3/files${suffix}`, params, timeout: 15000 })).data
}
const fail = res => res.status(503).json({ message: 'Drive klasörü okunamadı. Drive API etkinliğini ve servis hesabının klasör Görüntüleyici yetkisini kontrol edin.' })
function viewUrl(file) {
  const url = new URL(`https://drive.google.com/file/d/${file.id}/view`)
  if (file.resourceKey) url.searchParams.set('resourcekey', file.resourceKey)
  return url.href
}
async function listFiles() {
  const folder = folderId()
  if (cached?.folder === folder && cached.expires > Date.now()) return cached.files
  const info = await request(`/${folder}`, { fields: 'id,mimeType', supportsAllDrives: true })
  if (info.mimeType !== 'application/vnd.google-apps.folder') throw new Error('INVALID_FOLDER')
  const files = []
  let pageToken
  do {
    const data = await request('', { q: `'${folder}' in parents and mimeType = 'application/pdf' and trashed = false`, fields: 'nextPageToken,files(id,name,resourceKey)', pageSize: 100, orderBy: 'name', supportsAllDrives: true, includeItemsFromAllDrives: true, ...(pageToken ? { pageToken } : {}) })
    files.push(...(data.files || [])); pageToken = data.nextPageToken
    if (files.length > 2000) throw new Error('FOLDER_TOO_LARGE')
  } while (pageToken)
  cached = { folder, files, expires: Date.now() + 30000 }
  return files
}
exports.list = async (req, res) => {
  try {
    const [files, records] = await Promise.all([listFiles(), getCollectionDocs('certifications')])
    res.json({ files: files.map(file => {
      const record = records.find(item => item.driveFileId === file.id)
      return { id: file.id, name: file.name, url: viewUrl(file), isVisible: record?.isVisible === true, certificateId: record?.id || null }
    }) })
  } catch { fail(res) }
}
exports.select = async (req, res) => {
  if (!/^[a-zA-Z0-9_-]{10,200}$/.test(req.params.id) || typeof req.body.isVisible !== 'boolean') return res.status(400).json({ message: 'Dosya ve görünürlük durumunu kontrol edin.' })
  try {
    const records = await getCollectionDocs('certifications', { filters: { driveFileId: req.params.id } })
    const ref = db.collection('certifications').doc(records[0]?.id || `drive-${req.params.id}`)
    if (!req.body.isVisible) {
      if ((await ref.get()).exists) await ref.update({ isVisible: false, updatedAt: new Date() })
      return res.json({ id: ref.id, isVisible: false })
    }
    const file = await request(`/${req.params.id}`, { fields: 'id,name,mimeType,parents,trashed,resourceKey', supportsAllDrives: true })
    if (file.trashed || file.mimeType !== 'application/pdf' || !file.parents?.includes(folderId())) return res.status(400).json({ message: 'PDF sertifika klasöründe bulunmuyor.' })
    await db.runTransaction(async transaction => {
      const previous = await transaction.get(ref)
      const values = { driveFileId: file.id, certificatePdf: viewUrl(file), isVisible: true, updatedAt: new Date() }
      if (!previous.exists) Object.assign(values, { name: file.name.replace(/\.pdf$/i, ''), issuingOrganization: '', issueDate: '', createdAt: new Date() })
      transaction.set(ref, values, { merge: true })
    })
    res.json(await getDocById('certifications', ref.id))
  } catch { fail(res) }
}
exports.adminList = async (req, res) => { try { res.json(await getCollectionDocs('certifications')) } catch { res.status(503).json({ message: 'Sertifikalar yüklenemedi.' }) } }
exports.adminOne = async (req, res) => { try { const record = await getDocById('certifications', req.params.id); if (!record) return res.status(404).json({ message: 'Sertifika bulunamadı.' }); res.json(record) } catch { res.status(503).json({ message: 'Sertifika yüklenemedi.' }) } }

