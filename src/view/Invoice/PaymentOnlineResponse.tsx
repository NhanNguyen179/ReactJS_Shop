import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import orderApi from "../../api/orderApi";
import Loading from "../../components/Loading";
import SuccessImage from "../../img/success.png";
import FailedImage from "../../img/failed.png";
import { useHistory } from "react-router-dom";
import { CustomButton } from "../../components/common/CustomButton";
import { Box } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

function PaymentOnlineResponse() {
  const history = useHistory();
  const search = useLocation().search;
  const [loading, setLoading] = useState<boolean>(true);
  const [paymentResponse, setPaymentResponse] = useState<string>();

  const handleRedirect = (url: string) => {
    history.push(url);
  };

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
    setPaymentResponse(respone.message);
  };

  useEffect(() => {
    setLoading(true);
    getPaymentResponse()
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  return paymentResponse === "thành công" ? (
    <Box sx={style}>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={SuccessImage} alt="ConfirmDelete" style={{ width: "30%" }} />
        <p
          style={{
            fontFamily: "Inter",
            fontStyle: "normal",
            fontWeight: "700",
            fontSize: "24px",
            lineHeight: "150%",
            textAlign: "center",
            letterSpacing: "1px",
            color: "#171B2F",
          }}
        >
          Đặt hàng thành công{" "}
        </p>
        <CustomButton onClick={() => handleRedirect("/order")}>
          Quay về trang đặt hàng
        </CustomButton>
      </div>
    </Box>
  ) : (
    <Box sx={style}>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={FailedImage} alt="ConfirmDelete" style={{ width: "30%" }} />
        <p
          style={{
            fontFamily: "Inter",
            fontStyle: "normal",
            fontWeight: "700",
            fontSize: "24px",
            lineHeight: "150%",
            textAlign: "center",
            letterSpacing: "1px",
            color: "#171B2F",
          }}
        >
          Đặt hàng thất bại{" "}
        </p>
        <CustomButton onClick={() => handleRedirect("/")}>
          Quay về trang chủ
        </CustomButton>
      </div>
    </Box>
  );
}
export default PaymentOnlineResponse;
