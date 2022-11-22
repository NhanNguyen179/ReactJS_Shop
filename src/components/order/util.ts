import {IStatusOrder} from "./interface";

const listStatus = [
    {name:"Đang chờ xác nhận",value:"wait_for_confirm"},
    {name:"Đã xác nhận",value:"confirmed"},
    {name:"Đang giao",value:"delivering"},
    {name:"Hoàn thành",value:"completed"},
    {name:"Đã hủy",value:"cancelled"}
]

const getListStatus = ()=>{
    return listStatus
}

const getNameStatusByValue = (value:string|undefined):string=>{
    if(value){
        const a = listStatus.find(x=>x.value===value)
        if(a){
            return a.name
        }
    }
    return "không thể xác định"
}
const convertToMoneyString = (n: number|undefined): string => {
    if(!n) return "đ 0"
    const rs =  n.toLocaleString("vn-VN", {
        style: "currency",
        currency: "VND",
    });
    return rs
};

const  getFormattedDate = (date:Date)=> {
    let year = date.getFullYear();

    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    let day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return month + '/' + day + '/' + year;
}

const limitString = (text:string,n:number):string=>{
    if(text.length > n)
    return text.slice(0,n)+"..."
    else return text
}

export default {
    getListStatus,getNameStatusByValue,convertToMoneyString,getFormattedDate,limitString
}