import { NavLink } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles } from "@material-ui/core";

type eachItemProps = {
  id?: string;
  name?: string;
  image?: string;
  price?: number;
};
const useStyles = makeStyles((theme) => ({
  card: {
    borderRadius: "10px",
    transition: "0.3s",
    "&:hover": {
      "& img": {
        transform: "scale(1.1)",
      },
      backgroundColor: "gray",
    },
  },

  media: {
    height: "200px",
    width: "100%",
    objectFit: "cover",
    transition: "0.3s",
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

export default function ProductListContainer({
  id,
  name,
  image,
  price,
}: eachItemProps) {
  const isMobile = useMediaQuery("(max-width:599px)");
  const isfrom959px = useMediaQuery("(min-width:960px)");
  const isto1279px = useMediaQuery("(max-width:1279px)");
  const styles = useStyles();
  return (
    <Grid
      item
      style={
        isMobile
          ? { flexBasis: "48%", marginBottom: "20px" }
          : isfrom959px
          ? { flexBasis: "22%", margin: "1.5%" }
          : isto1279px
          ? { flexBasis: "31%", margin: "1.16%" }
          : { flexBasis: "80%", margin: "0%" }
      }
    >
      <NavLink to={`/product/${id}`}>
        <Card className={styles.card}>
          <CardMedia
            component="img"
            alt={`${name}`}
            image={` ${process.env.REACT_APP_API_BASE_URl_IMAGE}/${image}`}
            title={`${name}`}
            className={styles.media}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className={styles.name}
            >
              {name}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={styles.price}
            >
              {price} đ
            </Typography>
          </CardContent>
        </Card>
      </NavLink>
    </Grid>
  );
}
