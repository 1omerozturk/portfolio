const createHobbyPayload = (input = {}) => ({
  name: input.name || '',
  description: input.description || '',
  icon: input.icon || '',
  createdAt: input.createdAt || new Date(),
  updatedAt: input.updatedAt || new Date(),
})

module.exports = {
  collectionName: 'hobbies',
  createHobbyPayload,
}
