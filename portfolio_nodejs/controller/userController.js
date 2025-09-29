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
