const createPersonalInfoPayload = (input = {}) => ({
  fullName: input.fullName || '',
  jobTitle: input.jobTitle || '',
  email: input.email || '',
  phone: input.phone || '',
  address: input.address || '',
  about: input.about || '',
  profilePicture: input.profilePicture || '',
  createdAt: input.createdAt || new Date(),
  updatedAt: input.updatedAt || new Date(),
})

module.exports = {
  collectionName: 'personalInfo',
  createPersonalInfoPayload,
}
