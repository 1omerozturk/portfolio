const {
  getCollectionDocs,
  getDocById,
  createDoc,
  updateDoc,
  deleteDoc,
  sortDocs,
} = require("../service/firestoreRepository");

// message post
exports.postMessage = async (req, res) => {
  try {
    const fields = { name: 100, lastName: 100, email: 254, phone: 40, message: 10000 }
    const payload = {}
    for (const [field, max] of Object.entries(fields)) {
      const value = req.body[field] ?? ''
      if (typeof value !== 'string' || value.length > max) return res.status(400).json({ message: 'Mesaj alanlarını kontrol edin.' })
      payload[field] = value.trim()
    }
    if (!payload.name || !payload.lastName || !/^\S+@\S+\.\S+$/.test(payload.email) || !/^\d{10,15}$/.test(payload.phone.replace(/\D/g, ''))) return res.status(400).json({ message: 'İletişim bilgilerini kontrol edin.' })
    await createDoc('messages', { ...payload, isRead: false, sentAt: new Date() });
    res.status(201).json("Message send successfully");
  } catch (error) {
    res.status(500).json({ message: "İşlem tamamlanamadı. Lütfen yeniden deneyin." });
  }
};

exports.getPersonalInfo = async (req, res) => {
  try {
    const personalInfo = await getCollectionDocs("personalInfo");
    res.status(200).json(personalInfo);
  } catch (error) {
    res.status(500).json({ message: "İşlem tamamlanamadı. Lütfen yeniden deneyin." });
  }
};

exports.getSocialLinks = async (req, res) => {
  try {
    const socialLinks = await getCollectionDocs("socialLinks");
    res.status(200).json(socialLinks);
  } catch (error) {
    res.status(500).json({ message: "İşlem tamamlanamadı. Lütfen yeniden deneyin." });
  }
};

exports.getEducations = async (req, res) => {
  try {
    const educations = sortDocs(
      await getCollectionDocs("educations"),
      "createdAt",
      "desc",
    );
    res.status(200).json(educations);
  } catch (error) {
    res.status(500).json({ message: "İşlem tamamlanamadı. Lütfen yeniden deneyin." });
  }
};

exports.getExperiences = async (req, res) => {
  try {
    const experiences = sortDocs(
      await getCollectionDocs("experiences"),
      "createdAt",
      "desc",
    );
    res.status(200).json(experiences);
  } catch (error) {
    res.status(500).json({ message: "İşlem tamamlanamadı. Lütfen yeniden deneyin." });
  }
};
exports.getContents = async (req, res) => {
  try {
    const contents = await getCollectionDocs("contents");
    res.status(200).json(contents);
  } catch (error) {
    res.status(500).json({ message: "İşlem tamamlanamadı. Lütfen yeniden deneyin." });
  }
};

exports.getSkills = async (req, res) => {
  try {
    const skills = await getCollectionDocs("skills");
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: "İşlem tamamlanamadı. Lütfen yeniden deneyin." });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = sortDocs(
      await getCollectionDocs("projects"),
      "createdAt",
      "desc",
    );
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "İşlem tamamlanamadı. Lütfen yeniden deneyin." });
  }
};

exports.getCertifications = async (req, res) => {
  try {
    const certifications = await getCollectionDocs("certifications");
    res.status(200).json(certifications);
  } catch (error) {
    res.status(500).json({ message: "İşlem tamamlanamadı. Lütfen yeniden deneyin." });
  }
};

exports.getLanguages = async (req, res) => {
  try {
    const languages = await getCollectionDocs("languages");
    res.status(200).json(languages);
  } catch (error) {
    res.status(500).json({ message: "İşlem tamamlanamadı. Lütfen yeniden deneyin." });
  }
};

exports.getReferences = async (req, res) => {
  try {
    const references = await getCollectionDocs("references");
    res.status(200).json(references);
  } catch (error) {
    res.status(500).json({ message: "İşlem tamamlanamadı. Lütfen yeniden deneyin." });
  }
};

exports.getHobbies = async (req, res) => {
  try {
    const hobbies = await getCollectionDocs("hobbies");
    res.status(200).json(hobbies);
  } catch (error) {
    res.status(500).json({ message: "İşlem tamamlanamadı. Lütfen yeniden deneyin." });
  }
};

// one data return functions

exports.getOnePersonalInfo = async (req, res) => {
  try {
    const id = req.params.id;
    const personalInfo = await getDocById("personalInfo", id);
    res.status(200).json(personalInfo);
  } catch (error) {
    res.status(500).json({ message: "İşlem tamamlanamadı. Lütfen yeniden deneyin." });
  }
};

exports.getOneSocialLinks = async (req, res) => {
  try {
    const id = req.params.id;
    const socialLinks = await getDocById("socialLinks", id);
    res.status(200).json(socialLinks);
  } catch (error) {
    res.status(500).json({ message: "İşlem tamamlanamadı. Lütfen yeniden deneyin." });
  }
};

exports.getOneEducations = async (req, res) => {
  try {
    const id = req.params.id;
    const educations = await getDocById("educations", id);
    res.status(200).json(educations);
  } catch (error) {
    res.status(500).json({ message: "İşlem tamamlanamadı. Lütfen yeniden deneyin." });
  }
};

exports.getOneExperiences = async (req, res) => {
  try {
    const id = req.params.id;
    const experiences = await getDocById("experiences", id);
    res.status(200).json(experiences);
  } catch (error) {
    res.status(500).json({ message: "İşlem tamamlanamadı. Lütfen yeniden deneyin." });
  }
};

exports.getOneContents = async (req, res) => {
  try {
    const id = req.params.id;
    const contents = await getDocById("contents", id);
    res.status(200).json(contents);
  } catch (error) {
    res.status(500).json({ message: "İşlem tamamlanamadı. Lütfen yeniden deneyin." });
  }
};

exports.getOneSkills = async (req, res) => {
  try {
    const id = req.params.id;
    const skills = await getDocById("skills", id);
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: "İşlem tamamlanamadı. Lütfen yeniden deneyin." });
  }
};

exports.getOneProjects = async (req, res) => {
  try {
    const id = req.params.id;
    const projects = await getDocById("projects", id);
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "İşlem tamamlanamadı. Lütfen yeniden deneyin." });
  }
};

exports.getOneCertifications = async (req, res) => {
  try {
    const id = req.params.id;
    const certifications = await getDocById("certifications", id);
    res.status(200).json(certifications);
  } catch (error) {
    res.status(500).json({ message: "İşlem tamamlanamadı. Lütfen yeniden deneyin." });
  }
};

exports.getOneLanguages = async (req, res) => {
  try {
    const id = req.params.id;
    const languages = await getDocById("languages", id);
    res.status(200).json(languages);
  } catch (error) {
    res.status(500).json({ message: "İşlem tamamlanamadı. Lütfen yeniden deneyin." });
  }
};

exports.getOneReferences = async (req, res) => {
  try {
    const id = req.params.id;
    const references = await getDocById("references", id);
    res.status(200).json(references);
  } catch (error) {
    res.status(500).json({ message: "İşlem tamamlanamadı. Lütfen yeniden deneyin." });
  }
};

exports.getOneHobbies = async (req, res) => {
  try {
    const id = req.params.id;
    const hobbies = await getDocById("hobbies", id);
    res.status(200).json(hobbies);
  } catch (error) {
    res.status(500).json({ message: "İşlem tamamlanamadı. Lütfen yeniden deneyin." });
  }
};

// Blog endpoints for users
const { parseOptions, listBlogs, isPublished, respondError } = require('../service/blogQuery')

exports.getBlogs = async (req, res) => {
  try { res.status(200).json(await listBlogs(parseOptions(req.query))) }
  catch (error) { respondError(res, error) }
}
exports.getBlogById = async (req, res) => {
  try {
    const blog = await getDocById('blogs', req.params.id)
    if (!blog || !isPublished(blog)) return res.status(404).json({ message: 'Blog bulunamadı' })
    res.status(200).json(blog)
  } catch (error) { respondError(res, error) }
}
exports.getBlogsByCategory = async (req, res) => {
  try {
    const options = parseOptions({ ...req.query, category: req.params.category })
    res.status(200).json(await listBlogs(options))
  } catch (error) { respondError(res, error) }
}
exports.searchBlogs = async (req, res) => {
  try {
    const options = parseOptions({ ...req.query, search: req.query.query })
    if (!options.search) return res.status(400).json({ message: 'Arama terimi gereklidir' })
    const result = await listBlogs(options)
    res.status(200).json(result.blogs)
  } catch (error) { respondError(res, error) }
}

