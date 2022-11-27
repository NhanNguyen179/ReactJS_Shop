import React from "react";
import { NavLink } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { CustomButton } from "../common/CustomButton";

type GoToCartButtonProps = {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
};

export default function GoToCartButton({ onClick }: GoToCartButtonProps) {
  return (
    <div className="go-to-cart-button">
      <NavLink to="/m/cart">
        <CustomButton onClick={onClick} fullWidth>
          <ShoppingCartIcon
            className="add-to-cart-button-icon-in-cart-preview"
            style={{ fontSize: "26px" }}
          />
          Xem giỏ hàng
        </CustomButton>
      </NavLink>
    </div>
  );
}
