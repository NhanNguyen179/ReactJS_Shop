import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../context/Context";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { useStyles } from "./NavigationItemStyles";
import NoResult from "../../img/Card/NoResult.png";
import util from "../order/util";

type CartPreviewContentsProps = {
  onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

const CartPreviewContentsSwitch = ({ onClick }: CartPreviewContentsProps) => {
  const classes = useStyles();

  const { state } = useContext(AppContext);

  console.log(state.products);

  if (state.products[0] == null) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img src={NoResult} alt="NoResult" />
        <div>Không có sản phẩm</div>
      </div>
    );
  } else {
    return (
      <div>
        {state.products.map((productInCart) => (
          <Card
            style={{
              display: "flex",
              boxShadow: "none",
              borderRadius: "5px",
              overflow: "hidden",
              margin: "10px 0",
              padding: "10px",
              border: "1px solid #e0e0e0",
            }}
            key={productInCart.id}
          >
            <NavLink to={`/product/${productInCart.id}`} onClick={onClick}>
              <CardMedia
                className={classes.cover}
                image={`${process.env.REACT_APP_API_BASE_URl_IMAGE}/${productInCart.image[0]}`}
                title="Product"
              />
            </NavLink>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <div>
                  <div className="product-name-in-cart-preview">
                    {productInCart.name}
                  </div>
                  <div className="sub-info-in-cart-preview">
                    {util.convertToMoneyString(productInCart.price)}
                  </div>
                  <div className="sub-info-in-cart-preview">
                    Số lượng: {productInCart.quantity}
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    );
  }
};

export default CartPreviewContentsSwitch;
