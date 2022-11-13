import * as React from "react";
import styled from "styled-components";
import {
  Button,
  Container,
  InputLabel,
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
type Props = {};
export default function Invoice() {
  const { state, dispatch, invoice, setInvoice, auth, setAuth } =
    React.useContext(AppContext);

  const [feeShip, setFeeShip] = React.useState<any>();
  const [voucher, setVoucher] = React.useState<any>();
  const [service, setService] = React.useState<any>();
  const [voucherId, setVoucherId] = React.useState<any>();
  const [serviceId, setServiceId] = React.useState<any>();

  const [totalPrice, setTotalPrice] = React.useState<any>(
    invoice
      .map((item: any) => item.quantity * item.price)
      .reduce((acc: any, value: any) => acc + value)
      .toFixed(2)
  );
  console.log(auth);
  console.log(typeof invoice);
  console.log("INvoice", invoice);
  React.useEffect(() => {
    async function fetchData() {
      // You can await here
      const voucher = await orderApi.getVoucher();
      console.log("voucher", voucher);
      const objectShip = {
        from_district: Number(auth.profile.district_code),
        to_district: 1526,
      };
      const service = await orderApi.getService(objectShip);
      setService(service.data);
      console.log("service", service);
      setVoucher(voucher.data);
    }
    fetchData();
  }, []);
  const invoiceItems = [
    {
      qty: 1,
      price: 84.99,
      subtotal: 84.99,
      currency: "USD",
      name: "Gaming Headset",
    },
    {
      qty: 2,
      price: 99.99,
      subtotal: 199.98,
      currency: "USD",
      name: "Gaming Controller",
    },
    {
      qty: 1,
      price: 19.99,
      subtotal: 19.99,
      currency: "USD",
      name: "USB PowerPort",
    },
    {
      qty: 5,
      price: 5.08,
      subtotal: 25.4,
      currency: "USD",
      name: "Smartphone Screen Protector",
    },
    {
      qty: 3,
      price: 17.99,
      subtotal: 53.97,
      currency: "USD",
      name: "V-Neck T-Shirt",
    },
    {
      qty: 1,
      price: 33.96,
      subtotal: 33.96,
      currency: "USD",
      name: "Night Vision Binoculars",
    },
    {
      qty: 0,
      price: 8.49,
      subtotal: 0,
      currency: "USD",
      name: "USB Car Charger",
    },
    {
      qty: 1,
      price: 79.99,
      subtotal: 79.99,
      currency: "USD",
      name: "Car Dash Cam",
    },
    { qty: 0, price: 11.44, subtotal: 0, currency: "USD", name: "Sunglasses" },
    {
      qty: 1,
      price: 21.99,
      subtotal: 21.99,
      currency: "USD",
      name: "Leather Belt",
    },
  ];
  const handleChangeVoucher = (e: any) => {
    // let temp = Number(totalPrice);
    // if (e.target.value > 1) {
    //   temp = temp - Number(e.target.value);
    // } else {
    //   temp = temp * (1 - Number(e.target.value));
    // }
    // setTotalPrice(temp);
    setVoucherId(e.target.value);
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
      console.log(Number(rs.data.total));
      setTotalPrice(Number(totalPrice) + Number(rs.data.total));
      setFeeShip(Number(rs.data.total));
      setServiceId(e.target.value);
    });
  };
  const orderProduct = async () => {
    console.log("AUTH", invoice?.at(0)?.shopId);
    console.log("Service", service);
    console.log("voucherId", voucherId);
    console.log("serviceId", serviceId);
    console.log();
    const objectCall = {
      // shopId: "8dcc9380-95ed-4ec2-a43f-9e3eeae7d697",
      shopId: invoice?.at(0)?.shopId,
      address: `${auth.profile.address},${auth.profile.district},${auth.profile.ward},${auth.profile.province}`,
      toName: auth.profile.name,
      toPhone: auth.profile.phone_number,
      toStreet: auth.profile.address,
      toWardCode: auth.profile.ward_code,
      toDistrictId: auth.profile.district_code,
      serviceId: serviceId,
      voucherId: voucherId,
      items: invoice.map((item: any) => ({
        product_id: item.id,
        quantity: item.quantity,
      })),
    };
    await orderApi.createOrder(objectCall);
  };
  return (
    <WrapAll style={{ padding: 20 }}>
      <Container maxWidth="md">
        <Button> Quay lai </Button>

        <h2 style={{ textAlign: "center" }}>Invoice</h2>
        <Paper>
          <div>
            <b>Tên: {auth.profile.name} </b>{" "}
          </div>
          <div>
            <b>Địa chỉ: </b>{" "}
          </div>
          <div>
            <b>Email: </b> {auth.profile.email}
          </div>
          <div>
            {" "}
            <b>SDT: </b> {auth.profile.phone_number}
          </div>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{Object.keys(invoiceItems[0])[4]}</TableCell>
                  <TableCell align="right">
                    {Object.keys(invoiceItems[0])[0]}
                  </TableCell>
                  <TableCell align="right">
                    {Object.keys(invoiceItems[0])[1]}
                  </TableCell>
                  <TableCell align="right">
                    {Object.keys(invoiceItems[0])[2]}
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {invoice?.map((item: any) => {
                  return (
                    <TableRow key={item.name}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell align="right">{item.quantity} </TableCell>
                      <TableCell align="right"> {item.price} </TableCell>
                      <TableCell align="right">
                        {item.quantity * item.price}
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell align="left">
                    <InputLabel id="demo-simple-select-label">
                      Voucher{" "}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Age"
                      onChange={handleChangeVoucher}
                    >
                      {voucher?.map((item: any) => (
                        <MenuItem value={item.id}>{item.name}</MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell align="left">
                    <InputLabel id="demo-simple-select-label">
                      Service{" "}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Age"
                      onChange={getFeeShip}
                    >
                      {service?.map((item: any) => (
                        <MenuItem value={item?.service_id}>
                          {item.short_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Total Amount in EUR</strong>
                  </TableCell>

                  <TableCell align="right">{totalPrice}</TableCell>
                  <TableCell align="right">
                    <Button onClick={orderProduct}> Thanh toán </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </WrapAll>
  );
}
const WrapAll = styled.div``;
