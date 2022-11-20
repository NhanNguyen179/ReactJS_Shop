
const status = {
    waitForConfirm : {name:"Đang chờ xác nhận",value:"wait_for_confirm"},
    confirmed :  {name:"Đã xác nhận",value:"confirmed"},
    delivering:{name:"Đang giao",value:"delivering"},
    completed:{name:"Hoàn thành",value:"completed"},
    canceled:{name:"Đã hủy",value:"cancelled"},
}

const reasonCancel = [
    {id:1,name:"thay đổi địa chỉ nhận hàng"},
   {id:2,name:'mua thêm sản phẩm'},
    {id:3,name:'khác'}
]

export default {
    status,
    reasonCancel,
}