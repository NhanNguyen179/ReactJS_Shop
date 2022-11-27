import React from "react";
import { NavLink } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Button } from "@mui/material";

type GoToCartButtonProps = {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
};

export default function GoToCartButton({ onClick }: GoToCartButtonProps) {
  return (
    <div className="go-to-cart-button">
      <NavLink to="/m/cart">
        <Button onClick={onClick} variant="contained" color="primary">
          <ShoppingCartIcon
            className="add-to-cart-button-icon-in-cart-preview"
            style={{ fontSize: "26px" }}
          />
          View Cart
        </Button>
      </NavLink>
    </div>
  );
}
