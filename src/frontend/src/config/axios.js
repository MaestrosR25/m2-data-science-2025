import axios from 'axios';


const apiUrl = "http://backend-server:8080/api/v1/snproject";


axios.defaults.headers.common['Content-Type'] = 'application/json';


// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    const protocol = ['http', 'https'];

    if (!config.url || !protocol.some((item) => config.url.startsWith(item))) {
      config.baseURL = apiUrl;
    }

    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  },
);

export default axios;