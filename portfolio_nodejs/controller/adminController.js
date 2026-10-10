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
    if (typeof username !== 'string' || !username.trim() || typeof password !== 'string' || !password) {
      return res.status(400).json({ message: 'Kullanıcı adı ve şifre zorunludur.' })
    }
    const users = await getCollectionDocs('users', { filters: { username }, limit: 1 })
    const user = users.find((item) => item.username === username)
    if (!user) {
      return res.status(400).json({ message: 'Kullanıcı adı veya şifre hatalı.' })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Kullanıcı adı veya şifre hatalı.' })
    }
    if (user.role !== 'admin') return res.status(403).json({ message: 'Bu işlem için yetkiniz yok.' })
    const token = jwt.sign({ _id: user.id, role: user.role, username: user.username }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' })
    const updatedUser = await updateDoc('users', user.id, { tokens: [...(user.tokens || []), token] })
    const { password: passwordHash, tokens, ...safeUser } = updatedUser
    res.status(200).json({ token, user: safeUser })
  } catch (err) {
    res.status(500).json({ message: 'İşlem tamamlanamadı. Lütfen yeniden deneyin.' })
  }
}

// Admin get
exports.getAdmin = async (req, res) => {
  try {
    const admins = [req.user].filter(Boolean)
    if (!admins.length) {
      return res.status(404).json({ message: 'Admin bulunamadı' })
    }
    const { password: passwordHash, tokens, ...safeUser } = admins[0]
    res.status(200).json(safeUser)
  } catch (err) {
    res.status(500).json({ message: 'İşlem tamamlanamadı. Lütfen yeniden deneyin.' })
  }
}

// admin update
exports.updatePassword = async (req, res) => {
  try {
    const { username, password, rePassword } = req.body


    if (!username || !password || !rePassword) {
      return res.status(400).json({ message: 'username, password ve rePassword zorunludur.' })
    }

    // 1. Kullanıcıyı veritabanında bulun
    const users = await getCollectionDocs('users', { filters: { username }, limit: 1 })
    const user = users.find((item) => item.username === username)

    // 2. Kullanıcı bulundu mu kontrol edin
    if (!user) {
      return res.status(400).json({ message: 'Kullanıcı bulunamadı.' })
    }

    // 3. Eski şifreyi bcrypt ile doğrulayın
    // const isMatch = await bcrypt.compare(password, user.password)
    // if (!isMatch) {
    //   return res.status(400).json({ message: 'Mevcut şifre hatalı.' })
    // }

    if (typeof password !== 'string' || typeof rePassword !== 'string' || rePassword.length < 8) {
      return res.status(400).json({ message: 'Yeni şifre en az 8 karakter olmalıdır.' })
    }
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Mevcut şifre hatalı.' })
    }
    // 4. Yeni şifreyi hash'leyin ve güncelleyin
    const hashedPassword = await bcrypt.hash(rePassword, 10)
    await updateDoc('users', user.id, { password: hashedPassword, tokens: [] })

    res.status(200).json({ message: 'Şifre başarıyla güncellendi.' })
  } catch (err) {
    res.status(500).json({ message: 'İşlem tamamlanamadı. Lütfen yeniden deneyin.' })
  }
}


// Admin Controller for post update and delete
// Post
exports.createPersonalInfo = async (req, res) => {
  try {
    const personalInfo = await createDoc('personalInfo', req.body)
    res.status(201).json(personalInfo)
  } catch (error) {
    res.status(500).json({ message: 'İşlem tamamlanamadı. Lütfen yeniden deneyin.' })
  }
}

exports.createSocialLinks = async (req, res) => {
  try {
    const socialLinks = await createDoc('socialLinks', req.body)
    res.status(201).json(socialLinks)
  } catch (error) {
    res.status(500).json({ message: 'İşlem tamamlanamadı. Lütfen yeniden deneyin.' })
  }
}

exports.createEducations = async (req, res) => {
  try {
    const educations = await createDoc('educations', req.body)
    res.status(201).json(educations)
  } catch (error) {
    res.status(500).json({ message: 'İşlem tamamlanamadı. Lütfen yeniden deneyin.' })
  }
}

exports.createExperiences = async (req, res) => {
  try {
    const experiences = await createDoc('experiences', req.body)
    res.status(201).json(experiences)
  } catch (error) {
    res.status(500).json({ message: 'İşlem tamamlanamadı. Lütfen yeniden deneyin.' })
  }
}

exports.createContents = async (req, res) => {
  try {
    const contents = await createDoc('contents', req.body)
    res.status(201).json(contents)
  } catch (error) {
    res.status(500).json({ message: 'İşlem tamamlanamadı. Lütfen yeniden deneyin.' })
  }
}

exports.createSkills = async (req, res) => {
  try {
    const skills = await createDoc('skills', req.body)
    res.status(201).json(skills)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'İşlem tamamlanamadı. Lütfen yeniden deneyin.' })
  }
}

exports.createProjects = async (req, res) => {
  try {
    const projects = await createDoc('projects', req.body)
    res.status(201).json(projects)
  } catch (error) {
    res.status(500).json({ message: 'İşlem tamamlanamadı. Lütfen yeniden deneyin.' })
  }
}

exports.createCertifications = async (req, res) => {
  try {
    const certifications = await createDoc('certifications', req.body)
    res.status(201).json(certifications)
  } catch (error) {
    res.status(500).json({ message: 'İşlem tamamlanamadı. Lütfen yeniden deneyin.' })
  }
}

exports.createLanguages = async (req, res) => {
  try {
    const languages = await createDoc('languages', req.body)
    res.status(201).json(languages)
  } catch (error) {
    res.status(500).json({ message: 'İşlem tamamlanamadı. Lütfen yeniden deneyin.' })
  }
}

exports.createReferences = async (req, res) => {
  try {
    const references = await createDoc('references', req.body)
    res.status(201).json(references)
  } catch (error) {
    res.status(500).json({ message: 'İşlem tamamlanamadı. Lütfen yeniden deneyin.' })
  }
}

exports.createHobbies = async (req, res) => {
  try {
    const hobbies = await createDoc('hobbies', req.body)
    res.status(201).json(hobbies)
  } catch (error) {
    res.status(500).json({ message: 'İşlem tamamlanamadı. Lütfen yeniden deneyin.' })
  }
}

// Update
exports.updatePersonalInfo = async (req, res) => {
  try {
    const personalInfo = await updateDoc('personalInfo', req.params.id, req.body)
    if (!personalInfo) return res.status(404).json({ message: 'Kayıt bulunamadı.' })
    res.status(200).json(personalInfo)
  } catch (error) {
    res.status(500).json({ message: 'İşlem tamamlanamadı. Lütfen yeniden deneyin.' })
  }
}

exports.updateSocialLinks = async (req, res) => {
  try {
    const id = req.params.id
    const socialLink = await updateDoc('socialLinks', id, req.body)
    if (!socialLink) return res.status(404).json({ message: 'Kayıt bulunamadı.' })
    res.status(200).json(socialLink)
  } catch (error) {
    res.status(500).json({ message: 'İşlem tamamlanamadı. Lütfen yeniden deneyin.' })
  }
}

exports.updateEducations = async (req, res) => {
  try {
    const educations = await updateDoc('educations', req.params.id, req.body)
    if (!educations) return res.status(404).json({ message: 'Kayıt bulunamadı.' })
    res.status(200).json(educations)
  } catch (error) {
    res.status(500).json({ message: 'İşlem tamamlanamadı. Lütfen yeniden deneyin.' })
  }
}

exports.updateExperiences = async (req, res) => {
  try {
    const experiences = await updateDoc('experiences', req.params.id, req.body)
    if (!experiences) return res.status(404).json({ message: 'Kayıt bulunamadı.' })
    res.status(200).json(experiences)
  } catch (error) {
    res.status(500).json({ message: 'İşlem tamamlanamadı. Lütfen yeniden deneyin.' })
  }
}

exports.updateContents = async (req, res) => {
  try {
    const content = await updateDoc('contents', req.params.id, req.body)
    if (!content) return res.status(404).json({ message: 'Kayıt bulunamadı.' })
    res.status(200).json(content)
  } catch (error) {
    res.status(500).json({ message: 'İşlem tamamlanamadı. Lütfen yeniden deneyin.' })
  }
}

exports.updateSkills = async (req, res) => {
  try {
    const skills = await updateDoc('skills', req.params.id, req.body)
    if (!skills) return res.status(404).json({ message: 'Kayıt bulunamadı.' })
    res.status(200).json(skills)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'İşlem tamamlanamadı. Lütfen yeniden deneyin.' })
  }
}

exports.updateProjects = async (req, res) => {
  try {
    const projects = await updateDoc('projects', req.params.id, req.body)
    if (!projects) return res.status(404).json({ message: 'Kayıt bulunamadı.' })
    res.status(200).json(projects)
  } catch (error) {
    res.status(500).json({ message: 'İşlem tamamlanamadı. Lütfen yeniden deneyin.' })
  }
}

exports.updateCertifications = async (req, res) => {
  try {
    const certifications = await updateDoc('certifications', req.params.id, req.body)
    if (!certifications) return res.status(404).json({ message: 'Kayıt bulunamadı.' })
    res.status(200).json(certifications)
  } catch (error) {
    res.status(500).json({ message: 'İşlem tamamlanamadı. Lütfen yeniden deneyin.' })
  }
}

exports.updateLanguages = async (req, res) => {
  try {
    const languages = await updateDoc('languages', req.params.id, req.body)
    if (!languages) return res.status(404).json({ message: 'Kayıt bulunamadı.' })
    res.status(200).json(languages)
  } catch (error) {
    res.status(500).json({ message: 'İşlem tamamlanamadı. Lütfen yeniden deneyin.' })
  }
}

exports.updateReferences = async (req, res) => {
  try {
    const references = await updateDoc('references', req.params.id, req.body)
    if (!references) return res.status(404).json({ message: 'Kayıt bulunamadı.' })
    res.status(200).json(references)
  } catch (error) {
    res.status(500).json({ message: 'İşlem tamamlanamadı. Lütfen yeniden deneyin.' })
  }
}

exports.updateHobbies = async (req, res) => {
  try {
    const hobbies = await updateDoc('hobbies', req.params.id, req.body)
    if (!hobbies) return res.status(404).json({ message: 'Kayıt bulunamadı.' })
    res.status(200).json(hobbies)
  } catch (error) {
    res.status(500).json({ message: 'İşlem tamamlanamadı. Lütfen yeniden deneyin.' })
  }
}

// Delete
exports.deletePersonalInfo = async (req, res) => {
  try {
    await deleteDoc('personalInfo', req.params.id)
    res.status(200).json({ message: 'Personal Info deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'İşlem tamamlanamadı. Lütfen yeniden deneyin.' })
  }
}

exports.deleteSocialLinks = async (req, res) => {
  try {
    await deleteDoc('socialLinks', req.params.id)
    res.status(200).json({ message: 'Social Links deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'İşlem tamamlanamadı. Lütfen yeniden deneyin.' })
  }
}

exports.deleteEducations = async (req, res) => {
  try {
    await deleteDoc('educations', req.params.id)
    res.status(200).json({ message: 'Educations deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'İşlem tamamlanamadı. Lütfen yeniden deneyin.' })
  }
}

exports.deleteExperiences = async (req, res) => {
  try {
    await deleteDoc('experiences', req.params.id)
    res.status(200).json({ message: 'Experiences deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'İşlem tamamlanamadı. Lütfen yeniden deneyin.' })
  }
}

exports.deleteContents = async (req, res) => {
  try {
    await deleteDoc('contents', req.params.id)
    res.status(200).json({ message: 'Contents deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'İşlem tamamlanamadı. Lütfen yeniden deneyin.' })
  }
}

exports.deleteSkills = async (req, res) => {
  try {
    await deleteDoc('skills', req.params.id)
    res.status(200).json({ message: 'Skills deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'İşlem tamamlanamadı. Lütfen yeniden deneyin.' })
  }
}

exports.deleteProjects = async (req, res) => {
  try {
    await deleteDoc('projects', req.params.id)
    res.status(200).json({ message: 'Projects deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'İşlem tamamlanamadı. Lütfen yeniden deneyin.' })
  }
}

exports.deleteCertifications = async (req, res) => {
  try {
    await deleteDoc('certifications', req.params.id)
    res.status(200).json({ message: 'Certifications deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'İşlem tamamlanamadı. Lütfen yeniden deneyin.' })
  }
}

exports.deleteLanguages = async (req, res) => {
  try {
    await deleteDoc('languages', req.params.id)
    res.status(200).json({ message: 'Languages deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'İşlem tamamlanamadı. Lütfen yeniden deneyin.' })
  }
}

exports.deleteReferences = async (req, res) => {
  try {
    await deleteDoc('references', req.params.id)
    res.status(200).json({ message: 'References deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'İşlem tamamlanamadı. Lütfen yeniden deneyin.' })
  }
}

exports.deleteHobbies = async (req, res) => {
  try {
    await deleteDoc('hobbies', req.params.id)
    res.status(200).json({ message: 'Hobbies deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'İşlem tamamlanamadı. Lütfen yeniden deneyin.' })
  }
}

// message management
exports.getMessages = async (req, res) => {
  try {
    const messages = sortDocs(await getCollectionDocs('messages'), 'createdAt', 'desc')
    res.status(200).json(messages)
  } catch (error) {
    res.status(500).json({ message: 'İşlem tamamlanamadı. Lütfen yeniden deneyin.' })
  }
}

exports.deleteMessage = async (req, res) => {
  try {
    await deleteDoc('messages', req.params.id)
    res.status(200).json({ message: 'Message deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'İşlem tamamlanamadı. Lütfen yeniden deneyin.' })
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
    const { title, content, author, category, tags, excerpt, featuredImage, isPublished } = req.body
    
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
      isPublished: isPublished !== false,
      views: 0,
      readingTime: Math.ceil(content.split(/\s+/).length / 200)
    })

    res.status(201).json(blog)
  } catch (error) {
    console.error('Create Blog Error:', error)
    res.status(500).json({ message: 'İşlem tamamlanamadı. Lütfen yeniden deneyin.' })
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
      readingTime: typeof content === 'string' ? Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200)) : undefined
    })

    if (!blog) {
      return res.status(404).json({ message: 'Blog bulunamadı' })
    }

    res.status(200).json(blog)
  } catch (error) {
    console.error('Update Blog Error:', error)
    res.status(500).json({ message: 'İşlem tamamlanamadı. Lütfen yeniden deneyin.' })
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
    res.status(500).json({ message: 'İşlem tamamlanamadı. Lütfen yeniden deneyin.' })
  }
}

const { parseOptions, listBlogs, respondError } = require('../service/blogQuery')
exports.getAdminBlogs = async (req, res) => {
  try { res.status(200).json(await listBlogs(parseOptions(req.query, { limit: 10 }), true)) }
  catch (error) { respondError(res, error) }
}
exports.getAdminBlogById = async (req, res) => {
  try {
    const blog = await getDocById('blogs', req.params.id)
    if (!blog) return res.status(404).json({ message: 'Blog bulunamadı' })
    res.status(200).json(blog)
  } catch (error) { respondError(res, error) }
}


