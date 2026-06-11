import axios from "axios";

export const BASE_URL = import.meta.env.DEV
  ? `http://localhost:${import.meta.env.VITE_PORT || 3000}`
  : import.meta.env.VITE_API_BASE_URL; 

  
const api = axios.create({
  baseURL:`${BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;