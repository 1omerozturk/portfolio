import axios from "axios";
// const api: string = "http://localhost:5050/api";
const api: string = "https://portfolio-m5zz.onrender.com/api";

// User Log check function
export const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  return token;
};

export const getAdminConfig = () => {
  if (getToken()) {
    return {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    };
  } else {
    return null;
  }
};

export const login = async (username: string, password: string) => {
  return await axios.post(`${api}/admin/login`, { username, password });
};

export const updatePassword = async (
  username: string,
  password: string,
  newpassord: string
) => {
  return await axios.put(`${api}/admin/update-password`, {
    username,
    password,
    newpassord,
  });
};

export const getAdminAuth = async () => {
  try {
    return await axios.get(`${api}/admin/admin`, getAdminConfig());
  } catch (error) {
    console.error("Error fetching admin data:", error);
    throw error;
  }
};

export const getPersonalInfo = async () => {
  return await axios.get(`${api}/user/personal-info`);
};

export const getSocialLinks = async () => {
  return await axios.get(`${api}/user/social-links`);
};

export const getEducations = async () => {
  return await axios.get(`${api}/user/educations`);
};

export const getExperiences = async () => {
  return await axios.get(`${api}/user/experiences`);
};

export const getContents = async () => {
  return await axios.get(`${api}/user/contents`);
};

export const getSkills = async () => {
  return await axios.get(`${api}/user/skills`);
};

export const getProjects = async () => {
  return await axios.get(`${api}/user/projects`);
};

export const getCertifications = async () => {
  return await axios.get(`${api}/user/certifications`);
};

export const getHobbies = async () => {
  return await axios.get(`${api}/user/hobbies`);
};

export const getReferences = async () => {
  return await axios.get(`${api}/user/references`);
};

// One Data return

export const getOnePersonalInfo = async (id: any) => {
  return await axios.get(`${api}/user/personal-info/${id}`);
};

export const getOneSocialLinks = async (id: any) => {
  return await axios.get(`${api}/user/social-links/${id}`);
};

export const getOneEducations = async (id: any) => {
  return await axios.get(`${api}/user/educations/${id}`);
};

export const getOneExperiences = async (id: any) => {
  return await axios.get(`${api}/user/experiences/${id}`);
};

export const getOneContent = async (id: any) => {
  return await axios.get(`${api}/user/contents/${id}`);
};

export const getOneSkills = async (id: any) => {
  return await axios.get(`${api}/user/skills/${id}`);
};

export const getOneProjects = async (id: any) => {
  return await axios.get(`${api}/user/projects/${id}`);
};

export const getOneCertifications = async (id: any) => {
  return await axios.get(`${api}/user/certifications/${id}`);
};

export const getOneHobbies = async (id: any) => {
  return await axios.get(`${api}/user/hobbies/${id}`);
};

export const getOneReferences = async (id: any) => {
  return await axios.get(`${api}/user/references/${id}`);
};

// admin create functions
export const createPersonalInfo = async (data: any) => {
  return await axios.post(`${api}/admin/personal-info`, data, getAdminConfig());
};

export const createSocialLinks = async (data: any) => {
  return await axios.post(`${api}/admin/social-links`, data, getAdminConfig());
};

export const createEducations = async (data: any) => {
  return await axios.post(`${api}/admin/educations`, data, getAdminConfig());
};

export const createExperiences = async (data: any) => {
  return await axios.post(`${api}/admin/experiences`, data, getAdminConfig());
};

export const createContents = async (data: any) => {
  return await axios.post(`${api}/admin/contents`, data, getAdminConfig());
};

export const createSkills = async (data: any) => {
  try {
    return await axios.post(`${api}/admin/skills`, data, getAdminConfig());
  } catch (error) {
    return error;
  }
};

export const createProject = async (data: any) => {
  try {
    return await axios.post(`${api}/admin/projects`, data, getAdminConfig());
  } catch (error) {
    return error;
  }
};

export const createHobbies = async (data: any) => {
  return await axios.post(`${api}/admin/hobbies`, data, getAdminConfig());
};

export const createLanguages = async (data: any) => {
  return await axios.post(`${api}/admin/languages`, data, getAdminConfig());
};
export const createCertifications = async (data: any) => {
  return await axios.post(
    `${api}/admin/certifications`,
    data,
    getAdminConfig()
  );
};

// admin put functions

export const updatePersonalInfo = async (id: any, data: any) => {
  return await axios.put(
    `${api}/admin/personal-info/${id}`,
    data,
    getAdminConfig()
  );
};

export const updateSocialLinks = async (id: any, data: any) => {
  return await axios.put(
    `${api}/admin/social-links/${id}`,
    data,
    getAdminConfig()
  );
};

export const updateEducations = async (id: any, data: any) => {
  return await axios.put(
    `${api}/admin/educations/${id}`,
    data,
    getAdminConfig()
  );
};

export const updateExperiences = async (id: any, data: any) => {
  return await axios.put(
    `${api}/admin/experiences/${id}`,
    data,
    getAdminConfig()
  );
};

export const updateContents = async (id: any, data: any) => {
  return await axios.put(`${api}/admin/contents/${id}`, data, getAdminConfig());
};

export const updateProject = async (id: any, data: any) => {
  return await axios.put(`${api}/admin/projects/${id}`, data, getAdminConfig());
};

export const updateSkills = async (id: any, data: any) => {
  return await axios.put(`${api}/admin/skills/${id}`, data, getAdminConfig());
};

export const updateHobbies = async (id: any, data: any) => {
  return await axios.put(`${api}/admin/hobbies/${id}`, data, getAdminConfig());
};

export const updateLanguages = async (id: any, data: any) => {
  return await axios.put(
    `${api}/admin/languages/${id}`,
    data,
    getAdminConfig()
  );
};
export const updateCertifications = async (id: any, data: any) => {
  return await axios.put(
    `${api}/admin/certifications/${id}`,
    data,
    getAdminConfig()
  );
};

// admin delete functions
export const deletePersonalInfo = async (id: any) => {
  return await axios.delete(
    `${api}/admin/personal-info/${id}`,
    getAdminConfig()
  );
};

export const deleteSocialLinks = async (id: any) => {
  return await axios.delete(
    `${api}/admin/social-links/${id}`,
    getAdminConfig()
  );
};

export const deleteEducations = async (id: any) => {
  return await axios.delete(`${api}/admin/educations/${id}`, getAdminConfig());
};

export const deleteExperiences = async (id: any) => {
  return await axios.delete(`${api}/admin/experiences/${id}`, getAdminConfig());
};

export const deleteContents = async (id: any) => {
  return await axios.delete(`${api}/admin/contents/${id}`, getAdminConfig());
};

export const deleteProjects = async (id: any) => {
  return await axios.delete(`${api}/admin/projects/${id}`, getAdminConfig());
};

export const deleteSkills = async (id: any) => {
  return await axios.delete(`${api}/admin/skills/${id}`, getAdminConfig());
};

export const deleteHobbies = async (id: any) => {
  return await axios.delete(`${api}/admin/hobbies/${id}`, getAdminConfig());
};

export const deleteLanguages = async (id: any) => {
  return await axios.delete(`${api}/admin/languages/${id}`, getAdminConfig());
};

export const deleteCertifications = async (id: any) => {
  return await axios.delete(
    `${api}/admin/certifications/${id}`,
    getAdminConfig()
  );
};

// Message CRUDs
export const postMessagesApi = async (data: any) => {
  return await axios.post(`${api}/user/messages`, data);
};

export const getMessagesApi = async () => {
  return await axios.get(`${api}/admin/messages`, getAdminConfig());
};

export const deleteMessageApi = async (id: any) => {
  return await axios.delete(`${api}/admin/messages/${id}`, getAdminConfig());
};

export const markMessageApi = async (id: any, isRead: any) => {
  return await axios.put(
    `${api}/admin/messages/${id}`,
    {},
    { ...getAdminConfig(), params: { isRead } }
  );
};
