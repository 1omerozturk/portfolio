import axios from "axios";
import { API_BASE_URL, PUBLIC_API_TIMEOUT_MS } from "./config";

const api = API_BASE_URL;
const http = axios.create({ timeout: PUBLIC_API_TIMEOUT_MS, headers: { Accept: "application/json" } });

export async function uploadCertificationPdf(file: File) {
  return http.post<{ url: string; size: number }>(`${api}/admin/certification-pdf`, file, {
    ...getAdminConfig(), timeout: 45000,
    headers: { ...getAdminConfig()?.headers, "Content-Type": "application/pdf" },
  });
}

// User Log check function
export const getToken = () => {
  try {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem("token");
  } catch {
    return null;
  }
};

export const getAdminConfig = () => {
  const token = getToken();
  if (token) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  } else {
    return null;
  }
};

export const login = async (username: string, password: string) => {
  return await http.post(`${api}/admin/login`, { username, password }, { timeout: PUBLIC_API_TIMEOUT_MS });
};

export const updatePassword = async (
  username: string,
  password: string,
  rePassword: string,
) => {
  try {
    return await http.put(`${api}/admin/update-password`, {
      username,
      password,
      rePassword,
    }, { timeout: PUBLIC_API_TIMEOUT_MS });
  } catch (error) {
    throw error;
  }
};

export const getAdminAuth = async () => {
  return http.get(`${api}/admin/admin`, { ...getAdminConfig(), timeout: PUBLIC_API_TIMEOUT_MS });
};

export const getPersonalInfo = async () => {
  return await http.get(`${api}/user/personal-info`);
};

export const getSocialLinks = async () => {
  return await http.get(`${api}/user/social-links`);
};

export const getEducations = async () => {
  return await http.get(`${api}/user/educations`);
};

export const getExperiences = async () => {
  return await http.get(`${api}/user/experiences`);
};

export const getContents = async () => {
  return await http.get(`${api}/user/contents`);
};

export const getSkills = async () => {
  return await http.get(`${api}/user/skills`);
};

export const getProjects = async () => {
  return await http.get(`${api}/user/projects`);
};

export const getCertifications = async () => {
  return await http.get(`${api}/user/certifications`);
};

export const getHobbies = async () => {
  return await http.get(`${api}/user/hobbies`);
};

export const getReferences = async () => {
  return await http.get(`${api}/user/references`);
};

// One Data return

export const getOnePersonalInfo = async (id: string) => {
  return await http.get(`${api}/user/personal-info/${encodeURIComponent(id)}`);
};

export const getOneSocialLinks = async (id: string) => {
  return await http.get(`${api}/user/social-links/${encodeURIComponent(id)}`);
};

export const getOneEducations = async (id: string) => {
  return await http.get(`${api}/user/educations/${encodeURIComponent(id)}`);
};

export const getOneExperiences = async (id: string) => {
  return await http.get(`${api}/user/experiences/${encodeURIComponent(id)}`);
};

export const getOneContent = async (id: string) => {
  return await http.get(`${api}/user/contents/${encodeURIComponent(id)}`);
};

export const getOneSkills = async (id: string) => {
  return await http.get(`${api}/user/skills/${encodeURIComponent(id)}`);
};

export const getOneProjects = async (id: string) => {
  return await http.get(`${api}/user/projects/${encodeURIComponent(id)}`);
};

export const getOneCertifications = async (id: string) => {
  return await http.get(`${api}/user/certifications/${encodeURIComponent(id)}`);
};

export const getOneHobbies = async (id: string) => {
  return await http.get(`${api}/user/hobbies/${encodeURIComponent(id)}`);
};

export const getOneReferences = async (id: string) => {
  return await http.get(`${api}/user/references/${encodeURIComponent(id)}`);
};

// admin create functions
export const createPersonalInfo = async (data: unknown) => {
  return await http.post(`${api}/admin/personal-info`, data, getAdminConfig());
};

export const createSocialLinks = async (data: unknown) => {
  return await http.post(`${api}/admin/social-links`, data, getAdminConfig());
};

export const createEducations = async (data: unknown) => {
  return await http.post(`${api}/admin/educations`, data, getAdminConfig());
};

export const createExperiences = async (data: unknown) => {
  return await http.post(`${api}/admin/experiences`, data, getAdminConfig());
};

export const createContents = async (data: unknown) => {
  return await http.post(`${api}/admin/contents`, data, getAdminConfig());
};

export const createSkills = async (data: unknown) => {
  try {
    return await http.post(`${api}/admin/skills`, data, getAdminConfig());
  } catch (error) {
    return error;
  }
};

export const createProject = async (data: unknown) => {
  try {
    return await http.post(`${api}/admin/projects`, data, getAdminConfig());
  } catch (error) {
    return error;
  }
};

export const createHobbies = async (data: unknown) => {
  return await http.post(`${api}/admin/hobbies`, data, getAdminConfig());
};

export const createLanguages = async (data: unknown) => {
  return await http.post(`${api}/admin/languages`, data, getAdminConfig());
};
export const createCertifications = async (data: unknown) => {
  return await http.post(
    `${api}/admin/certifications`,
    data,
    getAdminConfig(),
  );
};

// admin put functions

export const updatePersonalInfo = async (id: string, data: unknown) => {
  return await http.put(
    `${api}/admin/personal-info/${encodeURIComponent(id)}`,
    data,
    getAdminConfig(),
  );
};

export const updateSocialLinks = async (id: string, data: unknown) => {
  return await http.put(
    `${api}/admin/social-links/${encodeURIComponent(id)}`,
    data,
    getAdminConfig(),
  );
};

export const updateEducations = async (id: string, data: unknown) => {
  return await http.put(
    `${api}/admin/educations/${encodeURIComponent(id)}`,
    data,
    getAdminConfig(),
  );
};

export const updateExperiences = async (id: string, data: unknown) => {
  return await http.put(
    `${api}/admin/experiences/${encodeURIComponent(id)}`,
    data,
    getAdminConfig(),
  );
};

export const updateContents = async (id: string, data: unknown) => {
  return await http.put(`${api}/admin/contents/${encodeURIComponent(id)}`, data, getAdminConfig());
};

export const updateProject = async (id: string, data: unknown) => {
  return await http.put(`${api}/admin/projects/${encodeURIComponent(id)}`, data, getAdminConfig());
};

export const updateSkills = async (id: string, data: unknown) => {
  return await http.put(`${api}/admin/skills/${encodeURIComponent(id)}`, data, getAdminConfig());
};

export const updateHobbies = async (id: string, data: unknown) => {
  return await http.put(`${api}/admin/hobbies/${encodeURIComponent(id)}`, data, getAdminConfig());
};

export const updateLanguages = async (id: string, data: unknown) => {
  return await http.put(
    `${api}/admin/languages/${encodeURIComponent(id)}`,
    data,
    getAdminConfig(),
  );
};
export const updateCertifications = async (id: string, data: unknown) => {
  return await http.put(
    `${api}/admin/certifications/${encodeURIComponent(id)}`,
    data,
    getAdminConfig(),
  );
};

// admin delete functions
export const deletePersonalInfo = async (id: string) => {
  return await http.delete(
    `${api}/admin/personal-info/${encodeURIComponent(id)}`,
    getAdminConfig(),
  );
};

export const deleteSocialLinks = async (id: string) => {
  return await http.delete(
    `${api}/admin/social-links/${encodeURIComponent(id)}`,
    getAdminConfig(),
  );
};

export const deleteEducations = async (id: string) => {
  return await http.delete(`${api}/admin/educations/${encodeURIComponent(id)}`, getAdminConfig());
};

export const deleteExperiences = async (id: string) => {
  return await http.delete(`${api}/admin/experiences/${encodeURIComponent(id)}`, getAdminConfig());
};

export const deleteContents = async (id: string) => {
  return await http.delete(`${api}/admin/contents/${encodeURIComponent(id)}`, getAdminConfig());
};

export const deleteProjects = async (id: string) => {
  return await http.delete(`${api}/admin/projects/${encodeURIComponent(id)}`, getAdminConfig());
};

export const deleteSkills = async (id: string) => {
  return await http.delete(`${api}/admin/skills/${encodeURIComponent(id)}`, getAdminConfig());
};

export const deleteHobbies = async (id: string) => {
  return await http.delete(`${api}/admin/hobbies/${encodeURIComponent(id)}`, getAdminConfig());
};

export const deleteLanguages = async (id: string) => {
  return await http.delete(`${api}/admin/languages/${encodeURIComponent(id)}`, getAdminConfig());
};

export const deleteCertifications = async (id: string) => {
  return await http.delete(
    `${api}/admin/certifications/${encodeURIComponent(id)}`,
    getAdminConfig(),
  );
};

// Message CRUDs
export const postMessagesApi = async (data: unknown) => {
  return await http.post(`${api}/user/messages`, data);
};

export const getMessagesApi = async () => {
  return await http.get(`${api}/admin/messages`, getAdminConfig());
};

export const deleteMessageApi = async (id: string) => {
  return await http.delete(`${api}/admin/messages/${encodeURIComponent(id)}`, getAdminConfig());
};

export const markMessageApi = async (id: string, isRead: boolean) => {
  return await http.put(
    `${api}/admin/messages/${encodeURIComponent(id)}`,
    {},
    { ...getAdminConfig(), params: { isRead } },
  );
};
// Blog APIs - User endpoints
export const getBlogs = async (query?: string) => {
  const url = query ? `${api}/user/blogs?${query}` : `${api}/user/blogs`;
  return await http.get(url);
};

export const getBlogById = async (id: string) => {
  return await http.get(`${api}/user/blogs/${encodeURIComponent(id)}`);
};

export const getBlogsByCategory = async (category: string, query?: string) => {
  const url = query
    ? `${api}/user/blogs/category/${category}?${query}`
    : `${api}/user/blogs/category/${category}`;
  return await http.get(url);
};

export const searchBlogs = async (query: string) => {
  return await http.get(`${api}/user/search/blogs?query=${query}`);
};

// Blog APIs - Admin endpoints
export const createBlog = async (data: unknown) => {
  return await http.post(`${api}/admin/blogs`, data, getAdminConfig());
};

export const getAdminBlogs = async (query?: string) => {
  const url = query ? `${api}/admin/blogs?${query}` : `${api}/admin/blogs`;
  return await http.get(url, getAdminConfig());
};

export const getAdminBlogById = async (id: string) => {
  return await http.get(`${api}/admin/blogs/${encodeURIComponent(id)}`, getAdminConfig());
};

export const updateBlog = async (id: string, data: unknown) => {
  return await http.put(`${api}/admin/blogs/${encodeURIComponent(id)}`, data, getAdminConfig());
};

export const deleteBlog = async (id: string) => {
  return await http.delete(`${api}/admin/blogs/${encodeURIComponent(id)}`, getAdminConfig());
};



export const getLanguages = async () => http.get(api + "/user/languages");
