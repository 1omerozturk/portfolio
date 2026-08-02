const createBlogPayload = (input = {}) => {
  const content = input.content || ''
  const words = content.trim().split(/\s+/).filter(Boolean).length
  const readingTime = input.readingTime || Math.ceil(words / 200)

  return {
    title: input.title || '',
    content,
    author: input.author || '',
    category: input.category || 'yazı',
    tags: Array.isArray(input.tags) ? input.tags : [],
    excerpt: input.excerpt || content.substring(0, 150),
    views: typeof input.views === 'number' ? input.views : 0,
    isPublished: typeof input.isPublished === 'boolean' ? input.isPublished : true,
    featuredImage: input.featuredImage || '',
    createdAt: input.createdAt || new Date(),
    updatedAt: input.updatedAt || new Date(),
    readingTime,
  }
}

module.exports = {
  collectionName: 'blogs',
  createBlogPayload,
}
