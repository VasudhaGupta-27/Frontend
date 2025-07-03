import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-jnwc.onrender.com/api", // change if deployed
});

export default API;
