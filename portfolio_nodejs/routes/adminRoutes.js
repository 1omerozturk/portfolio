const express = require('express')
const admin = require('../middleware/admin')
const {
  updatePersonalInfo,
  updateSocialLinks,
  updateEducations,
  updateExperiences,
  updateSkills,
  updateHobbies,
  updateLanguages,
  deletePersonalInfo,
  deleteSocialLinks,
  deleteEducations,
  deleteExperiences,
  deleteSkills,
  deleteHobbies,
  deleteLanguages,
  createPersonalInfo,
  createSocialLinks,
  createEducations,
  createExperiences,
  createSkills,
  createHobbies,
  createLanguages,
  login,
  getAdmin,
  createProjects,
  updateProjects,
  deleteProjects,
  // updatePassword
} = require('../controller/adminController')

const router = express.Router()

// admin login
router.get('/admin', admin, getAdmin)

// put routes
// router.put('/update-password',updatePassword)
router.put('/personal-info/:id', admin, updatePersonalInfo)
router.put('/social-links/:id', admin, updateSocialLinks)
router.put('/educations/:id', admin, updateEducations)
router.put('/experiences/:id', admin, updateExperiences)
router.put('/skills/:id', admin, updateSkills)
router.put('/projects/:id', admin, updateProjects)
router.put('/hobbies/:id', admin, updateHobbies)
router.put('/languages/:id', admin, updateLanguages)

// delete routes
router.delete('/personal-info/:id', admin, deletePersonalInfo)
router.delete('/social-links/:id', admin, deleteSocialLinks)
router.delete('/educations/:id', admin, deleteEducations)
router.delete('/experiences/:id', admin, deleteExperiences)
router.delete('/skills/:id', admin, deleteSkills)
router.delete('/projects/:id', admin, deleteProjects)
router.delete('/hobbies/:id', admin, deleteHobbies)
router.delete('/languages/:id', admin, deleteLanguages)

// post routes

router.post('/login', login)
router.post('/personal-info', admin, createPersonalInfo)
router.post('/social-links', admin, createSocialLinks)
router.post('/educations', admin, createEducations)
router.post('/experiences', admin, createExperiences)
router.post('/skills', admin, createSkills)
router.post('/hobbies', admin, createHobbies)
router.post('/languages', admin, createLanguages)
router.post('/projects', admin, createProjects)

module.exports = router
