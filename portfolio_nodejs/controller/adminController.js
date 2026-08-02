const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {
  getCollectionDocs,
  getDocById,
  createDoc,
  updateDoc,
  deleteDoc,
  sortDocs
} = require('../service/firestoreRepository')

// Admin login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body
    const users = await getCollectionDocs('users')
    const user = users.find((item) => item.username === username)
    if (!user) {
      return res.status(400).json({ message: 'Invalid email' })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' })
    }
    const token = jwt.sign({ _id: user.id, role: user.role, username: user.username }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' })
    const updatedUser = await updateDoc('users', user.id, { tokens: [...(user.tokens || []), token] })
    res.status(200).json({ token, user: updatedUser })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Admin get
exports.getAdmin = async (req, res) => {
  try {
    const admins = (await getCollectionDocs('users')).filter((item) => item.role === 'admin')
    if (!admins.length) {
      return res.status(404).json({ message: 'Admin bulunamadı' })
    }
    res.status(200).json(admins[0])
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// admin update
/* exports.updatePassword = async (req, res) => {
  try {
    const { username, password, newpassword } = req.body
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }
    console.log(user.password)
    user.password = newpassword
    await user.save()
    console.log(user.password)
    res.status(200).json({ message: 'Password updated successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
} */

// Admin Controller for post update and delete
// Post
exports.createPersonalInfo = async (req, res) => {
  try {
    const personalInfo = await createDoc('personalInfo', req.body)
    res.status(201).json(personalInfo)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.createSocialLinks = async (req, res) => {
  try {
    const socialLinks = await createDoc('socialLinks', req.body)
    res.status(201).json(socialLinks)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.createEducations = async (req, res) => {
  try {
    const educations = await createDoc('educations', req.body)
    res.status(201).json(educations)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.createExperiences = async (req, res) => {
  try {
    const experiences = await createDoc('experiences', req.body)
    res.status(201).json(experiences)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.createContents = async (req, res) => {
  try {
    const contents = await createDoc('contents', req.body)
    res.status(201).json(contents)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.createSkills = async (req, res) => {
  try {
    const skills = await createDoc('skills', req.body)
    res.status(201).json(skills)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}

exports.createProjects = async (req, res) => {
  try {
    const projects = await createDoc('projects', req.body)
    res.status(201).json(projects)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.createCertifications = async (req, res) => {
  try {
    const certifications = await createDoc('certifications', req.body)
    res.status(201).json(certifications)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.createLanguages = async (req, res) => {
  try {
    const languages = await createDoc('languages', req.body)
    res.status(201).json(languages)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.createReferences = async (req, res) => {
  try {
    const references = await createDoc('references', req.body)
    res.status(201).json(references)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.createHobbies = async (req, res) => {
  try {
    const hobbies = await createDoc('hobbies', req.body)
    res.status(201).json(hobbies)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Update
exports.updatePersonalInfo = async (req, res) => {
  try {
    const personalInfo = await updateDoc('personalInfo', req.params.id, req.body)
    res.status(200).json(personalInfo)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateSocialLinks = async (req, res) => {
  try {
    const id = req.params.id
    const socialLink = await updateDoc('socialLinks', id, req.body)
    res.status(200).json(socialLink)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateEducations = async (req, res) => {
  try {
    const educations = await updateDoc('educations', req.params.id, req.body)
    res.status(200).json(educations)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateExperiences = async (req, res) => {
  try {
    const experiences = await updateDoc('experiences', req.params.id, req.body)
    res.status(200).json(experiences)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateContents = async (req, res) => {
  try {
    const content = await updateDoc('contents', req.params.id, req.body)
    res.status(200).json(content)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateSkills = async (req, res) => {
  try {
    const skills = await updateDoc('skills', req.params.id, req.body)
    res.status(200).json(skills)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}

exports.updateProjects = async (req, res) => {
  try {
    const projects = await updateDoc('projects', req.params.id, req.body)
    res.status(200).json(projects)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateCertifications = async (req, res) => {
  try {
    const certifications = await updateDoc('certifications', req.params.id, req.body)
    res.status(200).json(certifications)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateLanguages = async (req, res) => {
  try {
    const languages = await updateDoc('languages', req.params.id, req.body)
    res.status(200).json(languages)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateReferences = async (req, res) => {
  try {
    const references = await updateDoc('references', req.params.id, req.body)
    res.status(200).json(references)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateHobbies = async (req, res) => {
  try {
    const hobbies = await updateDoc('hobbies', req.params.id, req.body)
    res.status(200).json(hobbies)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Delete
exports.deletePersonalInfo = async (req, res) => {
  try {
    await deleteDoc('personalInfo', req.params.id)
    res.status(200).json({ message: 'Personal Info deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.deleteSocialLinks = async (req, res) => {
  try {
    await deleteDoc('socialLinks', req.params.id)
    res.status(200).json({ message: 'Social Links deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.deleteEducations = async (req, res) => {
  try {
    await deleteDoc('educations', req.params.id)
    res.status(200).json({ message: 'Educations deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.deleteExperiences = async (req, res) => {
  try {
    await deleteDoc('experiences', req.params.id)
    res.status(200).json({ message: 'Experiences deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.deleteContents = async (req, res) => {
  try {
    await deleteDoc('contents', req.params.id)
    res.status(200).json({ message: 'Contents deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.deleteSkills = async (req, res) => {
  try {
    await deleteDoc('skills', req.params.id)
    res.status(200).json({ message: 'Skills deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.deleteProjects = async (req, res) => {
  try {
    await deleteDoc('projects', req.params.id)
    res.status(200).json({ message: 'Projects deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.deleteCertifications = async (req, res) => {
  try {
    await deleteDoc('certifications', req.params.id)
    res.status(200).json({ message: 'Certifications deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.deleteLanguages = async (req, res) => {
  try {
    await deleteDoc('languages', req.params.id)
    res.status(200).json({ message: 'Languages deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.deleteReferences = async (req, res) => {
  try {
    await deleteDoc('references', req.params.id)
    res.status(200).json({ message: 'References deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.deleteHobbies = async (req, res) => {
  try {
    await deleteDoc('hobbies', req.params.id)
    res.status(200).json({ message: 'Hobbies deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// message management
exports.getMessages = async (req, res) => {
  try {
    const messages = sortDocs(await getCollectionDocs('messages'), 'createdAt', 'desc')
    res.status(200).json(messages)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.deleteMessage = async (req, res) => {
  try {
    await deleteDoc('messages', req.params.id)
    res.status(200).json({ message: 'Message deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.markMessage = async (req, res) => {
  try {
    const { id } = req.params
    const { isRead } = req.query

    let isReadBoolean
    if (isRead === 'true') {
      isReadBoolean = true
    } else if (isRead === 'false') {
      isReadBoolean = false
    } else {
      return res
        .status(400)
        .json({
          message: 'Invalid isRead parameter. It must be "true" or "false".',
        })
    }

    const message = await updateDoc('messages', id, { isRead: isReadBoolean })

    if (!message) {
      return res.status(404).json({ message: 'Message not found' })
    }

    res.status(200).json(message)
  } catch (error) {
    console.error('Mark Message Error:', error)
    res.status(500).json({ message: 'Internal server error.' })
  }
}

// Blog Management
exports.createBlog = async (req, res) => {
  try {
    const { title, content, author, category, tags, excerpt, featuredImage } = req.body
    
    if (!title || !content || !author) {
      return res.status(400).json({ message: 'Title, content ve author gereklidir' })
    }

    const blog = await createDoc('blogs', {
      title,
      content,
      author,
      category: category || 'yazı',
      tags: tags || [],
      excerpt: excerpt || content.substring(0, 150),
      featuredImage,
      isPublished: true,
      views: 0,
      readingTime: Math.ceil(content.split(/\s+/).length / 200)
    })

    res.status(201).json(blog)
  } catch (error) {
    console.error('Create Blog Error:', error)
    res.status(500).json({ message: error.message })
  }
}

exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params
    const { title, content, author, category, tags, excerpt, featuredImage, isPublished } = req.body
    
    const blog = await updateDoc('blogs', id, {
      title,
      content,
      author,
      category,
      tags,
      excerpt,
      featuredImage,
      isPublished,
      updatedAt: new Date()
    })

    if (!blog) {
      return res.status(404).json({ message: 'Blog bulunamadı' })
    }

    res.status(200).json(blog)
  } catch (error) {
    console.error('Update Blog Error:', error)
    res.status(500).json({ message: error.message })
  }
}

exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params
    const blog = await getDocById('blogs', id)

    if (!blog) {
      return res.status(404).json({ message: 'Blog bulunamadı' })
    }

    await deleteDoc('blogs', id)
    res.status(200).json({ message: 'Blog başarıyla silindi' })
  } catch (error) {
    console.error('Delete Blog Error:', error)
    res.status(500).json({ message: error.message })
  }
}

exports.getAllBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query
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
    const total = filtered.length

    res.status(200).json({
      blogs,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page)
    })
  } catch (error) {
    console.error('Get All Blogs Error:', error)
    res.status(500).json({ message: error.message })
  }
}



exports.getBlogById = async (req, res) => {
  try {
    const { id } = req.params
    const currentBlog = await getDocById('blogs', id)

    if (!currentBlog) {
      return res.status(404).json({ message: 'Blog bulunamadı' })
    }

    const blog = await updateDoc('blogs', id, { views: (currentBlog.views || 0) + 1 })

    if (!blog.isPublished) {
      return res.status(403).json({ message: 'Bu blog yayınlanmamış' })
    }

    res.status(200).json(blog)
  } catch (error) {
    console.error('Get Blog Error:', error)
    res.status(500).json({ message: error.message })
  }
}

exports.getAdminBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search, status } = req.query
    const allBlogs = sortDocs(await getCollectionDocs('blogs'), 'createdAt', 'desc')
    const filtered = allBlogs.filter((blog) => {
      if (category && blog.category !== category) return false
      if (status && blog.isPublished !== (status === 'published')) return false
      if (search) {
        const haystack = `${blog.title || ''} ${blog.content || ''} ${blog.tags?.join(' ') || ''}`.toLowerCase()
        if (!haystack.includes(search.toLowerCase())) return false
      }
      return true
    })

    const skip = (page - 1) * limit
    const blogs = filtered.slice(skip, skip + parseInt(limit))
    const total = filtered.length

    res.status(200).json({
      blogs,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page)
    })
  } catch (error) {
    console.error('Get Admin Blogs Error:', error)
    res.status(500).json({ message: error.message })
  }
}

exports.getAdminBlogById=async(req,res)=>{
  try {
    const {id}=req.params
    const blog = await getDocById('blogs', id)

    if (!blog) {
      return res.status(404).json({ message: 'Blog bulunamadı' })
    }

    if (!blog.isPublished) {
      return res.status(403).json({ message: 'Bu blog yayınlanmamış' })
    }

    res.status(200).json(blog)
  } catch (error) {
    console.error("Get Admin Blog By Id Error:", error)
    res.status(500).json({message:error.message})
  }
}
