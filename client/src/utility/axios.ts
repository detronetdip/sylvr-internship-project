/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from "axios";
import { server } from "./constant";
const axiosInstance = axios.create();
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log(error);
    const { response, config } = error;
    if (
      response.data.error.statusCode === 401 &&
      response.data.error.code === 3000
    ) {
      await axiosInstance.get(`${server}/refresh`);
      return axiosInstance(config);
    } else if (response.statusCode === 404 && response.error === 3001) {
      window.location.href = "/auth";
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem("accessToken");
    config.headers.Authorization = `Bearer ${accessToken || ""}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
export default axiosInstance;
