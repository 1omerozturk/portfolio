const { createHash } = require('node:crypto')
const db = require('../config/firebase')
const { isPublished } = require('./blogQuery')
const count = value => Number.isSafeInteger(value) && value >= 0 ? value : 0

async function reaction(req, res, write) {
  res.set('Cache-Control', 'no-store')
  const { visitorId, liked } = req.body
  if (typeof visitorId !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(visitorId) || (write && typeof liked !== 'boolean')) {
    return res.status(400).json({ message: 'Geçersiz beğeni isteği.' })
  }
  const blogRef = db.collection('blogs').doc(req.params.id)
  const key = createHash('sha256').update(visitorId.toLowerCase()).digest('hex')
  const likeRef = blogRef.collection('likes').doc(key)
  try {
    const result = await db.runTransaction(async transaction => {
      const blog = await transaction.get(blogRef)
      if (!blog.exists || !isPublished(blog.data())) return null
      const previous = await transaction.get(likeRef)
      const total = count(blog.data().likeCount)
      const before = previous.exists
      if (!write || before === liked) return { liked: before, count: total }
      const next = Math.max(0, total + (liked ? 1 : -1))
      if (liked) transaction.set(likeRef, { createdAt: new Date() })
      else transaction.delete(likeRef)
      transaction.update(blogRef, { likeCount: next })
      return { liked, count: next }
    })
    if (!result) return res.status(404).json({ message: 'Blog bulunamadı.' })
    return res.json(result)
  } catch {
    return res.status(503).json({ message: 'Beğeniler şu anda yüklenemedi.' })
  }
}
exports.status = (req, res) => reaction(req, res, false)
exports.set = (req, res) => reaction(req, res, true)
