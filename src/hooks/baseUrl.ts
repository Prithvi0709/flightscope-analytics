import axios from "axios";

// Create an Axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: "https://c53a-34-172-13-189.ngrok-free.app",
});

export default axiosInstance;
