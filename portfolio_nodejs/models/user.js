const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: String,
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now },
  profilePicture: String, // URL to the profile picture
  tokens: [{ token: { type: String, required: true } }],
})

userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign(
    {
      _id: user._id.toString(),
      role: user.role,
    },
    process.env.SECRET_KEY,
    { expiresIn: '7 d' },
  )
  user.tokens = user.tokens.concat({ token })
  await user.save()
  return token
}

userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10)
  }
  next()
})

module.exports = mongoose.model('User', userSchema)
