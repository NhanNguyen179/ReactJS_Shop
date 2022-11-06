import { useState, useContext } from "react";
import * as React from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/Context";
import { Types } from "../../context/Reducers";
import { ProductData } from "../../data/ProductData";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grid from "@material-ui/core/Grid";
import NotFoundPage from "../NotFoundPage";
import ProductViewContainer from "./ProductViewContainer";
import ImageView from "./ImageView";
import DescriptionView from "./DescriptionView";
import orderApi from "../../api/orderApi";
import productFunction from "../../api/productFunction";

type Params = {
  productId: string;
};

export default function ProductView() {
  const { productId } = useParams<Params>();
  const [reviews, setReviews] = React.useState<any>();
  const [product, setProduct] = React.useState<any>();
  React.useEffect(() => {
    // Update the document title using the browser API
    const fetch = async () => {
      const respone: any = await productFunction.getDetailProduct(productId);
      setProduct(respone);
    };
    fetch();
  }, []);
  const isMobile = useMediaQuery("(max-width:599px)");

  const { dispatch } = useContext(AppContext);

  const AddProduct = () => {
    dispatch({
      type: Types.Add,
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantityState.quantity,
        button: false,
        previousQuantity: quantityState.quantity,
        currentQuantity: quantityState.quantity,
        category: product.category,
        shopId: product.shop.id,
      },
    });
    dispatch({
      type: Types.Increase,
      payload: {
        quantity: quantityState.quantity,
      },
    });
    dispatch({
      type: Types.SubTotalIncrease,
      payload: {
        price: product.price,
        quantity: quantityState.quantity,
      },
    });
  };

  const [quantityState, setQuantityState] = useState<{
    quantity: string;
    name: string;
  }>({
    quantity: "1",
    name: "quantity",
  });

  if (product && isMobile) {
    return (
      <ProductViewContainer>
        <ImageView
          category={product?.category}
          image={product?.imageUrl}
          name={product?.name}
        />
        <DescriptionView
          name={product?.name}
          description={product?.description}
          price={product?.price}
          id={product?.id}
          quantityState={quantityState}
          setQuantityState={setQuantityState}
          quantity={quantityState.quantity}
          AddProduct={AddProduct}
        />
      </ProductViewContainer>
    );
  } else if (product && !isMobile) {
    return (
      <ProductViewContainer>
        <Grid
          container
          style={{
            justifyContent: "space-between",
            width: "100%",
            margin: "0px auto",
          }}
        >
          <Grid item xs={12} sm={6} style={{ flexBasis: "45%" }}>
            <ImageView
              category={product?.category}
              image={product?.image}
              name={product?.name}
            />
          </Grid>
          <Grid item xs={12} sm={6} style={{ flexBasis: "55%" }}>
            <DescriptionView
              name={product?.name}
              description={product?.description}
              price={product?.price}
              id={product?.id}
              quantityState={quantityState}
              setQuantityState={setQuantityState}
              quantity={quantityState.quantity}
              AddProduct={AddProduct}
            />
          </Grid>
        </Grid>
      </ProductViewContainer>
    );
  } else {
    return (
      <div style={{ maxWidth: "1280px", margin: "0px auto" }}>
        <NotFoundPage />
      </div>
    );
  }
}
