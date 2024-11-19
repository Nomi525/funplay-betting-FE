import axios from "axios";
var toToken = localStorage.getItem("token");
// const API_ENDPOINT = "http://192.168.1.7:3027/api/";
const API_ENDPOINT = process.env.REACT_APP_BASE_URL;

const dataService = axios.create({
  baseURL: API_ENDPOINT,
});

dataService.interceptors.request.use(
  (config) => {
    config.headers.auth = localStorage.getItem("token");
    return config;
  },
  (error) => {
    return error;
  }
);
export default dataService;
