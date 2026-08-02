const createCertificationPayload = (input = {}) => ({
  name: input.name || '',
  issuingOrganization: input.issuingOrganization || '',
  issueDate: input.issueDate || new Date(),
  expirationDate: input.expirationDate || null,
  certificateLink: input.certificateLink || '',
  certificateImage: input.certificateImage || '',
  createdAt: input.createdAt || new Date(),
  updatedAt: input.updatedAt || new Date(),
})

module.exports = {
  collectionName: 'certifications',
  createCertificationPayload,
}
