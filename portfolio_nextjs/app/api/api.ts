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

// admin create functions
export const createPersonalInfo = async (data: any) => {
  return await axios.post(`${api}/user/personal-info`, getAdminConfig(), data);
};

export const createSocialLinks = async (data: any) => {
  return await axios.post(`${api}/user/social-links`, getAdminConfig(), data);
};

export const createEducations = async (data: any) => {
  return await axios.post(`${api}/user/educations`, getAdminConfig(), data);
};

export const createExperiences = async (data: any) => {
  return await axios.post(`${api}/user/experiences`, getAdminConfig(), data);
};

export const createSkills = async (data: any) => {
  return await axios.post(`${api}/user/skills`, getAdminConfig(), data);
};

export const createHobbies = async (data: any) => {
  return await axios.post(`${api}/user/hobbies`, getAdminConfig(), data);
};

export const createLanguages = async (data: any) => {
  return await axios.post(`${api}/user/languages`, getAdminConfig(), data);
};

// admin put functions

export const updatePersonalInfo = async (id: string, data: any) => {
  return await axios.put(
    `${api}/user/personal-info/${id}`,
    getAdminConfig(),
    data
  );
};

export const updateSocialLinks = async (id: string, data: any) => {
  return await axios.put(
    `${api}/user/social-links/${id}`,
    getAdminConfig(),
    data
  );
};

export const updateEducations = async (id: string, data: any) => {
  return await axios.put(
    `${api}/user/educations/${id}`,
    getAdminConfig(),
    data
  );
};

export const updateExperiences = async (id: string, data: any) => {
  return await axios.put(
    `${api}/user/experiences/${id}`,
    getAdminConfig(),
    data
  );
};

export const updateSkills = async (id: string, data: any) => {
  return await axios.put(`${api}/user/skills/${id}`, getAdminConfig(), data);
};

export const updateHobbies = async (id: string, data: any) => {
  return await axios.put(`${api}/user/hobbies/${id}`, getAdminConfig(), data);
};

export const updateLanguages = async (id: string, data: any) => {
  return await axios.put(`${api}/user/languages/${id}`, getAdminConfig(), data);
};

// admin delete functions
export const deletePersonalInfo = async (id: string) => {
  return await axios.delete(
    `${api}/user/personal-info/${id}`,
    getAdminConfig()
  );
};

export const deleteSocialLinks = async (id: string) => {
  return await axios.delete(`${api}/user/social-links/${id}`, getAdminConfig());
};

export const deleteEducations = async (id: string) => {
  return await axios.delete(`${api}/user/educations/${id}`, getAdminConfig());
};

export const deleteExperiences = async (id: string) => {
  return await axios.delete(`${api}/user/experiences/${id}`, getAdminConfig());
};

export const deleteSkills = async (id: string) => {
  return await axios.delete(`${api}/user/skills/${id}`, getAdminConfig());
};

export const deleteHobbies = async (id: string) => {
  return await axios.delete(`${api}/user/hobbies/${id}`, getAdminConfig());
};

export const deleteLanguages = async (id: string) => {
  return await axios.delete(`${api}/user/languages/${id}`, getAdminConfig());
};
