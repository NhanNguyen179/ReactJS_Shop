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
  // getUserByUsername(username) {
  //   return userApi.get(`/user/getUserByUsername/${username}`)
  // },
  // follow(userId) {
  //   return userApi.get(`/user/follow/${userId}`)
  // },
  // unfollow(userId) {
  //   return userApi.get(`/user/unfollow/${userId}`)
  // },
  // setAvatarAndDesc(data) {
  //   return userApi.post(`/user/setAvatarAndDesc`, data)
  // },
  // setDesc(desc) {
  //   return userApi.post(`/user/setDesc`, { desc })
  // },
};

export default userAPI;
