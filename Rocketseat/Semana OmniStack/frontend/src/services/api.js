import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:30001"
});

export default api;
