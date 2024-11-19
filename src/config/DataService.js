import axios from "axios";
var baseUrl = process.env.REACT_APP_BASE_URL;

// live url

// var baseUrl = "http://192.168.1.12:3031/api/";
// var baseUrl = "http://localhost:3082/api/";

// var baseUrl =
//   "https://fictional-space-orbit-r4g76j6x5pr53x7wv-3082.app.github.dev/api/";
// export const REACT_APP_IMG='https://orange-waffle-x5wrpjp4g9pwcp4jj-3032.app.github.dev/api/images/'
// var baseUrl = "https://orange-waffle-x5wrpjp4g9pwcp4jj-3032.app.github.dev/api/"
// var baseUrl = 'https://cautious-garbanzo-44p5r46rv64hq6rj-3032.app.github.dev/api/';
// var baseUrl ='http://194.233.77.156:3032/api/';
// var  baseUrl = "http://35.177.56.74:3032/api/";
// var baseUrl =
//   "https://miniature-guacamole-qr5jgv96j5gc5x4-3032.app.github.dev/api/";
const DataService = axios.create({
  baseURL: baseUrl,
});

DataService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.auth = token;
    }
    return config;
  },
  (error) => {
    // console.log(error, 32);
    return Promise.reject(error);
  }
);

export default DataService;
