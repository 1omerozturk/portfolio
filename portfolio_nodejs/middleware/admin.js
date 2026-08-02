const jwt = require('jsonwebtoken')
const { getCollectionDocs } = require('../service/firestoreRepository')

const admin = async (req, res, next) => {
  try {
    const token = req.header('Authorization')
    if (!token) {
      return res.status(400).send({ error: 'Token is required.' })
    }

    const sanitizedToken = token.replace('Bearer ', '')
    const decoded = jwt.verify(sanitizedToken, process.env.JWT_SECRET_KEY)

    const users = await getCollectionDocs('users', { filters: { username: decoded.username }, limit: 1 })
    const user = users[0]

    if (!user) {
      return res.status(401).send({ error: 'Please authenticate.' })
    }
    if (user.role !== 'admin') {
      return res.status(403).send({ error: 'Access denied.' })
    }
    if (!Array.isArray(user.tokens) || !user.tokens.includes(sanitizedToken)) {
      return res.status(401).send({ error: 'Please authenticate.' })
    }

    req.user = user
    next()
  } catch (error) {
    console.error('Middleware Error:', error)
    res.status(500).send({ error: 'Internal server error.' })
  }
}

module.exports = admin
