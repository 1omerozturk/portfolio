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
    const educations = await Educations.find()
    res.status(200).json(educations)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getExperiences = async (req, res) => {
  try {
    const experiences = await Experiences.find()
    res.status(200).json(experiences)
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
    const projects = await Projects.find()
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
