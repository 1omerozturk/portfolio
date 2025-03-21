const jwt = require('jsonwebtoken')
const User = require('../models/user')

const admin = async (req, res, next) => {
  try {
    const token = req.header('Authorization')
    if (!token) {
      return res.status(400).send({ error: 'Token is required.' })
    }

    const sanitizedToken = token.replace('Bearer ', '')
    const decoded = jwt.verify(sanitizedToken, process.env.JWT_SECRET_KEY)

    const user = await User.findOne(
      { _id: decoded._id, 'tokens.token': sanitizedToken },
      { role: 1, _id: 1 },
    )

    if (!user) {
      return res.status(401).send({ error: 'Please authenticate.' })
    }
    if (user.role !== 'admin') {
      return res.status(403).send({ error: 'Access denied.' })
    }

    next() // Kullanıcı admin ise buraya ulaşır.
  } catch (error) {
    console.error('Middleware Error:', error)
    res.status(500).send({ error: 'Internal server error.' })
  }
}

module.exports = admin
