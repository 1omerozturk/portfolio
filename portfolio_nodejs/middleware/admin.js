const jwt = require('jsonwebtoken')
const { getDocById } = require('../service/firestoreRepository')

const admin = async (req, res, next) => {
  const authorization = req.header('Authorization')
  const match = typeof authorization === 'string' ? /^Bearer\s+(\S+)$/i.exec(authorization) : null
  if (!match) return res.status(401).json({ error: 'Oturum doğrulanamadı.' })
  if (!process.env.JWT_SECRET_KEY) return res.status(500).json({ error: 'Oturum hizmeti kullanılamıyor.' })

  let decoded
  try {
    decoded = jwt.verify(match[1], process.env.JWT_SECRET_KEY, { algorithms: ['HS256'] })
  } catch {
    return res.status(401).json({ error: 'Oturum geçersiz veya süresi dolmuş.' })
  }
  if (!decoded || typeof decoded === 'string' || typeof decoded._id !== 'string' || !decoded._id || decoded._id.includes('/')) {
    return res.status(401).json({ error: 'Oturum doğrulanamadı.' })
  }
  try {
    const user = await getDocById('users', decoded._id)
    if (!user || !Array.isArray(user.tokens) || !user.tokens.includes(match[1])) {
      return res.status(401).json({ error: 'Oturum doğrulanamadı.' })
    }
    if (user.role !== 'admin') return res.status(403).json({ error: 'Bu işlem için yetkiniz yok.' })
    req.user = user
    require('./validation').validateRecord(req, res, next)
  } catch {
    return res.status(503).json({ error: 'Oturum hizmetine ulaşılamıyor.' })
  }
}

module.exports = admin

