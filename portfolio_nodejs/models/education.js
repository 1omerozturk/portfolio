const createEducationPayload = (input = {}) => ({
  institution: input.institution || '',
  degree: input.degree || '',
  fieldOfStudy: input.fieldOfStudy || '',
  startDate: input.startDate || new Date(),
  endDate: input.endDate || null,
  grade: input.grade || '',
  activities: Array.isArray(input.activities) ? input.activities : [],
  description: input.description || '',
  institutionLogo: input.institutionLogo || '',
  createdAt: input.createdAt || new Date(),
  updatedAt: input.updatedAt || new Date(),
})

module.exports = {
  collectionName: 'educations',
  createEducationPayload,
}
