const express = require('express')
const {
  getPersonalInfo,
  getSocialLinks,
  getEducations,
  getExperiences,
  getContents,
  getSkills,
  getProjects,
  getCertifications,
  getHobbies,
  getReferences,
  getOnePersonalInfo,
  getOneSocialLinks,
  getOneEducations,
  getOneExperiences,
  getOneContents,
  getOneSkills,
  getOneProjects,
  getOneCertifications,
  getOneHobbies,
  getOneReferences,
  postMessage,
} = require('../controller/userController')

const router = express.Router()

router.get('/personal-info', getPersonalInfo)
router.get('/social-links', getSocialLinks)
router.get('/educations', getEducations)
router.get('/experiences', getExperiences)
router.get('/contents', getContents)
router.get('/skills', getSkills)
router.get('/projects', getProjects)
router.get('/certifications', getCertifications)
router.get('/hobbies', getHobbies)
router.get('/references', getReferences)
router.get('/personal-info/:id', getOnePersonalInfo)
router.get('/social-links/:id', getOneSocialLinks)
router.get('/educations/:id', getOneEducations)
router.get('/experiences/:id', getOneExperiences)
router.get('/contents/:id', getOneContents)
router.get('/skills/:id', getOneSkills)
router.get('/projects/:id', getOneProjects)
router.get('/certifications/:id', getOneCertifications)
router.get('/hobbies/:id', getOneHobbies)
router.get('/references/:id', getOneReferences)

// message posting
router.post('/messages', postMessage)

module.exports = router
