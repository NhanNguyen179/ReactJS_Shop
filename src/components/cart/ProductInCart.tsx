import { useContext } from "react";
import { AppContext } from "../../context/Context";
import ShopCart from "./ShopCart";

const ProductInCart = () => {
  const { state } = useContext(AppContext);
  const arrayShopId = [];
  for (let item of state.products) {
    arrayShopId.push(item.shopId);
  }
  const uniqueShopId = [...new Set(arrayShopId)];
  return (
    <div>
      {uniqueShopId?.map((shopIdUnique) => {
        const itemInProduct = state.products.filter(
          (item) => item.shopId === shopIdUnique
        );
        return (
          <ShopCart listProductShop={itemInProduct} shopId={shopIdUnique} />
        );
      })}
    </div>
  );
};

export default ProductInCart;
