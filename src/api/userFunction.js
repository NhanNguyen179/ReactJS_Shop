import axios from "axios";
import userApi from "./userApi";

const userAPI = {
  async login(data, role) {
    const axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: {
        "Bypass-Tunnel-Reminder": "true",
      },
    });
    return await axiosInstance.post(`/sv1/auth/${role}/login/`, data);
  },
  async register(data, role) {
    const axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: {
        "Bypass-Tunnel-Reminder": "true",
      },
    });
    return axiosInstance.post(`/sv1/users/${role}/register_with_roles/`, data);
  },
  async getInforUser() {
    return userApi.get(`/sv1/users/me/get_user/`);
  },
  async getShops() {
    const axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: {
        "Bypass-Tunnel-Reminder": "true",
      },
    });
    return axiosInstance.get(`/sv1/users/get_list_shop/`);
  },
  async getAllUser() {
    return userApi.get(`/sv1/users/`);
  },
  async changeRole(id) {
    return await userApi.get(`/sv1/auth/${id}/active_deactive_account_role/`);
  },
  async paymentType() {
    return await userApi.get(`/sv1/payments/`);
  },
  async updateProfile(data) {
    return await userApi.put(`/sv1/users/me/update_profile/`, data);
  },
  async uploadAvatar(data) {
    var bodyFormData = new FormData();
    bodyFormData.append("files", data);
    await userApi.post(`/sv1/users/me/up_image/`, bodyFormData);
  },
  async forgotPassword(data) {
    const axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: {
        "Bypass-Tunnel-Reminder": "true",
      },
    });
    return await axiosInstance.post(`sv1/auth/forgot_password/`, data);
  },
  async changePassword(data) {
    return await userApi.put(`sv1/auth/me/change_password/`, data);
  },
};

export default userAPI;
