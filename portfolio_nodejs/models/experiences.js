const createExperiencePayload = (input = {}) => ({
  company: input.company || '',
  companyEn: input.companyEn || '',
  positionEn: input.positionEn || '',
  position: input.position || '',
  startDate: input.startDate || new Date(),
  endDate: input.endDate || null,
  responsibilities: Array.isArray(input.responsibilities) ? input.responsibilities : [],
  responsibilitiesEn: Array.isArray(input.responsibilitiesEn) ? input.responsibilitiesEn : [],
  companyLogo: input.companyLogo || '',
  createdAt: input.createdAt || new Date(),
  updatedAt: input.updatedAt || new Date(),
})

module.exports = {
  collectionName: 'experiences',
  createExperiencePayload,
}


