const {
  getCollectionDocs,
  getDocById,
  createDoc,
  updateDoc,
  deleteDoc,
  sortDocs
} = require('../service/firestoreRepository')

// message post
exports.postMessage = async (req, res) => {
  try {
    const message = await createDoc('messages', req.body)
    res.status(201).json('Message send successfully')
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getPersonalInfo = async (req, res) => {
  try {
    const personalInfo = await getCollectionDocs('personalInfo')
    res.status(200).json(personalInfo)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getSocialLinks = async (req, res) => {
  try {
    const socialLinks = await getCollectionDocs('socialLinks')
    res.status(200).json(socialLinks)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getEducations = async (req, res) => {
  try {
    const educations = sortDocs(await getCollectionDocs('educations'), 'createdAt', 'desc')
    res.status(200).json(educations)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getExperiences = async (req, res) => {
  try {
    const experiences = sortDocs(await getCollectionDocs('experiences'), 'createdAt', 'desc')
    res.status(200).json(experiences)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
exports.getContents = async (req, res) => {
  try {
    const contents = await getCollectionDocs('contents')
    res.status(200).json(contents)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getSkills = async (req, res) => {
  try {
    const skills = await getCollectionDocs('skills')
    res.status(200).json(skills)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getProjects = async (req, res) => {
  try {
    const projects = sortDocs(await getCollectionDocs('projects'), 'createdAt', 'desc')
    res.status(200).json(projects)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getCertifications = async (req, res) => {
  try {
    const certifications = await getCollectionDocs('certifications')
    res.status(200).json(certifications)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getLanguages = async (req, res) => {
  try {
    const languages = await getCollectionDocs('languages')
    res.status(200).json(languages)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getReferences = async (req, res) => {
  try {
    const references = await getCollectionDocs('references')
    res.status(200).json(references)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getHobbies = async (req, res) => {
  try {
    const hobbies = await getCollectionDocs('hobbies')
    res.status(200).json(hobbies)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// one data return functions

exports.getOnePersonalInfo = async (req, res) => {
  try {
    const id = req.params.id
    const personalInfo = await getDocById('personalInfo', id)
    res.status(200).json(personalInfo)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getOneSocialLinks = async (req, res) => {
  try {
    const id = req.params.id
    const socialLinks = await getDocById('socialLinks', id)
    res.status(200).json(socialLinks)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getOneEducations = async (req, res) => {
  try {
    const id = req.params.id
    const educations = await getDocById('educations', id)
    res.status(200).json(educations)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getOneExperiences = async (req, res) => {
  try {
    const id = req.params.id
    const experiences = await getDocById('experiences', id)
    res.status(200).json(experiences)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getOneContents = async (req, res) => {
  try {
    const id = req.params.id
    const contents = await getDocById('contents', id)
    res.status(200).json(contents)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getOneSkills = async (req, res) => {
  try {
    const id = req.params.id
    const skills = await getDocById('skills', id)
    res.status(200).json(skills)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getOneProjects = async (req, res) => {
  try {
    const id = req.params.id
    const projects = await getDocById('projects', id)
    res.status(200).json(projects)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getOneCertifications = async (req, res) => {
  try {
    const id = req.params.id
    const certifications = await getDocById('certifications', id)
    res.status(200).json(certifications)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getOneLanguages = async (req, res) => {
  try {
    const id = req.params.id
    const languages = await getDocById('languages', id)
    res.status(200).json(languages)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getOneReferences = async (req, res) => {
  try {
    const id = req.params.id
    const references = await getDocById('references', id)
    res.status(200).json(references)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getOneHobbies = async (req, res) => {
  try {
    const id = req.params.id
    const hobbies = await getDocById('hobbies', id)
    res.status(200).json(hobbies)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Blog endpoints for users
exports.getBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 6, category, search } = req.query
    const allBlogs = sortDocs(await getCollectionDocs('blogs'), 'createdAt', 'desc')
    const filtered = allBlogs.filter((blog) => {
      if (!blog.isPublished) return false
      if (category && blog.category !== category) return false
      if (search) {
        const haystack = `${blog.title || ''} ${blog.content || ''} ${blog.tags?.join(' ') || ''}`.toLowerCase()
        if (!haystack.includes(search.toLowerCase())) return false
      }
      return true
    })

    const skip = (page - 1) * limit
    const blogs = filtered.slice(skip, skip + parseInt(limit))

    const total = await Blogs.countDocuments(query)

    res.status(200).json({
      blogs,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page)
    })
  } catch (error) {
    console.error('Get Blogs Error:', error)
    res.status(500).json({ message: error.message })
  }
}

exports.getBlogById = async (req, res) => {
  try {
    const { id } = req.params
    
    // Views sayısını artır
    const blog = await Blogs.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    )

    if (!blog) {
      return res.status(404).json({ message: 'Blog bulunamadı' })
    }

    if (!blog.isPublished) {
      return res.status(403).json({ message: 'Bu blog yayınlanmamış' })
    }

    res.status(200).json(blog)
  } catch (error) {
    console.error('Get Blog Error:', error)
    res.status(500).json({ message: error.message })
  }
}

exports.getBlogsByCategory = async (req, res) => {
  try {
    const { category } = req.params
    const { page = 1, limit = 6 } = req.query

    const skip = (page - 1) * limit

    const blogs = await Blogs.find({ 
      category, 
      isPublished: true 
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))

    const total = await Blogs.countDocuments({ 
      category, 
      isPublished: true 
    })

    res.status(200).json({
      blogs,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page)
    })
  } catch (error) {
    console.error('Get Blogs By Category Error:', error)
    res.status(500).json({ message: error.message })
  }
}

exports.searchBlogs = async (req, res) => {
  try {
    const { query } = req.query
    
    if (!query || query.trim() === '') {
      return res.status(400).json({ message: 'Arama terimi gereklidir' })
    }

    const blogs = await Blogs.find(
      {
        isPublished: true,
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { content: { $regex: query, $options: 'i' } },
          { tags: { $in: [new RegExp(query, 'i')] } }
        ]
      }
    ).sort({ createdAt: -1 })

    res.status(200).json(blogs)
  } catch (error) {
    console.error('Search Blogs Error:', error)
    res.status(500).json({ message: error.message })
  }
}
