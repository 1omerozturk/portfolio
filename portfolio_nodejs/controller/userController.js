const PersonalInfos = require('../models/personalInfo')
const SocialLinks = require('../models/socialLinks')
const Educations = require('../models/education')
const Experiences = require('../models/experiences')
const Skills = require('../models/skills')
const Projects = require('../models/projects')
const Certifications = require('../models/certifications')
const Languages = require('../models/languages')
const References = require('../models/references')
const Hobbies = require('../models/hobbies')
const Contents = require('../models/contents')
const Messages = require('../models/messages')
const Blogs = require('../models/blogs')

// message post
exports.postMessage = async (req, res) => {
  try {
    const message = await new Messages(req.body)
    await message.save()
    res.status(201).json('Message send successfully')
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getPersonalInfo = async (req, res) => {
  try {
    const personalInfo = await PersonalInfos.find()
    res.status(200).json(personalInfo)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getSocialLinks = async (req, res) => {
  try {
    const socialLinks = await SocialLinks.find()
    res.status(200).json(socialLinks)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getEducations = async (req, res) => {
  try {
    const educations = await Educations.find({}).sort({_id:-1}) 
    res.status(200).json(educations)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getExperiences = async (req, res) => {
  try {
    const experiences = await Experiences.find({}).sort({_id:-1})
    res.status(200).json(experiences)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
exports.getContents = async (req, res) => {
  try {
    const contents = await Contents.find()
    res.status(200).json(contents)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getSkills = async (req, res) => {
  try {
    const skills = await Skills.find()
    res.status(200).json(skills)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getProjects = async (req, res) => {
  try {
    const projects = await Projects.find({}).sort({_id:-1})
    res.status(200).json(projects)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getCertifications = async (req, res) => {
  try {
    const certifications = await Certifications.find()
    res.status(200).json(certifications)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getLanguages = async (req, res) => {
  try {
    const languages = await Languages.find()
    res.status(200).json(languages)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getReferences = async (req, res) => {
  try {
    const references = await References.find()
    res.status(200).json(references)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getHobbies = async (req, res) => {
  try {
    const hobbies = await Hobbies.find()
    res.status(200).json(hobbies)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// one data return functions

exports.getOnePersonalInfo = async (req, res) => {
  try {
    const id = req.params.id
    const personalInfo = await PersonalInfos.findById(id)
    res.status(200).json(personalInfo)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getOneSocialLinks = async (req, res) => {
  try {
    const id = req.params.id
    const socialLinks = await SocialLinks.findById(id)
    res.status(200).json(socialLinks)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getOneEducations = async (req, res) => {
  try {
    const id = req.params.id
    const educations = await Educations.findById(id)
    res.status(200).json(educations)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getOneExperiences = async (req, res) => {
  try {
    const id = req.params.id
    const experiences = await Experiences.findById(id)
    res.status(200).json(experiences)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getOneContents = async (req, res) => {
  try {
    const id = req.params.id
    const contents = await Contents.findById(id)
    res.status(200).json(contents)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getOneSkills = async (req, res) => {
  try {
    const id = req.params.id
    const skills = await Skills.findById(id)
    res.status(200).json(skills)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getOneProjects = async (req, res) => {
  try {
    const id = req.params.id
    const projects = await Projects.findById(id)
    res.status(200).json(projects)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getOneCertifications = async (req, res) => {
  try {
    const id = req.params.id
    const certifications = await Certifications.findById(id)
    res.status(200).json(certifications)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getOneLanguages = async (req, res) => {
  try {
    const id = req.params.id
    const languages = await Languages.findById(id)
    res.status(200).json(languages)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getOneReferences = async (req, res) => {
  try {
    const id = req.params.id
    const references = await References.findById(id)
    res.status(200).json(references)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getOneHobbies = async (req, res) => {
  try {
    const id = req.params.id
    const hobbies = await Hobbies.findById(id)
    res.status(200).json(hobbies)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Blog endpoints for users
exports.getBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 6, category, search } = req.query
    
    const query = { isPublished: true }
    
    if (category) {
      query.category = category
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ]
    }

    const skip = (page - 1) * limit
    
    const blogs = await Blogs.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))

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
