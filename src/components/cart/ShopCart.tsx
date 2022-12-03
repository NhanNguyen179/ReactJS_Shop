import { Grid, useMediaQuery } from "@material-ui/core";
import { useContext } from "react";
import { AppContext } from "../../context/Context";
import EachItemInCartBiggerScreen from "../cart/EachItemInCartBiggerScreen";
import EachItemInCartMobile from "../cart/EachItemInCartMobile";
import { Types } from "../../context/Reducers";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { CustomButton } from "../common/CustomButton";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
type Props = {
  shopId?: string;
  listProductShop?: any;
  shopName?: string;
};
const ShopCart = ({ shopId, listProductShop, shopName }: Props) => {
  const isMobile = useMediaQuery("(max-width:599px)");
  const history = useHistory();
  const { dispatch, setInvoice } = useContext(AppContext);
  const handleChangeQuantity_TextField = (id: string, payload: string) => {
    dispatch({
      type: Types.QuantityChange_TextField,
      payload: { id, quantity: payload },
    });
  };

  const handleUpdateQuantity_TextField = (
    id: string,
    quantity: string,
    price: number
  ) => {
    dispatch({
      type: Types.QuantitySet_TextField,
      payload: { id, quantity },
    });
    dispatch({
      type: Types.TotalQuantitySet_TextField,
      payload: { id, quantity },
    });
    dispatch({
      type: Types.SubTotalSet_TextField,
      payload: { id, price, quantity },
    });
    dispatch({
      type: Types.PreviousQuantitySet,
      payload: { id, quantity },
    });
    if (quantity === "0") {
      deleteProduct(id, quantity, price);
    }
  };

  const handleUpdateQuantity_DropDown = (
    id: string,
    quantity: string,
    price: number,
    payload: unknown
  ) => {
    dispatch({
      type: Types.QuantitySet_DropDown,
      payload: { id, quantity: payload },
    });
    dispatch({
      type: Types.TotalQuantitySet_DropDown,
      payload: { id, quantity },
    });
    dispatch({
      type: Types.SubTotalSet_DropDown,
      payload: { id, price, quantity },
    });
    dispatch({
      type: Types.PreviousQuantitySet,
      payload: { id, quantity },
    });
    if (payload === "0") {
      deleteProduct(id, payload, price);
    }
  };

  const deleteProduct = (id: string, quantity: string, price: number) => {
    dispatch({
      type: Types.Delete,
      payload: { id },
    });
    dispatch({
      type: Types.Decrease,
      payload: { quantity },
    });
    dispatch({
      type: Types.SubTotalDecrease,
      payload: { price, quantity },
    });
  };
  const payItem = () => {
    setInvoice(listProductShop);
    history.push("/m/bill");
  };
  return (
    <>
      <WrapShopCardItem>
        <Grid container>
          <Grid
            item
            xs={1}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "3.75rem",
              boxSizing: "border-box",
            }}
          >
            <AddBusinessIcon />
            {isMobile ? "" : "Cửa hàng:"}
          </Grid>
          <Grid
            item
            xs={5}
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "1rem",
            }}
          >
            {listProductShop[0].shopName}
          </Grid>
        </Grid>
        {listProductShop?.map((productInCart: any) => (
          <div key={productInCart.id}>
            {isMobile ? (
              <EachItemInCartMobile
                category={productInCart.category}
                id={productInCart.id}
                image={productInCart.image}
                quantity={productInCart.quantity}
                price={productInCart.price}
                name={productInCart.name}
                currentQuantity={productInCart.currentQuantity}
                button={productInCart.button}
                handleChangeQuantity_TextField={handleChangeQuantity_TextField}
                handleUpdateQuantity_TextField={handleUpdateQuantity_TextField}
                handleUpdateQuantity_DropDown={handleUpdateQuantity_DropDown}
                deleteProduct={deleteProduct}
                shopId={productInCart.shopId}
              />
            ) : (
              <EachItemInCartBiggerScreen
                category={productInCart.category}
                id={productInCart.id}
                image={productInCart.image}
                quantity={productInCart.quantity}
                price={productInCart.price}
                name={productInCart.name}
                currentQuantity={productInCart.currentQuantity}
                button={productInCart.button}
                handleChangeQuantity_TextField={handleChangeQuantity_TextField}
                handleUpdateQuantity_TextField={handleUpdateQuantity_TextField}
                handleUpdateQuantity_DropDown={handleUpdateQuantity_DropDown}
                deleteProduct={deleteProduct}
                shopId={productInCart.shopId}
              />
            )}
          </div>
        ))}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <CustomButton fullWidth={isMobile ? true : false} onClick={payItem}>
            Thanh toán
          </CustomButton>
        </div>
      </WrapShopCardItem>
    </>
  );
};
export default ShopCart;
const WrapShopCardItem = styled.div`
  background: #fff;
  margin-top: 10px;
  border-radius: 0.125rem;
  box-shadow: 0 1px 1px 0 rgb(0 0 0 / 5%);
  margin-bottom: 0.9375rem;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
  padding: 1rem;
`;
