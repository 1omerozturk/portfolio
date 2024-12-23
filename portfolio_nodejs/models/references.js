const referenceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  company: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  relationship: String, // Relationship with the reference (e.g., previous manager)
})

module.exports = mongoose.model('Reference', referenceSchema)
