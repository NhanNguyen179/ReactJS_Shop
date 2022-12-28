import { NavLink } from "react-router-dom";
import { CustomButton } from "../common/CustomButton";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";

const NoProductInCart = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h3>Không có sản phẩm trong giỏ hàng</h3>
      <div style={{ maxWidth: "270px" }}>
        <NavLink to="/">
          <CustomButton>
            <KeyboardReturnIcon />
            Tiếp tục mua sắm
          </CustomButton>
        </NavLink>
      </div>
    </div>
  );
};

export default NoProductInCart;
