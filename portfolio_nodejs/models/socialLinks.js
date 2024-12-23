const socialLinkSchema = new mongoose.Schema({
  platform: { type: String, required: true },
  url: { type: String, required: true },
  icon: String, // URL to the social platform icon
})

module.exports = mongoose.model('SocialLink', socialLinkSchema)
