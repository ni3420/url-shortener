import axios from "axios";

type GetToken = (options?: { template?: string; skipCache?: boolean }) => Promise<string | null>;

export const BASE_URL = import.meta.env.DEV
  ? `http://localhost:${import.meta.env.VITE_PORT || 3000}`
  : import.meta.env.VITE_API_BASE_URL; 

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, 
});

export const setupAuthInterceptor = (getToken: GetToken) => {
  api.interceptors.request.use(
    async (config) => {
      try {
        const token = await getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error(error);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default api;