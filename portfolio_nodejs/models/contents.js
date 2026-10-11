const createContentPayload = (input = {}) => ({
  name: input.name || '',
  nameEn: input.nameEn || '',
  link: input.link || '',
  image: input.image || '',
  createdAt: input.createdAt || new Date(),
  updatedAt: input.updatedAt || new Date(),
})

module.exports = {
  collectionName: 'contents',
  createContentPayload,
}

