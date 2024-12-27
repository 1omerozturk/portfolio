const mongoose = require('mongoose')

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  proficiency: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
    required: true,
  },
  icon: String, // URL to the skill icon
})

module.exports = mongoose.model('Skill', skillSchema)
