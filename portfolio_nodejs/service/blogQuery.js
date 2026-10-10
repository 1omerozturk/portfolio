const { getCollectionDocs, sortDocs } = require('./firestoreRepository')

function parseOptions(query = {}, defaults = {}) {
  const integer = (value, fallback, max) => {
    if (value === undefined) return fallback
    if (typeof value !== 'string' || !/^[1-9]\d*$/.test(value)) throw new Error('INVALID_QUERY')
    const result = Number(value)
    if (!Number.isSafeInteger(result) || result > max) throw new Error('INVALID_QUERY')
    return result
  }
  const text = (value, max) => {
    if (value === undefined) return ''
    if (typeof value !== 'string' || value.length > max) throw new Error('INVALID_QUERY')
    return value.trim()
  }
  const status = text(query.status, 20)
  if (status && !['published', 'draft'].includes(status)) throw new Error('INVALID_QUERY')
  return { page: integer(query.page, 1, 100000), limit: integer(query.limit, defaults.limit || 6, 100), category: text(query.category, 100), search: text(query.search, 200), status }
}

function isPublished(blog) {
  return blog.isPublished === true || blog.isPublished === 'true'
}

async function listBlogs(options, admin = false) {
  // Category equality uses a single-field Firestore index; text search stays in memory.
  const records = await getCollectionDocs('blogs', options.category ? { filters: { category: options.category } } : {})
  const needle = options.search.toLocaleLowerCase('tr-TR')
  const filtered = sortDocs(records.filter(blog => {
    const published = isPublished(blog)
    if (!admin && !published) return false
    if (admin && options.status && published !== (options.status === 'published')) return false
    const tags = Array.isArray(blog.tags) ? blog.tags.filter(tag => typeof tag === 'string').join(' ') : ''
    return !needle || [blog.title, blog.content, tags].filter(value => typeof value === 'string').join(' ').toLocaleLowerCase('tr-TR').includes(needle)
  }), 'createdAt', 'desc')
  const total = filtered.length
  const start = (options.page - 1) * options.limit
  return { blogs: filtered.slice(start, start + options.limit), total, pages: Math.ceil(total / options.limit), currentPage: options.page }
}

function respondError(res, error) {
  if (error.message === 'INVALID_QUERY') return res.status(400).json({ message: 'Geçersiz sayfalama veya filtre.' })
  return res.status(500).json({ message: 'İçerikler yüklenemedi. Lütfen yeniden deneyin.' })
}
module.exports = { parseOptions, listBlogs, isPublished, respondError }
