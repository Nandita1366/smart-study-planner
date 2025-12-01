// frontend/src/api/api.js
import axios from "axios";

const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const AI_BASE = import.meta.env.VITE_AI_URL || "http://localhost:6000";

const API = axios.create({
  baseURL: BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Not required yet, but useful if you ever call AI directly from frontend
const AI = axios.create({
  baseURL: AI_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

export { API, AI };
export default API;
