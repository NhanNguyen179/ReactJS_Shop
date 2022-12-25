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
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer, toast } from 'react-toastify';

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
      try {
        const respone: any = await productFunction.getDetailProduct(productId);
        setProduct(respone);

        setQuantityState({
          quantity: respone.quantity,
          name: respone.name,
        });
      } catch {
        setLoading(false);
      }
      setLoading(false);
    };
    fetch();
  }, [productId]);
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
    toast.success(`Đã thêm sản phẩm ${product.name} vào giỏ hàng!`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
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

  if (product !== undefined) {
    if (isMobile) {
      return (
        <Container
          fixed
          style={{ marginTop: "100px", backgroundColor: "white" }}
        >
          <ImageView
            category={product?.category}
            images={product?.imageUrl.map((item: any) => {
              return {
                original: `${process.env.REACT_APP_API_BASE_URl_IMAGE}/${item}`,
                thumbnail: `${process.env.REACT_APP_API_BASE_URl_IMAGE}/${item}`,
              };
            })}
            name={product?.name}
          />
          <DescriptionView
            name={product?.name}
            description={product?.description}
            price={product?.price}
            id={product?.id}
            quantityState={quantityState}
            setQuantityState={setQuantityState}
            quantity={product.quantity}
            options={product?.options.map((item: any) => {
              return {
                id: item.id,
                name: item.option,
                choices: item.name,
              };
            })}
            AddProduct={AddProduct}
          />
        </Container>
      );
    } else {
      return (
        
        <Container
          fixed
          style={{
            marginTop: "100px",
            backgroundColor: "white",
            borderRadius: "10px",
          }}
          maxWidth="lg"
        >
           <ToastContainer />
          <Grid
            container
            style={{
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Grid item xs={12} sm={6} style={{ flexBasis: "45%" }}>
              <ImageView
                category={product?.category}
                images={product?.imageUrl.map((item: any) => {
                  return {
                    original: `${process.env.REACT_APP_API_BASE_URl_IMAGE}/${item}`,
                    thumbnail: `${process.env.REACT_APP_API_BASE_URl_IMAGE}/${item}`,
                  };
                })}
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
                quantity={product.quantity}
                options={product?.options.map((item: any) => {
                  return {
                    id: item.id,
                    name: item.option,
                    choices: item.name,
                  };
                })}
                AddProduct={AddProduct}
              />
            </Grid>
          </Grid>
          <ReviewContainer productId={productId} />
        </Container>
      );
    }
  } else {
    return (
      <div style={{ maxWidth: "1280px", margin: "0px auto" }}>
        <NotFoundPage />
      </div>
    );
  }
}
