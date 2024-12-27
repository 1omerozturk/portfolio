const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [String],
  repoLink: String,
  liveDemoLink: String,
  images: [String],
})

module.exports = mongoose.model('Project', projectSchema)
