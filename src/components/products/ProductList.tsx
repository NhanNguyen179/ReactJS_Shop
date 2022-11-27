import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "20px 0",
  },
  item: {
    boxSizing: "border-box",
    "&:hover": {
      "& img": {
        transform: "scale(1.1)",
      },
      borderRadius: "10px",
      backgroundColor: "#FFA500",
    },
    padding: "0.3125rem",
  },
  card: {
    borderRadius: "10px",
    transition: "0.3s",
  },

  media: {
    height: "200px",
    width: "100%",
    objectFit: "cover",
    transition: "0.3s",
    [theme.breakpoints.down("sm")]: {
      height: "150px",
    },
    [theme.breakpoints.down("md")]: {
      height: "180px",
    },
  },
  name: {
    fontSize: "1rem",
    height: "2rem",
    textOverflow: "ellipsis",
  },
  price: {
    color: "#FFA500",
    padding: "0.5rem 0",
  },
}));

const ProductList = ({ products }: any) => {
  const styles = useStyles();
  return (
    <Grid container className={styles.container}>
      {products.map((product: any) => (
        <Grid
          key={product.id}
          item
          xs={6}
          sm={4}
          md={3}
          lg={2}
          className={styles.item}
        >
          <NavLink to={`/m/product/${product.id}`}>
            <Card className={styles.card}>
              <CardMedia
                component="img"
                alt={`${product.name}`}
                image={` ${process.env.REACT_APP_API_BASE_URl_IMAGE}/${product.imageUrl}`}
                title={`${product.name}`}
                className={styles.media}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  className={styles.name}
                >
                  {product.name}
                </Typography>
                <Typography
                  color="textSecondary"
                  component="p"
                  className={styles.price}
                >
                  {product.price} đ
                </Typography>
              </CardContent>
            </Card>
          </NavLink>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
