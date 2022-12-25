import productApi from "./productConfig";

const productAPI = {
  async getCategories() {
    return await productApi.get("/sv2/categories");
  },
  async getBrands() {
    return await productApi.get("/sv2/brands");
  },
  async getOptions() {
    return await productApi.get("/sv2/options");
  },
  async getProducts(request) {
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
  async getAllDeactiveProducts(request) {
    return await productApi.get(`/sv2/products/all-deactive`, request);
  },
  async deactiveProduct(id) {
    await productApi.put(`/sv2/products/${id}/deactive`);
  },
  async activeProduct(id) {
    await productApi.put(`/sv2/products/${id}/active`);
  },
  async createProduct(request) {
    return await productApi.post("/sv2/products", request);
  },
};

export default productAPI;
