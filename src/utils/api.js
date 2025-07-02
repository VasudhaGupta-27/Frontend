import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-wufu.onrender.com/api", // change if deployed
});

export default API;
