function validId(req, res, next, id) {
  if (typeof id !== 'string' || !id.trim() || id.includes('/') || id.length > 1500 || /[\u0000-\u001f]/.test(id)) return res.status(400).json({ message: 'Geçersiz kayıt kimliği.' })
  next()
}
function objectBody(req, res, next) {
  if (!['POST', 'PUT', 'PATCH'].includes(req.method)) return next()
  if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) return res.status(400).json({ message: 'Geçersiz istek gövdesi.' })
  for (const field of ['id', '_id', 'createdAt', 'updatedAt', '__proto__', 'constructor', 'prototype']) delete req.body[field]
  next()
}
function validateBlog(req, res, next) {
  const body = req.body
  for (const [field, max] of Object.entries({ title: 200, content: 100000, author: 200, category: 100, excerpt: 2000, featuredImage: 2048 })) {
    const value = body[field]
    const required = req.method === 'POST' && ['title', 'content', 'author'].includes(field)
    if ((required && !value) || (value !== undefined && (typeof value !== 'string' || value.length > max || (['title', 'content', 'author'].includes(field) && !value.trim())))) return res.status(400).json({ message: 'Blog alanlarını kontrol edin.' })
  }
  if (body.tags !== undefined && (!Array.isArray(body.tags) || body.tags.length > 50 || body.tags.some(tag => typeof tag !== 'string' || tag.length > 100))) return res.status(400).json({ message: 'Geçersiz etiketler.' })
  if (body.isPublished !== undefined && typeof body.isPublished !== 'boolean') return res.status(400).json({ message: 'Geçersiz yayın durumu.' })
  next()
}
function validateCredentials(req, res, next) {
  if (typeof req.body.username !== 'string' || !req.body.username.trim() || req.body.username.length > 100 || typeof req.body.password !== 'string' || !req.body.password || Buffer.byteLength(req.body.password) > 72) return res.status(400).json({ message: 'Kullanıcı adı veya şifre geçersiz.' })
  if (req.path === '/update-password' && (typeof req.body.rePassword !== 'string' || req.body.rePassword.length < 8 || Buffer.byteLength(req.body.rePassword) > 72)) return res.status(400).json({ message: 'Yeni şifre 8 karakterden az veya 72 bayttan fazla olamaz.' })
  next()
}
module.exports = { validId, objectBody, validateBlog, validateCredentials }

const schemas = {
  'personal-info': { required: ['fullName', 'jobTitle', 'email'], strings: ['fullName', 'jobTitle', 'email', 'phone', 'address', 'about', 'profilePicture'] },
  'social-links': { required: ['name', 'url'], strings: ['name', 'url', 'icon'] },
  educations: { required: ['institution', 'degree', 'fieldOfStudy', 'startDate'], strings: ['institution', 'degree', 'fieldOfStudy', 'startDate', 'endDate', 'grade', 'description', 'institutionLogo'], lists: ['activities'] },
  experiences: { required: ['company', 'position', 'startDate'], strings: ['company', 'position', 'startDate', 'endDate', 'companyLogo'], lists: ['responsibilities'] },
  contents: { required: ['name', 'link'], strings: ['name', 'link', 'image'] },
  skills: { required: ['name', 'level'], strings: ['name', 'level', 'icon', 'color'], numbers: ['percentage'] },
  projects: { required: ['title', 'description', 'type'], strings: ['title', 'description', 'type', 'repoLink', 'liveDemoLink'], lists: ['technologies', 'images'], booleans: ['isShowcasing'] },
  certifications: { required: ['name', 'issuingOrganization', 'issueDate'], strings: ['name', 'issuingOrganization', 'issueDate', 'expirationDate', 'certificateLink', 'certificateImage', 'type'] },
  languages: { required: ['name'], strings: ['name', 'proficiency'] },
  hobbies: { required: ['name'], strings: ['name', 'description', 'icon'] },
}
function httpUrl(value) {
  try { return ['http:', 'https:'].includes(new URL(value).protocol) } catch { return false }
}
function imageUrl(value) {
  return httpUrl(value) || (value.startsWith('/') && !value.startsWith('//') && !/[\\\u0000-\u001f]/.test(value))
}
function validateRecord(req, res, next) {
  if (!['POST', 'PUT', 'PATCH'].includes(req.method)) return next()
  const resource = req.path.split('/')[1]
  const schema = schemas[resource]
  if (!schema) return next()
  const body = req.body
  const payload = {}
  const invalid = () => res.status(400).json({ message: 'Kayıt alanlarını kontrol edin.' })
  for (const field of schema.strings || []) {
    if (body[field] === undefined) continue
    const max = ['description', 'about'].includes(field) ? 10000 : 2048
    if (typeof body[field] !== 'string' || body[field].length > max) return invalid()
    payload[field] = body[field].trim()
  }
  for (const field of schema.lists || []) {
    if (body[field] === undefined) continue
    if (!Array.isArray(body[field]) || body[field].length > 100 || body[field].some(value => typeof value !== 'string' || value.length > 2048)) return invalid()
    payload[field] = [...new Set(body[field].map(value => value.trim()).filter(Boolean))]
  }
  for (const field of schema.numbers || []) {
    if (body[field] === undefined) continue
    const raw = body[field]
    if (!(typeof raw === 'number' || (typeof raw === 'string' && /^\d+(?:\.\d+)?$/.test(raw.trim())))) return invalid()
    const value = Number(raw)
    if (!Number.isFinite(value) || value < 0 || value > 100) return invalid()
    payload[field] = value
  }
  for (const field of schema.booleans || []) {
    if (body[field] === undefined) continue
    if (![true, false, 'true', 'false'].includes(body[field])) return invalid()
    payload[field] = body[field] === true || body[field] === 'true'
  }
  if (req.method === 'POST' && schema.required.some(field => !payload[field])) return invalid()
  if (schema.required.some(field => field in payload && !payload[field])) return invalid()
  if (!Object.keys(payload).length) return invalid()
  for (const field of ['startDate', 'endDate', 'issueDate', 'expirationDate']) if (payload[field] && !Number.isFinite(Date.parse(payload[field]))) return invalid()
  if (payload.startDate && payload.endDate && Date.parse(payload.endDate) < Date.parse(payload.startDate)) return invalid()
  for (const field of ['url', 'link', 'repoLink', 'liveDemoLink', 'certificateLink']) if (payload[field] && !httpUrl(payload[field])) return invalid()
  for (const field of ['image', 'institutionLogo', 'companyLogo', 'profilePicture', 'certificateImage']) if (payload[field] && !imageUrl(payload[field])) return invalid()
  if (payload.images?.some(value => !imageUrl(value))) return invalid()
  if (payload.email && !/^\S+@\S+\.\S+$/.test(payload.email)) return invalid()
  if (resource === 'projects' && payload.type && !['web', 'mobile'].includes(payload.type)) return invalid()
  req.body = payload
  next()
}
module.exports.validateRecord = validateRecord

