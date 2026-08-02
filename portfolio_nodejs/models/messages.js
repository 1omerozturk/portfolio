const createMessagePayload = (input = {}) => ({
  name: input.name || '',
  lastName: input.lastName || '',
  email: input.email || '',
  phone: input.phone || '',
  message: input.message || '',
  sentAt: input.sentAt || new Date(),
  isRead: typeof input.isRead === 'boolean' ? input.isRead : false,
  createdAt: input.createdAt || new Date(),
  updatedAt: input.updatedAt || new Date(),
})

module.exports = {
  collectionName: 'messages',
  createMessagePayload,
}
