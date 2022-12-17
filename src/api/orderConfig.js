import axios from "axios";

const orderConfig = axios.create({
  baseURL: process.env.REACT_APP_API_URL + "/sv3",
  headers: { "Bypass-Tunnel-Reminder": "true" },
});

// Add a request interceptor
orderConfig.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const accessToken = localStorage.getItem("jwtToken");
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
orderConfig.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    

    throw error;
  }
);

export default orderConfig;
