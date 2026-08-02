const createSocialLinkPayload = (input = {}) => ({
  name: input.name || '',
  url: input.url || '',
  icon: input.icon || '',
  createdAt: input.createdAt || new Date(),
  updatedAt: input.updatedAt || new Date(),
})

module.exports = {
  collectionName: 'socialLinks',
  createSocialLinkPayload,
}
