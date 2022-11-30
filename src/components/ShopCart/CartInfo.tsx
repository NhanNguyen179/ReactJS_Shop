import { Card, Container, Grid } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../context/Context";
import NoProductInCart from "../cart/NoProductInCart";
import { CardProductInfo } from "./CartProductInfo";

export const CardInfo = () => {
  const { state } = useContext(AppContext);

  const arrayShopId = [];
  for (let item of state.products) {
    arrayShopId.push(item.shopId);
  }
  const uniqueShopId = [...new Set(arrayShopId)];

  if (state.products[0] == null) {
    return (
      <Container fixed style={{ marginTop: "120px" }}>
        <NoProductInCart />
      </Container>
    );
  }
  return (
    <Container fixed style={{ marginTop: "120px" }}>
      <Card
        style={{
          height: "55px",
          borderRadius: "3px",
          boxShadow: "0 1px 1px 0 rgb(0 0 0 / 5%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 10px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            Tên sản phẩm
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                Đơn giá
              </Grid>
              <Grid item xs={4}>
                Số lượng
              </Grid>
              <Grid item xs={4}>
                Thành tiền
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
      {uniqueShopId?.map((shopIdUnique) => {
        const itemInProduct = state.products.filter(
          (item) => item.shopId === shopIdUnique
        );
        return (
          <CardProductInfo Product={itemInProduct} shopId={shopIdUnique} />
        );
      })}
    </Container>
  );
};
