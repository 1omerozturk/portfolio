const mongoose = require('mongoose')

const languageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    proficiency: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced', 'Fluent', 'Native'], required: true }
});

module.exports = mongoose.model('Language', languageSchema);
