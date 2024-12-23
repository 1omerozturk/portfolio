const express = require('express')
const {
  getPersonalInfo,
  getSocialLinks,
  getEducations,
  getExperiences,
  getSkills,
  getProjects,
  getCertifications,
  getHobbies,
  getReferences,
} = require('../controller/userController')

const router = express.Router()

router.get('/personal-info', getPersonalInfo)
router.get('/social-links', getSocialLinks)
router.get('/educations', getEducations)
router.get('/experiences', getExperiences)
router.get('/skills', getSkills)
router.get('/projects', getProjects)
router.get('/certifications', getCertifications)
router.get('/hobbies', getHobbies)
router.get('/references', getReferences)

module.exports = router;