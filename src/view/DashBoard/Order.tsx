import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Button,
  Container,
  DialogActions,
  Paper,
  Typography,
} from "@mui/material";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import productAPI from "../../api/productFunction";
import { CustomSelect } from "../../components/common/CustomSelect";
import { useParams } from "react-router-dom";
import listStatus from "../../components/order/util";
import util from "../../components/order/util";
import orderApi from "../../api/orderApi";
import { Value } from "sass";
import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Modal,
  TextField,
} from "@material-ui/core";

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

export default function Order() {
  const [products, setProducts] = React.useState([]);
  const [listStatus, setListStatus] = React.useState<any>([]);
  const [valueStatus, setValueStatus] = React.useState<any>();
  const [listNextStatus, setListNextStatus] = React.useState<any>();
  const [nextStatus, setNextStatus] = React.useState<any>();
  const [reasonCancel, setReasonCancel] = React.useState<any>();
  const [idOrder, setIdOrder] = React.useState<any>();
  const [isModal, setIsModal] = React.useState<boolean>(false);

  const shopId = useParams<{ shopId: string }>().shopId;
  const classes = useStyles();

  React.useEffect(() => {
    async function fetchData() {
      const listStatusOrder: any = await orderApi.getConfigOrder();
      setListStatus(listStatusOrder.data);
      setValueStatus(listStatusOrder.data[0].value);
      setListNextStatus(listStatus.data.nextAction);
      const response: any = await orderApi.searchOrderByStatus(
        listStatusOrder.data[0].value,
        1,
        shopId
      );
      setProducts(response.data.orders);
    }
    fetchData();
  }, []);

  const handleChangeReason = async (e: any) => {
    setReasonCancel(e.target.value);
  };
  const handleChange = async (value: any) => {
    setValueStatus(value);
    const response: any = await orderApi.searchOrderByStatus(value, 1, shopId);
    setListNextStatus(response.data.nextAction);
    setProducts(response.data.orders);
  };
  const handleChangeStatus = async (id: any) => {
    if (nextStatus === "cancelled") {
      setIsModal(true);
      setIdOrder(id);
    } else {
      const objectApi = {
        status: nextStatus,
        reason: "",
      };
      await orderApi.updateStatusOrder(id, objectApi);
    }
  };
  const handleSubmitWithReason = async () => {
    const objectApi = {
      status: nextStatus,
      reason: reasonCancel,
    };
    await orderApi.updateStatusOrder(idOrder, objectApi);
  };
  return (
    <Container>
      <Paper elevation={2} className={classes.summaryCard}>
        <Typography color={"textSecondary"} variant="h5" gutterBottom>
          Sản phẩm
        </Typography>
        <CustomSelect
          label=""
          options={listStatus?.map((item: any) => ({
            value: item.value,
            label: item.name,
          }))}
          value={valueStatus}
          setValue={handleChange}
          defaultValue={"wait_for_confirm"}
        />
        <Table size="small" style={{ margin: "20px 0" }}>
          <TableHead>
            <TableRow>
              <TableCell>Tên shop</TableCell>
              <TableCell>Ngày tạo </TableCell>
              <TableCell>Số sản phẩm</TableCell>
              <TableCell> Tổng tiền</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((product: any) => (
              <TableRow hover key={product?.id}>
                {/* <TableCell>
                  <Avatar
                    src={`${process.env.REACT_APP_API_BASE_URl_IMAGE}/${product.imageUrl}`}
                    sx={{ width: 56, height: 56 }}
                    alt="img"
                  />
                </TableCell> */}
                <TableCell>{product?.shop.name}</TableCell>
                <TableCell>
                  {util.getFormattedDate(new Date(product?.createdAt))}
                </TableCell>
                {/* <TableCell>{product.items.length}</TableCell> */}
                <TableCell>{product?.total} đ</TableCell>
                <TableCell>
                  <CustomSelect
                    label="Trạng thái tiếp theo"
                    options={listNextStatus?.map((item: any) => ({
                      value: item.value,
                      label: item.name,
                    }))}
                    value={nextStatus}
                    setValue={setNextStatus}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => handleChangeStatus(product?.id)}
                  >
                    Lưu
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Modal
        open={isModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            <Dialog fullWidth={false} maxWidth={false} open={isModal}>
              <DialogTitle>Bạn có chắc chắn muốn hủy đơn hàng này</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Lý do bạn hủy đơn hàng này
                </DialogContentText>
                <Box
                  component="form"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    m: "auto",
                    width: "fit-content",
                  }}
                >
                  <TextField
                    value={reasonCancel}
                    onChange={handleChangeReason}
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setIsModal(false)}>Hủy</Button>
                <Button onClick={() => handleSubmitWithReason()}>
                  Xác nhận
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
}
