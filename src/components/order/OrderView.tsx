import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import {
  INextActionResponse,
  IOrderSearch,
  IOrderUpdatePayload,
  IResponseOrder,
} from "./interface";
import {
  Avatar,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Modal,
  Pagination,
  Select,
} from "@mui/material";
import { Box } from "@material-ui/core";
import orderApi from "../../api/orderApi";
import util from "./util";
import OrderDetail from "./OrderDetail";
import DeleteIcon from "@mui/icons-material/Delete";
import constant from "./constant";
import { amber, red } from "@mui/material/colors";

export default function OrderView(child: any) {
  const inputStatus = child.status;
  const [orders, setOrders] = useState<Array<IOrderSearch>>([]);
  const [page, setPage] = useState(1);
  const [numOfPage, setNumOfPage] = useState(1);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [updatePayload, setUpdatePayload] = useState<IOrderUpdatePayload>({
    idOrder: "",
    status: "",
    reason: "",
  });
  const [action, setAction] = useState<Array<INextActionResponse>>([]);

  // status
  const [isModal, setIsModal] = useState<boolean>(false);

  // loading
  const [itemLoading, setItemLoading] = useState<boolean>(false);

  // handler
  const handleChangePage = (e: any, value: number) => {
    setPage(value);
  };

  const handlerClickOrderRow = (id: string | null) => {
    setDetailId((pre) => id);
  };

  const handleChangeReason = (e: any) => {
    setUpdatePayload((pre) => {
      return {
        ...pre,
        reason: e.target.value,
      };
    });
  };

  const handleModalSubmit = (isSubmit: boolean) => {
    setIsModal(false);
    if (isSubmit) {
      updateStatusOrder().then((r) => fetchOrders());
    }
  };

  const handleUpdateStatus = (orderId: string, a: INextActionResponse) => {
    let temp: IOrderUpdatePayload | null = null;
    setUpdatePayload((prevState) => {
      temp = {
        ...prevState,
        idOrder: orderId,
        status: a.value,
        reason: "",
      };
      return temp;
    });

    if (a.isRequireReason) {
      setIsModal(true);
    } else {
      if (window.confirm(`bạn có chắc chuyển sang trạng thái ${a.name} `))
        updateStatusOrder(temp).then((r) => fetchOrders().then());
    }
  };

  // hook effect
  useEffect(() => {
    fetchOrders().then();
  }, [page, inputStatus]);

  // fetch, api
  const updateStatusOrder = async (temp: IOrderUpdatePayload | null = null) => {
    const data = {
      status: updatePayload.status,
      reason: updatePayload.reason,
    };
    const idOrder = temp ? temp.idOrder : updatePayload.idOrder;
    if (temp) {
      data.status = temp.status;
      data.reason = temp.reason;
    }
    return await orderApi.updateStatusOrder(idOrder, data);
  };
  const fetchOrders = async () => {
    setOrders([]);
    try {
      setItemLoading((p) => true);
      const response = await orderApi.searchOrderByStatus(inputStatus, page);
      setItemLoading((p) => false);
      if (response.data) {
        const data = response.data as IResponseOrder;
        setOrders(data.orders);
        setNumOfPage(data.numOfPage);
        setAction(data.nextAction);
        setDetailId(null);
      }
    } catch (err) {
      setItemLoading((p) => false);
    }
  };

  return (
    <Box
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: 300,
        backgroundColor: "white",
      }}
    >
      {itemLoading ? (
        <CircularProgress />
      ) : orders.length ? (
        <div style={{ width: "100%" }}>
          <TableContainer style={{ width: "100%" }} component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Cửa hàng</TableCell>
                  <TableCell align="left">trạng thái</TableCell>
                  <TableCell align="left">tổng tiền</TableCell>
                  <TableCell align="left">ngày mua</TableCell>
                  <TableCell align="left">số sản phẩm</TableCell>
                  {inputStatus === constant.status.canceled.value ? (
                    <TableCell align="left">Lý do hủy </TableCell>
                  ) : (
                    <></>
                  )}
                  {action.length ? (
                    <TableCell align="center">Cập nhật</TableCell>
                  ) : (
                    <></>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    hover={true}
                    style={{ cursor: "pointer" }}
                    onClick={(e) => handlerClickOrderRow(row.id)}
                  >
                    <TableCell component="th" scope="row">
                      <Box style={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          src={row.shop.avatar}
                          style={{ marginRight: "5px" }}
                          variant={"rounded"}
                        ></Avatar>
                        {util.limitString(row.shop.name, 12)}
                      </Box>
                    </TableCell>
                    <TableCell align="left">
                      {util.getNameStatusByValue(row.status)}
                    </TableCell>
                    <TableCell align="left">
                      {util.convertToMoneyString(row.total)}
                    </TableCell>
                    <TableCell align="left">
                      {util.getFormattedDate(new Date(row.createdAt))}
                    </TableCell>
                    <TableCell align="center">{row.items.length}</TableCell>
                    {action.length ? (
                      <TableCell>
                        {action.map((a) => {
                          return (
                            <Button
                              key={a.id}
                              style={{
                                color: "white",
                                backgroundColor: a.color,
                                margin: "3px",
                                boxSizing: "border-box",
                              }}
                              onClick={(e) => handleUpdateStatus(row.id, a)}
                            >
                              {a.name}
                            </Button>
                          );
                        })}
                      </TableCell>
                    ) : (
                      <></>
                    )}
                    {inputStatus === constant.status.canceled.value ? (
                      <TableCell align="left">{row.reasonCancel}</TableCell>
                    ) : (
                      <></>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Box
              mt={10}
              mb={5}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Pagination
                count={numOfPage}
                defaultPage={1}
                color={"primary"}
                variant="outlined"
                onChange={(e, value) => handleChangePage(e, value)}
              />
            </Box>
          </TableContainer>
          <Box>{detailId ? <OrderDetail orderId={detailId} /> : <></>}</Box>
        </div>
      ) : (
        <Box
          style={{
            height: 400,
            backgroundColor: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img
            src={
              "https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/5fafbb923393b712b96488590b8f781f.png"
            }
            style={{ width: 200, height: 200 }}
          />
          <p>Bạn chưa có đơn hàng nào </p>
        </Box>
      )}

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
                  <FormControl sx={{ mt: 2, minWidth: 200 }}>
                    <Select
                      autoFocus
                      value={updatePayload.reason}
                      onChange={(e) => handleChangeReason(e)}
                    >
                      {constant.reasonCancel.map((reason) => {
                        return (
                          <MenuItem key={reason.id} value={reason.name}>
                            {reason.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleModalSubmit(false)}>Hủy</Button>
                <Button onClick={() => handleModalSubmit(true)}>
                  Xác nhận
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
