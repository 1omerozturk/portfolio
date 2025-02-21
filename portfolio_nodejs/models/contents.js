const mongoose = require('mongoose')

const contentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  link: { type: String, required: true },
  image: { type: String, required: false },
})

module.exports = mongoose.model('Content', contentSchema)
