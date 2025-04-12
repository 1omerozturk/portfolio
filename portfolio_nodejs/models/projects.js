const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true, enum: ['mobile', 'web'] },
  technologies: [String],
  repoLink: String,
  liveDemoLink: String,
  images: [String],
  // is showcasing
  isShowcasing: { type: String, default: "false" },
})

module.exports = mongoose.model('Project', projectSchema)
