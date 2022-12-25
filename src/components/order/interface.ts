interface IStatusOrder {
    name:string,
    value:string
}

interface IProductItem {
    id:string,
    name:string,
    description:string,
    price:number,
    avatar:string
    discount:number
}

interface IShopOrder {
    id:string,
    name:string,
    avatar:string
}

interface IOrderAndProduct {
    id:string,
    quantity:number,
    product:IProductItem
}
interface IOrderSearch {
    id:string,
    status:string,
    total:number,
    reasonCancel:string,
    paymentMethod : string,
    paymentName : string,
    createdAt:string,
    updatedAt:string,
    shop:IShopOrder,
    items:Array<IOrderAndProduct>,
}

interface IResponseOrder {
    orders:Array<IOrderSearch>,
    numOfPage:number
    nextAction: Array<INextActionResponse>;
}

interface INextActionResponse {
    id:number
    name:string
    value:string
    isRequireReason:boolean
    color:string
}

// detail component
interface IOrderDetail {
    createdAt:string
    updatedAt:string
    address:string
    totalDiscount:number
    productDiscount:number
    voucherDiscount:number
    totalPrice:number
    deliveryFee:number
    total:number
    status:string
    reasonCancel:string
    customer:IOrderDetailCustomer
    shop:IOrderDetailShop
    items:Array<IOrderAndProduct>
}
interface IOrderDetailCustomer {
    id:string
    name:string
    phone:string|null
    email:string
}

interface IOrderDetailShop {
    id:string
    name:string
    phone:string|null
    email:string
    avatar:string|null
}

interface IReviewOrder {
    id: string;
    updatedAt: string;
    content: string;
    rating: number;
}

interface IReviewCreatePayload {
    order: string;
    content: string;
    rating: number;
    currentUserId: string;
    userType: string;
}

interface IOrderUpdatePayload {
    idOrder:string,
    status:string,
    reason:string
}

export type {
    IStatusOrder,
    IProductItem,
    IShopOrder,
    IOrderAndProduct,
    IOrderSearch,
    IResponseOrder,
    IOrderDetail,
    IOrderUpdatePayload,
    IOrderDetailCustomer,
    IOrderDetailShop,
    IReviewOrder,
    IReviewCreatePayload,
    INextActionResponse
}