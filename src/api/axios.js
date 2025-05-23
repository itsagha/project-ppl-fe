import axios from "axios";

// Buat instance axios pake base URL dari .env
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// GET Request
export const getData = async (url, page) => {
  try {
    if (page) {
      const response = await api.get(url, {
        params: { page }
      });     
      return response.data; 
    }
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("GET Error:", error);
    throw error;
  }
};

// POST Request
export const postData = async (url, data) => {
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    console.error("POST Error:", error);
    throw error;
  }
};

// PATCH Request
export const updateData = async (url, data) => {
  try {
    const response = await api.patch(url, data);
    return response.data;
  } catch (error) {
    console.error("PATCH Error:", error);
    throw error;
  }
};

// DELETE Request
export const deleteData = async (url) => {
  try {
    const response = await api.delete(url);
    return response.data;
  } catch (error) {
    console.error("DELETE Error:", error);
    throw error;
  }
};

// DELETE request with body
export const deleteDataWithBody = async (url, data) => {
  const token = localStorage.getItem("token");
  const response = await axios.delete(url, {
    headers: { Authorization: `Bearer ${token}` },
    data,
  });
  return response.data;
};

export default api;