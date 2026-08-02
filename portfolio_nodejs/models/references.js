const createReferencePayload = (input = {}) => ({
  name: input.name || '',
  position: input.position || '',
  company: input.company || '',
  email: input.email || '',
  phone: input.phone || '',
  relationship: input.relationship || '',
  createdAt: input.createdAt || new Date(),
  updatedAt: input.updatedAt || new Date(),
})

module.exports = {
  collectionName: 'references',
  createReferencePayload,
}
