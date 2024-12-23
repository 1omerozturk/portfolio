const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  position: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: Date,
  responsibilities: [String],
  companyLogo: String, 
})

module.exports = mongoose.model('Experience', experienceSchema)
