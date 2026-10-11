const createSkillPayload = (input = {}) => ({
  name: input.name || '',
  nameEn: input.nameEn || '',
  level: input.level || 'Beginner',
  percentage: input.percentage || 0,
  icon: input.icon || '',
  color: input.color || '',
  createdAt: input.createdAt || new Date(),
  updatedAt: input.updatedAt || new Date(),
})

module.exports = {
  collectionName: 'skills',
  createSkillPayload,
}

