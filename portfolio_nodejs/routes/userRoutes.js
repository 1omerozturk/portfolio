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
  getOnePersonalInfo,
  getOneSocialLinks,
  getOneEducations,
  getOneExperiences,
  getOneSkills,
  getOneProjects,
  getOneCertifications,
  getOneHobbies,
  getOneReferences,
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
router.get('/personal-info/:id',getOnePersonalInfo)
router.get('/social-links', getOneSocialLinks)
router.get('/educations/:id', getOneEducations)
router.get('/experiences/:id', getOneExperiences)
router.get('/skills/:id', getOneSkills)
router.get('/projects/:id', getOneProjects)
router.get('/certifications/:id', getOneCertifications)
router.get('/hobbies/:id', getOneHobbies)
router.get('/references/:id', getOneReferences)

module.exports = router;