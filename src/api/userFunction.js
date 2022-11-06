import userApi from "./userApi";
import axios from "axios";

// const baseUrl = "";
// const baseUrl2 = "//localhost:8000/api/v1/sv1/auth";

const userapi = axios.create({
  baseURL: "//localhost:8000/api/v1/sv1/user",
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  },
});

const userAPI = {
  async login(data) {
    return await userApi.post("/sv1/auth/admin/login/", data);
  },
  async register(data, role) {
    return userApi.post(`/sv1/user/${role}/register_with_roles/`, data);
  },
  async fetch_data_profile(id) {
    return await userapi.get(`${id}/`);
  },
  async fetch_data_payment_type() {
    return await userapi.get(`/get_payment_type/`);
  }
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
