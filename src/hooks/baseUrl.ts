import axios from "axios";

// Create an Axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: "https://ee5d-35-192-76-158.ngrok-free.app",
});

export default axiosInstance;
