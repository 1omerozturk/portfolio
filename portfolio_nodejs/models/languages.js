const createLanguagePayload = (input = {}) => ({
  name: input.name || '',
  proficiency: input.proficiency || 'Beginner',
  createdAt: input.createdAt || new Date(),
  updatedAt: input.updatedAt || new Date(),
})

module.exports = {
  collectionName: 'languages',
  createLanguagePayload,
}
