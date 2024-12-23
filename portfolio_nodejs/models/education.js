const educationSchema = new mongoose.Schema({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  fieldOfStudy: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  grade: String,
  activities: [String],
  description: String,
  institutionLogo: String, // URL to the institution's logo
})

module.exports = mongoose.model('Education', educationSchema)
