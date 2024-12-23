const personalInfoSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  jobTitle: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  address: String,
  about: String,
  profilePicture: String, // URL to the profile picture
})

module.exports = mongoose.model('PersonalInfo', personalInfoSchema)
