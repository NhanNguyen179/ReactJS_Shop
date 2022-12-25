import axios from "axios";

const productApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Bypass-Tunnel-Reminder": "true",
  },
});

// Add a request interceptor
productApi.interceptors.request.use(
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

productApi.interceptors.response.use(
  (response) => {
    if (response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    const statusCode = error?.response?.status;
    // if (statusCode === 400) {
    //   window.location.href = '/bad-request';
    //   return;
    // }
    if (statusCode === 404) {
      window.location.href = "/not-found";
      return;
    }

    // if (statusCode === 401) {
    //   window.location.href = "/login";
    //   return;
    // }

    if (statusCode === 403) {
      window.location.href = "/forbidden";
      return;
    }

    if (statusCode >= 500) {
      // show notification
      window.location.href = "/server-error";
      return;
    }

    throw error;
  }
);

export default productApi;
