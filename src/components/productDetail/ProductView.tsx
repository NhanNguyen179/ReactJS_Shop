import { useState, useContext } from "react";
import * as React from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/Context";
import { Types } from "../../context/Reducers";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grid from "@material-ui/core/Grid";
import NotFoundPage from "../NotFoundPage";
import ImageView from "./ImageView";
import DescriptionView from "./DescriptionView";
import productFunction from "../../api/productFunction";
import ReviewContainer from "../review/ReviewContainer";
import { Container } from "@material-ui/core";
import Loading from "../Loading";

type Params = {
  productId: string;
};

export default function ProductView() {
  const { productId } = useParams<Params>();
  const [product, setProduct] = React.useState<any>();
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const respone: any = await productFunction.getDetailProduct(productId);
      setProduct(respone);
      setLoading(false);
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
        image: product.imageUrl,
        quantity: quantityState.quantity,
        button: false,
        previousQuantity: quantityState.quantity,
        currentQuantity: quantityState.quantity,
        category: product.category,
        shopId: product.shop.id,
        shopName: product.shop.name,
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

  if (loading) return <Loading />;

  if (product && isMobile) {
    return (
      <Container fixed>
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
      </Container>
    );
  } else if (product && !isMobile) {
    return (
      <Container fixed>
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
              image={product?.imageUrl}
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
        <ReviewContainer productId={"8dcc9380-95ed-4ec2-a43f-9e3eeae7d612"} />
      </Container>
    );
  } else {
    return (
      <div style={{ maxWidth: "1280px", margin: "0px auto" }}>
        <NotFoundPage />
      </div>
    );
  }
}
