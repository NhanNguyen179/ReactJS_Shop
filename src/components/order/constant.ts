const status = {
  waitForConfirm: { name: "Đang chờ xác nhận", value: "wait_for_confirm" },
  confirmed: { name: "Đã xác nhận", value: "confirmed" },
  delivering: { name: "Đang giao", value: "delivering" },
  completed: { name: "Hoàn thành", value: "completed" },
  canceled: { name: "Đã hủy", value: "cancelled" },
};

const reasonCancel = [
  { id: 1, name: "thay đổi địa chỉ nhận hàng" },
  { id: 2, name: "mua thêm sản phẩm" },
  { id: 3, name: "thay đổi kích thước sản phẩm" },
  { id: 4, name: "tôi không muốn mua nữa" },
  { id: 5, name: "tôi muốn nhập mã voucher" },
  { id: 7, name: "tìm thấy sản phẩm rẻ hơn" },
  { id: 6, name: "khác" },
];

export default {
  status,
  reasonCancel,
};
