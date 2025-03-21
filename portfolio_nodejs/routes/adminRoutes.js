const express = require('express')
const admin = require('../middleware/admin')
const {
  updatePersonalInfo,
  updateEducations,
  updateExperiences,
  updateContents,
  updateSkills,
  updateHobbies,
  updateLanguages,
  deletePersonalInfo,
  deleteSocialLinks,
  deleteEducations,
  deleteExperiences,
  deleteContents,
  deleteSkills,
  deleteHobbies,
  deleteLanguages,
  createPersonalInfo,
  createSocialLinks,
  createEducations,
  createExperiences,
  createContents,
  createSkills,
  createHobbies,
  createLanguages,
  login,
  getAdmin,
  createProjects,
  updateProjects,
  deleteProjects,
  updateSocialLinks,
  updateCertifications,
  createCertifications,
  deleteCertifications,

  // messages routing
  getMessages,
  deleteMessage,
  markMessage,

  // admin management routing
  // updatePassword
} = require('../controller/adminController')

const router = express.Router()

// admin login
router.get('/admin', admin, getAdmin)

router.get('/messages', admin, getMessages)

// put routes
// router.put('/update-password',updatePassword)
router.put('/personal-info/:id', admin, updatePersonalInfo)
router.put('/educations/:id', admin, updateEducations)
router.put('/experiences/:id', admin, updateExperiences)
router.put('/contents/:id', admin, updateContents)
router.put('/skills/:id', admin, updateSkills)
router.put('/projects/:id', admin, updateProjects)
router.put('/hobbies/:id', admin, updateHobbies)
router.put('/languages/:id', admin, updateLanguages)
router.put('/certifications/:id', admin, updateCertifications)
router.put('/social-links/:id', admin, updateSocialLinks)

router.put('/messages/:id', admin, markMessage)

// delete routes
router.delete('/personal-info/:id', admin, deletePersonalInfo)
router.delete('/social-links/:id', admin, deleteSocialLinks)
router.delete('/educations/:id', admin, deleteEducations)
router.delete('/experiences/:id', admin, deleteExperiences)
router.delete('/contents/:id', admin, deleteContents)
router.delete('/skills/:id', admin, deleteSkills)
router.delete('/projects/:id', admin, deleteProjects)
router.delete('/hobbies/:id', admin, deleteHobbies)
router.delete('/certifications/:id', admin, deleteCertifications)
router.delete('/languages/:id', admin, deleteLanguages)
router.delete('/messages/:id', admin, deleteMessage)

// post routes

router.post('/login', login)
router.post('/personal-info', admin, createPersonalInfo)
router.post('/social-links', admin, createSocialLinks)
router.post('/educations', admin, createEducations)
router.post('/experiences', admin, createExperiences)
router.post('/contents', admin, createContents)
router.post('/skills', admin, createSkills)
router.post('/hobbies', admin, createHobbies)
router.post('/languages', admin, createLanguages)
router.post('/projects', admin, createProjects)
router.post('/certifications', admin, createCertifications)

module.exports = router
