const mongoose = require('mongoose')

const hobbySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  icon: String, // URL to the hobby icon or image
})

module.exports = mongoose.model('Hobby', hobbySchema)
