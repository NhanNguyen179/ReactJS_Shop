import * as React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import {
  Container,
  Grid,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { AppContext } from "../../context/Context";
import orderApi from "../../api/orderApi";
import { CustomButton } from "../../components/common/CustomButton";
import Value from "../../components/Value";
import util from "../../components/order/util";
import NoProductInCart from "../../components/cart/NoProductInCart";
import NotificationModal from "../../components/NotificationModal";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    background: "rgba(255, 255, 255, 0.8)",
    borderRadius: "10px",
    padding: "20px",
  },
  table: {
    "& tr": {
      minHeight: "100px !important",
      height: "100px !important",
    },

    cursor: "pointer",
  },
  THead: {
    "& th": {
      borderBottom: "none !important",
      fontWeight: "bold",
      fontSize: "20px",
    },

    borderBottom: "1px solid #7e7979",
  },
  TBody: {
    "& :hover ": {
      background: "#F7A75D",
    },
    "& tr th": {
      borderBottom: "none !important",
      textAlign: "left !important",
      fontSize: "18px",
    },
    "& tr td": {
      borderBottom: "none !important",
      fontSize: "18px",
    },
  },
  tableHead: {
    "&>:nth-child(1)": {
      color: "#000 !important",

      width: "100px ",
    },
    "&>:nth-child(2)": {
      color: "#000 !important",

      width: "150px",
    },
    "&>:nth-child(3)": {
      color: "#000 !important",

      width: "200px",
    },
    "&>:nth-child(4)": {
      color: "#000 !important",

      width: "20px",
    },
    "&>:nth-child(5)": {
      color: "#000 !important",

      width: "200px",
    },
  },
  tableBody: {
    "&>:nth-child(1)": {
      color: "#000 !important",

      width: "100px !important",
      textAlign: "left !important",
    },
    "&>:nth-child(2)": {
      color: "#000 !important",

      width: "150px",
    },
    "&>:nth-child(3)": {
      color: "#000 !important",

      width: "200px",
    },
    "&>:nth-child(4)": {
      color: "#000 !important",

      width: "200px",
    },
    "&>:nth-child(5)": {
      color: "#000 !important",

      width: "200px",
    },
  },
  gridItem: {
    height: "100%",
    borderRadius: "12px",
    [theme.breakpoints.up("md")]: {
      height: "90px",
    },
  },
  TokenSymbol: {
    padding: "0px !important",
  },
  tablerContainer: {
    borderBottom: "1px solid !important",
  },
  gridWrapper: {
    paddingTop: "40px",
  },
}));
export default function Invoice() {
  const classes = useStyles();
  const history = useHistory();
  const { state, dispatch, invoice, setInvoice, auth, setAuth } =
    React.useContext(AppContext);

  if (!auth) {
    const user = localStorage.getItem("user");
    if (user) {
      setAuth(JSON.parse(user));
    } else {
      history.push("/sign-in");
    }
  }

  const [feeShip, setFeeShip] = React.useState<any>();
  const [voucher, setVoucher] = React.useState<any>();
  const [service, setService] = React.useState<any>();
  const [voucherId, setVoucherId] = React.useState<any>();

  const [serviceId, setServiceId] = React.useState<any>();
  const [totalPrice, setTotalPrice] = React.useState<any>(
    invoice
      ? invoice
          .map((item: any) => item.quantity * item.price)
          .reduce((acc: any, value: any) => acc + value)
          .toFixed(2)
      : 0
  );
  const [paymentType, setPaymentType] = React.useState<string>("COD");

  const handlePaymentTypeChange = (event: any) => {
    setPaymentType("");
    setPaymentType(event.target.value as string);
  };

  const [visibleModal, setVisibleModal] = React.useState(false);
  const [statusModal, setStatusModal] = React.useState({
    message: "",
    statusSuccess: true,
    url : "./",
    textUrl : "Quay về trang chủ"
  });
  // React.useEffect(() => {
  //   async function fetchData() {
  //     const voucher = await orderApi.getVoucher();
  //     const objectShip = {
  //       from_district: Number(auth.profile.district_code),
  //       to_district: 1526,
  //     };
  //     const service = await orderApi.getService(objectShip);
  //     setService(service.data);
  //     setVoucher(voucher.data);
  //   }
  //   fetchData();
  // }, [auth.profile.district_code]);
  const [finalPrice, setFinalPrice] = React.useState<any>(totalPrice);

  React.useEffect(() => {
    async function fetchData() {
      const voucher = await orderApi.getVoucher();
      const objectShip = {
        from_district: Number(auth.profile.district_code),
        to_district: 1526,
      };
      const service = await orderApi.getService(objectShip);
      setService(service.data);
      setVoucher(voucher.data);
    }
    fetchData();
    console.log("auth", auth)
  }, []);

  const handleChangeVoucher = (e: any) => {
    setVoucherId(e.target.value);
    let temp = totalPrice;
    if (e.target.value.discountPercent > 0) {
      temp = temp * (1 - Number(e.target.value.discountPercent));
    } else {
      temp = temp - Number(e.target.value.discountValue);
    }
    if (feeShip > 0) {
      temp = Number(temp) + Number(feeShip);
    }
    setFinalPrice(temp);
  };
  const getFeeShip = (e: any) => {
    const objectCall = {
      from_district_id: 1531,
      service_id: e.target.value,
      to_district_id: auth.profile.district_code,
      to_ward_code: auth.profile.ward_code,
      toPhone: auth.profile.phone_number,
      items: invoice.map((item: any) => ({
        product_id: item.id,
        quantity: item.quantity,
      })),
    };
    orderApi.getFeeShip(objectCall).then((rs) => {
      let temp = finalPrice;
      if (feeShip > 0) {
        temp = Number(temp) - Number(feeShip);
      }
      temp = Number(temp) + Number(rs.data.total);

      setFinalPrice(temp);
      setFeeShip(Number(rs.data.total));

      setServiceId(e.target.value);
    });
  };
  const orderProduct = async () => {
    const objectCall = {
      shopId: invoice?.at(0)?.shopId,
      address: `${auth.profile.address},${auth.profile.district},${auth.profile.ward},${auth.profile.province}`,
      toName: auth.profile.name,
      toPhone: auth.profile.phone_number,
      toStreet: auth.profile.address,
      toWardCode: auth.profile.ward_code,
      toDistrictId: auth.profile.district_code,
      serviceId: serviceId,
      voucherId: voucherId.id,
      items: invoice.map((item: any) => ({
        product_id: item.id,
        quantity: item.quantity,
      })),
    };
    if (paymentType === "COD") {
      orderApi.createOrder(objectCall).then( (rs) => {
        setStatusModal(
          {
            message : "Đặt hàng thành công",
            statusSuccess : true,
            url : '/order',
            textUrl : "Quay về trang đặt hàng",
          }
        )
        setVisibleModal(true);
      }).catch((rs) => {
        setStatusModal(
          {
            message : "Đặt hàng thất bại",
            statusSuccess : false,
            url : '/',
            textUrl : "Quay về trang chủ",
          }
        )
        setVisibleModal(true);
      });
    } else {
      orderApi.createPayment(objectCall).then((res: any) => {
        window.location.href = res.data.url;
      });
    }
  };

  if (invoice === null || invoice.length === 0) {
    return <NoProductInCart />;
  }

  return (
    <WrapAll style={{ padding: 20 }}>
      <NotificationModal
        isModalSuccessVisible={visibleModal}
        setIsModalSuccessVisible={setVisibleModal}
        message={statusModal.message}
        success={statusModal.statusSuccess}
        url = {statusModal.url}
        textUrl = {statusModal.textUrl}
      />
      <WrapContainer maxWidth="md">
        <Paper className={classes.tableContainer}>
          <WrapTitle>
            <Value value={`Đơn hàng của bạn`} size="30px" />
          </WrapTitle>

          <TableContainer className={classes.tablerContainer}>
            <Table>
              <TableHead className={classes.THead}>
                <TableRow>
                  <TableCell>Ảnh</TableCell>
                  <TableCell>Sản phẩm</TableCell>
                  <TableCell align="right">Số lượng</TableCell>
                  <TableCell align="right">Đơn giá</TableCell>
                  <TableCell align="right">Thành tiền</TableCell>
                </TableRow>
              </TableHead>

              <TableBody className={classes.TBody}>
                {invoice?.map((item: any) => {
                  console.log(
                    `${process.env.REACT_APP_API_BASE_URl_IMAGE}/${item.image[0]}`
                  );
                  return (
                    <TableRow key={item.name}>
                      <TableCell>
                        <img
                          src={`${process.env.REACT_APP_API_BASE_URl_IMAGE}/${item.image[0]}`}
                          alt="anh"
                          width={100}
                        />
                      </TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell align="right">{item.quantity} </TableCell>
                      <TableCell align="right"> {item.price} </TableCell>
                      <TableCell align="right">
                        {item.quantity * item.price}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <WrapActionBill>
            <Grid container spacing={4}>
              <Grid item md={12}>
                <WrapVoucher>
                  <Value value={`Phương thức thanh toán`} size="16px" />
                  <Select
                    value={paymentType}
                    onChange={handlePaymentTypeChange}
                  >
                    <MenuItem value={"COD"}>Thanh toán khi nhận hàng</MenuItem>
                    <MenuItem value={"VNPay"}>Thanh toán qua VNPay</MenuItem>
                  </Select>
                </WrapVoucher>
              </Grid>
              <Grid item md={12}>
                <WrapVoucher>
                  <Value value={`Phương thức vận chuyển`} size="16px" />
                  <Select onChange={getFeeShip}>
                    {service?.map((item: any) => (
                      <MenuItem value={item?.service_id}>
                        {item.short_name}
                      </MenuItem>
                    ))}
                  </Select>
                </WrapVoucher>
              </Grid>
              <Grid item md={12}>
                <WrapVoucher>
                  <Value value={`Bee Voucher`} size="16px" />
                  <Select onChange={handleChangeVoucher}>
                    {voucher?.map((item: any) => (
                      <MenuItem value={item}>{item.name}</MenuItem>
                    ))}
                  </Select>
                </WrapVoucher>
              </Grid>
              <Grid item md={6} xs={12}>
                <WrapInformation>
                  <Value value={`Tên: ${auth.profile.name}`} size="16px" />
                </WrapInformation>
                <WrapInformation>
                  <Value value={`Địa chỉ: ${auth.profile.address} `} size="16px" />
                </WrapInformation>
                <WrapInformation>
                  <Value value={`Email: : ${auth.profile.email} `} size="16px" />
                </WrapInformation>
                <WrapInformation>
                  <Value value={`SĐT: ${auth.profile.phone_number} `} size="16px" />{" "}
                </WrapInformation>
              </Grid>

              <Grid item md={6}>
                <WrapPrice>
                  <Value value={`Tổng tiền: `} size="16px" />
                  <Value
                    value={`${util.convertToMoneyString(totalPrice)} VNĐ`}
                    size="16px"
                  />
                </WrapPrice>
                <WrapPrice>
                  <Value value={`Giảm giá: `} size="16px" />
                  <Value
                    value={` ${
                      voucherId
                        ? voucherId.discountPercent > 0
                          ? `- ${voucherId.discountPercent * 100}%`
                          : `- ${voucherId.discountValue}VND`
                        : "Chưa có voucher"
                    }`}
                    size="16px"
                  />
                </WrapPrice>
                <WrapPrice>
                  <Value value={`Phí vận chuyển: `} size="16px" />
                  <Value
                    value={` ${util.convertToMoneyString(feeShip)} VNĐ`}
                    size="16px"
                  />
                </WrapPrice>
                <WrapPrice>
                  <Value value={`Cần thanh toán: `} size="16px" />
                  <Value value={`${finalPrice} VNĐ`} size="16px" color="red" />
                </WrapPrice>
              </Grid>
            </Grid>
          </WrapActionBill>
          <WrapCenter>
            <CustomButton onClick={orderProduct}>
              Mua hàng và thanh toán
            </CustomButton>
          </WrapCenter>
        </Paper>
      </WrapContainer>
    </WrapAll>
  );
}
const WrapAll = styled.div``;

const WrapPrice = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 20px;
  margin: 10px 0px;
  border-bottom: 1px solid;
  padding: 10px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const WrapCenter = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const WrapContainer = styled(Container)`
  margin-top: 100px;
  height: 100%;
`;

const WrapTitle = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  width: 100%;
  margin-bottom: 30px;
  padding: 10px;
`;

const WrapVoucher = styled.div`
  margin-top: 20px;
  display: flex;
  align-item: center;
  justify-content: space-between;
  width: 100%;
  gap: 20px;
`;

const WrapActionBill = styled.div`
  margin-top: 30px;
  padding: 15px;
`;

const WrapInformation = styled.div`
  margin: 10px 0px 10px 0px;
  border-bottom: 1px solid;
  padding: 10px;
`;
