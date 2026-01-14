import axios from "axios";

const api = axios.create({
  baseURL: "http://172.27.17.136:5005/api",
});

export default api;
