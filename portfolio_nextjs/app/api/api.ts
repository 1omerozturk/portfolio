import axios from "axios";
const api: string = "http://localhost:5050/api";

// User Log check function
export const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  return token;
};

export const login = async (username: string, password: string) => {
  return await axios.post(`${api}/admin/login`, { username, password });
};

export const updatePassword = async (username:string,password: string,newpassord:string) => {
  return await axios.put(`${api}/admin/update-password`, { username, password,newpassord });
};

// User get functions

export const getPersonalInfo = async () => {
  return await axios.get(`${api}/user/personal-info`);
};

export const getAdmin = async () => {
  return await axios.get(`${api}/admin/create`);
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
  return await axios.post(`${api}/user/personal-info`, data);
};

export const createSocialLinks = async (data: any) => {
  return await axios.post(`${api}/user/social-links`, data);
};

export const createEducations = async (data: any) => {
  return await axios.post(`${api}/user/educations`, data);
};

export const createExperiences = async (data: any) => {
  return await axios.post(`${api}/user/experiences`, data);
};

export const createSkills = async (data: any) => {
  return await axios.post(`${api}/user/skills`, data);
};

export const createHobbies = async (data: any) => {
  return await axios.post(`${api}/user/hobbies`, data);
};

export const createLanguages = async (data: any) => {
  return await axios.post(`${api}/user/languages`, data);
};

// admin put functions

export const updatePersonalInfo = async (id: string, data: any) => {
  return await axios.put(`${api}/user/personal-info/${id}`, data);
};

export const updateSocialLinks = async (id: string, data: any) => {
  return await axios.put(`${api}/user/social-links/${id}`, data);
};

export const updateEducations = async (id: string, data: any) => {
  return await axios.put(`${api}/user/educations/${id}`, data);
};

export const updateExperiences = async (id: string, data: any) => {
  return await axios.put(`${api}/user/experiences/${id}`, data);
};

export const updateSkills = async (id: string, data: any) => {
  return await axios.put(`${api}/user/skills/${id}`, data);
};

export const updateHobbies = async (id: string, data: any) => {
  return await axios.put(`${api}/user/hobbies/${id}`, data);
};

export const updateLanguages = async (id: string, data: any) => {
  return await axios.put(`${api}/user/languages/${id}`, data);
};

// admin delete functions
export const deletePersonalInfo = async (id: string) => {
  return await axios.delete(`${api}/user/personal-info/${id}`);
};

export const deleteSocialLinks = async (id: string) => {
  return await axios.delete(`${api}/user/social-links/${id}`);
};

export const deleteEducations = async (id: string) => {
  return await axios.delete(`${api}/user/educations/${id}`);
};

export const deleteExperiences = async (id: string) => {
  return await axios.delete(`${api}/user/experiences/${id}`);
};

export const deleteSkills = async (id: string) => {
  return await axios.delete(`${api}/user/skills/${id}`);
};

export const deleteHobbies = async (id: string) => {
  return await axios.delete(`${api}/user/hobbies/${id}`);
};

export const deleteLanguages = async (id: string) => {
  return await axios.delete(`${api}/user/languages/${id}`);
};
