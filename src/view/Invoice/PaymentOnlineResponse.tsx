import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import orderApi from "../../api/orderApi";
import Loading from "../../components/Loading";

export default function PaymentOnlineResponse() {
  const search = useLocation().search;
  const [loading, setLoading] = useState<boolean>(true);
  const [paymentResponse, setPaymentResponse] = useState<string>();
  const getPaymentResponse = async () => {
    const request = {
      params: {
        vnp_Amount: new URLSearchParams(search).get("vnp_Amount"),
        vnp_BankCode: new URLSearchParams(search).get("vnp_BankCode"),
        vnp_BankTranNo: new URLSearchParams(search).get("vnp_BankTranNo"),
        vnp_CardType: new URLSearchParams(search).get("vnp_CardType"),
        vnp_OrderInfo: new URLSearchParams(search).get("vnp_OrderInfo"),
        vnp_PayDate: new URLSearchParams(search).get("vnp_PayDate"),
        vnp_ResponseCode: new URLSearchParams(search).get("vnp_ResponseCode"),
        vnp_TmnCode: new URLSearchParams(search).get("vnp_TmnCode"),
        vnp_TransactionNo: new URLSearchParams(search).get("vnp_TransactionNo"),
        vnp_TransactionStatus: new URLSearchParams(search).get(
          "vnp_TransactionStatus"
        ),
        vnp_TxnRef: new URLSearchParams(search).get("vnp_TxnRef"),
        vnp_SecureHash: new URLSearchParams(search).get("vnp_SecureHash"),
        vnp_SecureHashType: new URLSearchParams(search).get(
          "vnp_SecureHashType"
        ),
      },
    };
    const respone: any = await orderApi.GetPaymentOnline(request);
    console.log(respone);
    setPaymentResponse(respone.message);
  };

  useEffect(() => {
    setLoading(true);
    getPaymentResponse().then(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  return paymentResponse === "thành công" ? (
    <div>Thanh toán thành công</div>
  ) : (
    <div>Thanh toán thất bại</div>
  );
}
