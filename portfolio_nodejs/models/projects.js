const createProjectPayload = (input = {}) => ({
  title: input.title || '',
  titleEn: input.titleEn || '',
  description: input.description || '',
  descriptionEn: input.descriptionEn || '',
  type: input.type || 'web',
  technologies: Array.isArray(input.technologies) ? input.technologies : [],
  repoLink: input.repoLink || '',
  liveDemoLink: input.liveDemoLink || '',
  images: Array.isArray(input.images) ? input.images : [],
  isShowcasing: input.isShowcasing || 'false',
  createdAt: input.createdAt || new Date(),
  updatedAt: input.updatedAt || new Date(),
})

module.exports = {
  collectionName: 'projects',
  createProjectPayload,
}

