// Single-process limits. Use a shared store when running multiple API instances.
module.exports = function rateLimit({ limit, windowMs }) {
  const entries = new Map()
  return (req, res, next) => {
    const now = Date.now()
    for (const [key, entry] of entries) if (entry.reset <= now) entries.delete(key)
    const key = req.ip || req.socket.remoteAddress || 'unknown'
    let entry = entries.get(key)
    if (!entry) {
      if (entries.size >= 5000) return res.status(429).json({ message: 'Lütfen daha sonra yeniden deneyin.' })
      entry = { count: 0, reset: now + windowMs }; entries.set(key, entry)
    }
    entry.count += 1
    if (entry.count > limit) {
      res.set('Retry-After', String(Math.max(1, Math.ceil((entry.reset - now) / 1000))))
      return res.status(429).json({ message: 'Çok fazla istek. Lütfen daha sonra yeniden deneyin.' })
    }
    next()
  }
}
