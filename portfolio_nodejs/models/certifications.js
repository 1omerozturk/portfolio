const createCertificationPayload = (input = {}) => ({
  name: input.name || '',
  nameEn: input.nameEn || '',
  issuingOrganizationEn: input.issuingOrganizationEn || '',
  issuingOrganization: input.issuingOrganization || '',
  issueDate: input.issueDate || new Date(),
  expirationDate: input.expirationDate || null,
  certificateLink: input.certificateLink || '',
  certificateImage: input.certificateImage || '',
  certificatePdf: input.certificatePdf || '',
  type: input.type || 'web',
  createdAt: input.createdAt || new Date(),
  updatedAt: input.updatedAt || new Date(),
})

module.exports = {
  collectionName: 'certifications',
  createCertificationPayload,
}


