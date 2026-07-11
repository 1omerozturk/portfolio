const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true 
  },
  content: { 
    type: String, 
    required: true 
  },
  author: { 
    type: String, 
    required: true,
    trim: true 
  },
  category: { 
    type: String, 
    enum: ['yazı', 'düşünce', 'özlü söz', 'teknik', 'diğer'],
    default: 'yazı'
  },
  tags: [String],
  excerpt: { 
    type: String,
    trim: true 
  },
  views: { 
    type: Number, 
    default: 0 
  },
  isPublished: { 
    type: Boolean, 
    default: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  },
  featuredImage: String,
  readingTime: Number // Tahmini okuma süresi (dakika)
})

// Okuma süresini otomatik hesapla
blogSchema.pre('save', function(next) {
  if (this.content) {
    const wordsPerMinute = 200
    const wordCount = this.content.split(/\s+/).length
    this.readingTime = Math.ceil(wordCount / wordsPerMinute)
  }
  next()
})

module.exports = mongoose.model('Blog', blogSchema)
