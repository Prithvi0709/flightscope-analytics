import axios from "axios";

// Create an Axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: "https://bbe3-34-91-1-38.ngrok-free.app",
});

export default axiosInstance;
