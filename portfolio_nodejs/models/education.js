const createEducationPayload = (input = {}) => ({
  institution: input.institution || '',
  institutionEn: input.institutionEn || '',
  degreeEn: input.degreeEn || '',
  fieldOfStudyEn: input.fieldOfStudyEn || '',
  descriptionEn: input.descriptionEn || '',
  degree: input.degree || '',
  fieldOfStudy: input.fieldOfStudy || '',
  startDate: input.startDate || new Date(),
  endDate: input.endDate || null,
  grade: input.grade || '',
  activities: Array.isArray(input.activities) ? input.activities : [],
  activitiesEn: Array.isArray(input.activitiesEn) ? input.activitiesEn : [],
  description: input.description || '',
  institutionLogo: input.institutionLogo || '',
  createdAt: input.createdAt || new Date(),
  updatedAt: input.updatedAt || new Date(),
})

module.exports = {
  collectionName: 'educations',
  createEducationPayload,
}


