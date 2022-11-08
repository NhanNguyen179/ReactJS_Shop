import productApi from "./productConfig";

const productAPI = {
  async getCategory() {
    return await productApi.get("/sv2/categories");
  },
  async getProducts(categoryId) {
    if (categoryId === null) {
      return await productApi.get(`/sv2/products`);
    }
    return await productApi.get(`/sv2/products?categoryId=${categoryId}`);
  },
  async getDetailProduct(id) {
    return await productApi.get(`/sv2/products/${id}`);
  },
  getUsersByUsername(username) {
    return productApi.get(`/user/getUsersByUsername/${username}`);
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
