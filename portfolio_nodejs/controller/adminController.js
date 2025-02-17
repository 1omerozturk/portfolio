const bcrypt = require('bcrypt')

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
const User = require('../models/user')

// Admin login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(400).json({ message: 'Invalid email' })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' })
    }
    const token = await user.generateAuthToken()
    res.status(200).json({ token })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Admin get
exports.getAdmin = async (req, res) => {
  try {
    const admin = await User.findOne({ role: 'admin' }) // Admini role veya başka bir kritere göre bulabilirsiniz
    if (!admin) {
      return res.status(404).json({ message: 'Admin bulunamadı' })
    }
    res.status(200).json(admin)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// admin update
// exports.updatePassword = async (req, res) => {
//   try {
//     const { username, password, newpassword } = req.body
//     const user = await User.findOne({ username })
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid email or password' })
//     }
//     console.log(user.password)
//     user.password = newpassword
//     await user.save()
//     console.log(user.password)
//     res.status(200).json({ message: 'Password updated successfully' })
//   } catch (err) {
//     res.status(500).json({ message: err.message })
//   }
// }

// Admin Controller for post update and delete
// Post
exports.createPersonalInfo = async (req, res) => {
  try {
    const personalInfo = new PersonalInfos(req.body)
    await personalInfo.save()
    res.status(201).json(personalInfo)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.createSocialLinks = async (req, res) => {
  try {
    const socialLinks = new SocialLinks(req.body)
    await socialLinks.save()
    console.log(socialLinks)
    res.status(201).json(socialLinks)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.createEducations = async (req, res) => {
  try {
    const educations = new Educations(req.body)
    await educations.save()
    res.status(201).json(educations)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.createExperiences = async (req, res) => {
  try {
    const experiences = new Experiences(req.body)
    await experiences.save()
    res.status(201).json(experiences)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.createSkills = async (req, res) => {
  try {
    const skills = new Skills(req.body)
    await skills.save()
    res.status(201).json(skills)
  } catch (error) {
    console.error(error) // Hata detaylarını loglayın
    res.status(500).json({ message: error.message })
  }
}

exports.createProjects = async (req, res) => {
  try {
    const projects = new Projects(req.body)
    await projects.save()
    res.status(201).json(projects)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.createCertifications = async (req, res) => {
  try {
    const certifications = new Certifications(req.body)
    await certifications.save()
    res.status(201).json(certifications)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.createLanguages = async (req, res) => {
  try {
    const languages = new Languages(req.body)
    await languages.save()
    res.status(201).json(languages)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.createReferences = async (req, res) => {
  try {
    const references = new References(req.body)
    await references.save()
    res.status(201).json(references)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.createHobbies = async (req, res) => {
  try {
    const hobbies = new Hobbies(req.body)
    await hobbies.save()
    res.status(201).json(hobbies)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Update
exports.updatePersonalInfo = async (req, res) => {
  try {
    const personalInfo = await PersonalInfos.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    )
    res.status(200).json(personalInfo)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateSocialLinks = async (req, res) => {
  try {
    const socialLinks = await SocialLinks.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    )
    res.status(200).json(socialLinks)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateEducations = async (req, res) => {
  try {
    const educations = await Educations.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    )
    res.status(200).json(educations)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateExperiences = async (req, res) => {
  try {
    const experiences = await Experiences.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    )
    res.status(200).json(experiences)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateSkills = async (req, res) => {
  try {
    const id = req.params.id
    const data = req.body
    const skills = await Skills.findByIdAndUpdate(id, data, {
      new: true,
    })
    res.status(200).json(skills)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}

exports.updateProjects = async (req, res) => {
  try {
    const projects = await Projects.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.status(200).json(projects)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateCertifications = async (req, res) => {
  try {
    const certifications = await Certifications.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    )
    res.status(200).json(certifications)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateLanguages = async (req, res) => {
  try {
    const languages = await Languages.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    )
    res.status(200).json(languages)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateReferences = async (req, res) => {
  try {
    const references = await References.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    )
    res.status(200).json(references)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateHobbies = async (req, res) => {
  try {
    const hobbies = await Hobbies.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.status(200).json(hobbies)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Delete
exports.deletePersonalInfo = async (req, res) => {
  try {
    await PersonalInfos.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Personal Info deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.deleteSocialLinks = async (req, res) => {
  try {
    await SocialLinks.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Social Links deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.deleteEducations = async (req, res) => {
  try {
    await Educations.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Educations deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.deleteExperiences = async (req, res) => {
  try {
    await Experiences.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Experiences deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.deleteSkills = async (req, res) => {
  try {
    await Skills.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Skills deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.deleteProjects = async (req, res) => {
  try {
    await Projects.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Projects deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.deleteCertifications = async (req, res) => {
  try {
    await Certifications.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Certifications deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.deleteLanguages = async (req, res) => {
  try {
    await Languages.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Languages deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.deleteReferences = async (req, res) => {
  try {
    await References.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'References deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.deleteHobbies = async (req, res) => {
  try {
    await Hobbies.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Hobbies deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
