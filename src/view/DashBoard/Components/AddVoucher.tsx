import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { CustomTextField } from "../../../components/common/CustomTextField";
import { Grid, Switch, TextField } from "@material-ui/core";
import Value from "../../../components/Value";
import { CustomButton } from "../../../components/common/CustomButton";
import orderApi from "../../../api/orderApi";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function AddVoucher(data?: any) {
  const [voucher, setVoucher] = React.useState(
    data.data !== ""
      ? {
          name: data.data.name,
          description: data.data.description,
          code: data.data.code,
          discountPercent: data.data.discountPercent,
          discountValue: data.data.discountValue,
          quantity: data.data.quantity,
          isActive: data.data.isActive,
        }
      : {
          name: "",
          description: "",
          code: "",
          discountPercent: 0,
          discountValue: 0,
          quantity: 0,
          isActive: true,
        }
  );
  const handleSubmit = async () => {
    if (data.data === "") {
      orderApi
        .AddVoucher(voucher)
        .then((rs) => {
          toast.success(`Thêm voucher thành công`, {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          window.location.href = "/dash-board/vouchers";
        })
        .catch((rs) => {
          toast.error(`${rs.response.data.message}`, {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    } else {
      orderApi
        .UpdateVoucher(voucher, data.data.id)
        .then((rs) => {
          toast.success(`Cập nhập voucher thành công`, {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          window.location.href = "/dash-board/vouchers";
        })
        .catch((rs) => {
          toast.error(`${rs.response.data.message}`, {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    }
  };
  return (
    <>
      <Box sx={style}>
        <Value value="Thêm voucher" size="24px" color="gray"></Value>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <TextField
              id="name"
              label="Tên"
              fullWidth
              value={voucher.name}
              onChange={(e) => {
                setVoucher({
                  ...voucher,
                  name: e.target.value,
                });
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Code"
              fullWidth
              value={voucher.code}
              onChange={(e) => {
                setVoucher({
                  ...voucher,
                  code: e.target.value,
                });
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Mô tả"
              fullWidth
              value={voucher.description}
              onChange={(e) => {
                setVoucher({
                  ...voucher,
                  description: e.target.value,
                });
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Phần trăm giảm giá"
              type="number"
              fullWidth
              value={voucher.discountPercent * 100}
              onChange={(e) => {
                setVoucher({
                  ...voucher,
                  discountPercent: Number(e.target.value) / 100,
                });
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Số tiền giảm giá"
              type="number"
              fullWidth
              value={voucher.discountValue}
              onChange={(e) => {
                setVoucher({
                  ...voucher,
                  discountValue: Number(e.target.value),
                });
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Số lượng"
              type="number"
              fullWidth
              value={voucher.quantity}
              onChange={(e) => {
                setVoucher({
                  ...voucher,
                  quantity: Number(e.target.value),
                });
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography style={{ display: "inline" }}> Kích hoạt </Typography>
            <Switch
              {...label}
              defaultChecked={true}
              value={voucher.isActive}
              onClick={(e) => {
                setVoucher({
                  ...voucher,
                  isActive: !voucher.isActive,
                });
              }}
            />
          </Grid>
        </Grid>
        <CustomButton onClick={handleSubmit}>
          {data.data === "" ? "THÊM" : "CẬP NHẬP"} VOUCHER
        </CustomButton>
      </Box>
    </>
  );
}
