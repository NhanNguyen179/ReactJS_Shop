import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import userAPI from "../../api/userFunction";
import {
  Avatar,
  Container,
  DialogActions,
  Paper,
  Typography,
} from "@mui/material";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  MenuItem,
  Modal,
} from "@material-ui/core";
import orderApi from "../../api/orderApi";
import AddVoucher from "./Components/AddVoucher";
import { CustomButton } from "../../components/common/CustomButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    headerContainer: {
      position: "relative",
      height: "100px",
    },
    header: {
      display: "flex",
      position: "absolute",
      width: "calc(100%)",
      top: "-70px",
      alignItems: "flex-end",
      "& > *": {
        margin: `${theme.spacing(3)}px ${theme.spacing(1)}px`,
      },
    },
    spacer: {
      flexGrow: 1,
    },
    avatar: {
      border: `3px solid white`,
      width: theme.spacing(13),
      height: theme.spacing(13),
      boxShadow: theme.shadows[3],
    },
    actionGroup: {
      display: "flex",
      width: "330px",
      justifyContent: "space-between",
      marginRight: 0,
    },
    summaryCards: {
      display: "flex",
      flexWrap: "wrap",
    },
    summaryCard: {
      margin: theme.spacing(1),
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    tripCard: {
      margin: theme.spacing(1),
      padding: theme.spacing(2),
    },
  })
);

export default function Voucher() {
  const [open, setOpen] = React.useState(false);
  const [dataUpdate, setDataUpdate] = React.useState("");

  const handleOpen = () => {
    setDataUpdate("");
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  const [vouchers, setVouchers] = React.useState([]);
  let history = useHistory();
  const classes = useStyles();
  const getVouchers = async () => {
    const response: any = await orderApi.getVoucher();
    setVouchers(response.data);
    console.log(response.data);
  };

  React.useEffect(() => {
    getVouchers().then();
  }, []);

  return (
    <Container>
      <Button onClick={handleOpen}>Thêm Voucher</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddVoucher data={dataUpdate} />
      </Modal>
      <Paper elevation={2} className={classes.summaryCard}>
        <Typography color={"textSecondary"} variant="h5" gutterBottom>
          Cửa hàng
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Số thứ tự</TableCell>
              <TableCell>Mã giảm giá</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Giảm tiền</TableCell>
              <TableCell>Giảm %</TableCell>
              <TableCell>Cập nhập</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vouchers?.map((voucher: any, index) => (
              <TableRow hover key={voucher.id} style={{ cursor: "pointer" }}>
                <TableCell style={{ maxWidth: "100px", overflow: "hidden" }}>
                  {index}
                </TableCell>
                <TableCell style={{ maxWidth: "100px", overflow: "hidden" }}>
                  {voucher.code}
                </TableCell>
                <TableCell style={{ maxWidth: "100px", overflow: "hidden" }}>
                  {voucher.name}
                </TableCell>
                <TableCell style={{ maxWidth: "100px", overflow: "hidden" }}>
                  {voucher.quantity}
                </TableCell>
                <TableCell style={{ maxWidth: "100px", overflow: "hidden" }}>
                  {voucher.discountValue}
                </TableCell>
                <TableCell style={{ maxWidth: "100px", overflow: "hidden" }}>
                  {voucher.discountPercent}
                </TableCell>
                <TableCell style={{ maxWidth: "100px", overflow: "hidden" }}>
                  <CustomButton
                    onClick={(e) => {
                      setDataUpdate(voucher);
                      setOpen(true);
                    }}
                  >
                    Cập nhập
                  </CustomButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
