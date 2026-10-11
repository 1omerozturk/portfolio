const createLanguagePayload = (input = {}) => ({
  name: input.name || '',
  nameEn: input.nameEn || '',
  proficiencyEn: input.proficiencyEn || '',
  proficiency: input.proficiency || 'Beginner',
  createdAt: input.createdAt || new Date(),
  updatedAt: input.updatedAt || new Date(),
})

module.exports = {
  collectionName: 'languages',
  createLanguagePayload,
}

