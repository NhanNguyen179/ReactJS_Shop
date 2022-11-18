import React from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { CustomButton } from "../common/CustomButton";

type AddToCartButtonProps = {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
};

export default function AddToCartButton({ onClick }: AddToCartButtonProps) {
  return (
    <div className="add-to-cart-button">
      <CustomButton onClick={onClick}>
        <ShoppingCartIcon
          className="add-to-cart-button-icon"
          style={{ fontSize: "26px" }}
        />
        Thêm vào giỏ hàng
      </CustomButton>
    </div>
  );
}
