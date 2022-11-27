import { useContext } from "react";
import { AppContext } from "../../context/Context";
import NoProductInCart from "./NoProductInCart";
import ProductInCart from "./ProductInCart";
import CartContainer from "./CartContainer";

const Cart = () => {
  const { state } = useContext(AppContext);
  const CartContents = () => {
    if (state.products[0] == null) {
      return <NoProductInCart />;
    } else {
      return (
        <div>
          <ProductInCart />
          <hr />
          {/* <div className="total-in-cart">
            <TotalInCart />
            <ContinueShoppingButton />
          </div> */}
        </div>
      );
    }
  };

  return (
    <CartContainer>
      <CartContents />
    </CartContainer>
  );
};

export default Cart;
