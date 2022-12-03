import { Card, Container, Grid, useMediaQuery } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../context/Context";
import NoProductInCart from "../cart/NoProductInCart";
import ShopCart from "./ShopCart";

export const CardInfo = () => {
  const { state } = useContext(AppContext);
  const isMobile = useMediaQuery("(max-width:599px)");

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
      {isMobile || (
        <Card
          style={{
            height: "55px",
            borderRadius: "3px",
            boxShadow: "0 1px 1px 0 rgb(0 0 0 / 5%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid container style={{ padding: "1rem" }}>
            <Grid item xs={1}></Grid>
            <Grid item xs={5}>
              Sản phẩm
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={3}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Đơn giá
                </Grid>
                <Grid
                  item
                  xs={3}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Số lượng
                </Grid>
                <Grid
                  item
                  xs={3}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Thành tiền
                </Grid>
                <Grid
                  item
                  xs={3}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Thao tác
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      )}

      {uniqueShopId?.map((shopIdUnique) => {
        const itemInProduct = state.products.filter(
          (item) => item.shopId === shopIdUnique
        );
        return (
          <ShopCart
            key={shopIdUnique}
            listProductShop={itemInProduct}
            shopId={shopIdUnique}
          />
        );
      })}
    </Container>
  );
};
