const createPostPayload = (input = {}) => ({
  title: input.title || '',
  content: input.content || '',
  date: input.date || new Date(),
  tags: Array.isArray(input.tags) ? input.tags : [],
  coverImage: input.coverImage || '',
  createdAt: input.createdAt || new Date(),
  updatedAt: input.updatedAt || new Date(),
})

module.exports = {
  collectionName: 'posts',
  createPostPayload,
}
