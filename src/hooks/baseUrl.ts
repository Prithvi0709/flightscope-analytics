import axios from "axios";

// Create an Axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: "https://3020-35-245-48-201.ngrok-free.app",
});

export default axiosInstance;
