const mongoose = require('mongoose')


const certificateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  issuingOrganization: { type: String, required: true },
  issueDate: { type: Date, required: true },
  expirationDate: Date,
  certificateLink: String,
  certificateImage: String, // URL to the certificate image
})

module.exports = mongoose.model('Certificate', certificateSchema)
