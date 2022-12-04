import orderConfig from "./orderConfig";
import axios from "axios";

const orderApi = {
  async getProvinces() {
    return await orderConfig.get("/provinces/");
  },
  async getReviewByOrderId(id){
    return await orderConfig.get(`/reviews/${id}`)
  },
  async getDistricts(idProvice) {
    return await orderConfig.get(`districts/${idProvice}`);
  },
  async getConfigOrder() {
    return await orderConfig.get(`/config-order`);
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
    return await orderConfig.post(`/orders/calculate`, data);
  },
  async getInformationShop(idShop) {
    return await orderConfig.post(`/sv1/users/${idShop}`);
  },
  // manage order
  async searchOrderByStatus(status,page = 1,shopId = ""){
    return await orderConfig.get(`/orders?limit=5&page=${page}&status=${status}&shopId=${shopId}`)
  },
  async updateStatusOrder(id,data){
    return await orderConfig.patch(`/orders/${id}`, data)
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
  },

  // data center
  async getConfigDataCenter(){
    return await orderConfig.get(`/config-order/data-center`)
  },
  async getDataCenterOrder(data){
    return await orderConfig.post(`/data-center/order/me`,data)
  },
  async createPayment(amount){
    return await orderConfig.post("/create_payment_url",{
      amount:amount,
      bankCode:"",
      orderDescription:"test",
      orderType:"billpayment",
      language:"vn"
    })
  }
};

export default orderApi;
