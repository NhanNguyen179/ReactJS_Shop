import orderConfig from "./orderConfig";

const orderApi = {
  async getProvinces() {
    return await orderConfig.get("provinces/");
  },
  async getReviewByOrderId(id){
    return await orderConfig.get(`/reviews/${id}`)
  },
  async getDistricts(idProvice) {
    return await orderConfig.get(`districts/${idProvice}`);
  },
  async getWards(idWard) {
    return await orderConfig.get(`wards/${idWard}`);
  },
  getUsersByUsername(username) {
    return orderConfig.get(`/user/getUsersByUsername/${username}`);
  },
  async getVoucher() {
    return await orderConfig.get(`/vouchers/`);
  },
  async getFeeShip(data) {
    return await orderConfig.post(`/fee/`, data);
  },
  async getService(data) {
    return await orderConfig.post(`/services`, data);
  },
  async createOrder(data) {
    return await orderConfig.post(`/orders/`, data);
  },
  async getInformationShop(idShop) {
    return await orderConfig.post(`/sv1/users/${idShop}`);
  },
  // manage order
  async searchOrderByStatus(status,page){
    return await orderConfig.get(`/orders?limit=5&page=${page}&status=${status}`)
  },
  async updateStatusOrder(id,status){
    return await orderConfig.patch(`/orders/${id}`, {status})
  },
  async detailOrderById(id){
    return await orderConfig.get(`/orders/${id}`)
  },
  async getReviewByProductId(productId, rating = 0, limit = 20, page = 1) {
    return await orderConfig.get(
        `/reviews?product=${productId}&rating=${rating}&limit=${limit}&page=${page}`
    );
  },
  async createReview(payload){
    return await orderConfig.post('/reviews',payload)
  },
  async updateReview(payload){
    return await orderConfig.put(`/reviews/${payload.id}`,payload)
  }

};

export default orderApi;
