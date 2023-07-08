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
    const { response, config } = error;
    if (response.status === 401 && response.data.code === 3000) {
      await axiosInstance.get(`${server}/refresh`);
      return axiosInstance(config);
    } else if (response.status === 401 && response.data.code === 4001) {
      window.location.href = "/auth";
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
