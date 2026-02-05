import axios from "axios";

const API = axios.create({
  baseURL: "https://online-exam-protal.onrender.com/api",
});
// const API = axios.create({
//   baseURL: "lohhhh/api",
// });

// attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;
