import productApi from "./productConfig";

const productAPI = {
  async getCategory() {
    return await productApi.get("/sv2/categories");
  },
  async getProducts(request) {
    console.log(request);
    return await productApi.get("/sv2/products", request);
  },
  async getDetailProduct(id) {
    return await productApi.get(`/sv2/products/${id}`);
  },
  getUsersByUsername(username) {
    return productApi.get(`/user/getUsersByUsername/${username}`);
  },
  async getDeactiveProducts() {
    return await productApi.get(`/sv2/products/deactive`);
  },
  async deactiveProduct(id) {
    await productApi.put(`/sv2/products/${id}/deactive`);
  },
  async activeProduct(id) {
    await productApi.put(`/sv2/products/${id}/active`);
  },
  // getUserByUsername(username) {
  //   return productApi.get(`/user/getUserByUsername/${username}`)
  // },
  // follow(userId) {
  //   return productApi.get(`/user/follow/${userId}`)
  // },
  // unfollow(userId) {
  //   return productApi.get(`/user/unfollow/${userId}`)
  // },
  // setAvatarAndDesc(data) {
  //   return productApi.post(`/user/setAvatarAndDesc`, data)
  // },
  // setDesc(desc) {
  //   return productApi.post(`/user/setDesc`, { desc })
  // },
};

export default productAPI;
