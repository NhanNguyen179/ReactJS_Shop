import React, { useState } from "react";
import ProductList from "../products/ProductList";
import productFunction from "../../api/productFunction";
import { Container, makeStyles } from "@material-ui/core";
import NoResultPage from "../NoResultPage";
import Loading from "../Loading";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  header: {
    fontFamily: "Roboto, sans-serif",
    color: "#rgba(0,0,0,.54)",
    textAlign: "center",
    fontSize: "1.5rem",
    padding: "20px 2% 20px 2%",
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    margin: "5% 0 5% 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      margin: "10% 0 10% 0",
    },
  },
  more: {
    fontFamily: "Montserrat, sans-serif",
    display: " inline-block",
    fontWeight: 700,
    textDecoration: "none",
    color: "#fff",
    textTransform: "uppercase",
    padding: "13px 23px",
    background: "#FFA500",
    fontSize: " 18px",
    transition: "0.2s all",
    margin: "20px 0 20px 0",
    borderRadius: "10px",
    "@media only screen and (max-width: 480px)": {
      padding: "7px 15px",
      fontSize: "14px",
    },
    "&:hover": {
      color: "#FFA500",
      background: "#211b19",
    },
  },
}));

export default function HomeProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const classes = useStyles();

  React.useEffect(() => {
    setLoading(true);
    const fetch = async () => {
      setLoading(true);
      const respone: any = await productFunction.getProducts();
      setProducts(respone.data);
      setLoading(false);
    };
    fetch().then(() => setLoading(false));
  }, []);

  return (
    <Container fixed>
      <div className={classes.container}>
        <div className={classes.header}>Sản phẩm nổi bật</div>
        {loading ? (
          <Loading />
        ) : products.length === 0 ? (
          <NoResultPage />
        ) : (
          <ProductList products={products} />
        )}
        <NavLink className={classes.more} to={`/products`}>
          Xem thêm
        </NavLink>
      </div>
    </Container>
  );
}
