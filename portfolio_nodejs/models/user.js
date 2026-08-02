const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const createUserPayload = async (input = {}) => {
  const password = input.password || ''
  const hashedPassword = await bcrypt.hash(password, 10)

  return {
    username: input.username || '',
    email: input.email || '',
    password: hashedPassword,
    fullName: input.fullName || '',
    role: input.role || 'admin',
    createdAt: input.createdAt || new Date(),
    updatedAt: input.updatedAt || new Date(),
    profilePicture: input.profilePicture || '',
    tokens: Array.isArray(input.tokens) ? input.tokens : [],
  }
}

const createAuthToken = (user, secret = process.env.JWT_SECRET_KEY) => {
  return jwt.sign(
    {
      _id: user.id || user._id || user.username,
      role: user.role || 'admin',
      username: user.username,
    },
    secret,
    { expiresIn: '7d' },
  )
}

module.exports = {
  collectionName: 'users',
  createUserPayload,
  createAuthToken,
}
