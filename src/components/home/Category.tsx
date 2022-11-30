import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import productFunction from "../../api/productFunction";
import * as React from "react";
import Slider from "react-slick";
import Container from "@material-ui/core/Container";
import Loading from "../Loading";

const useStyles = makeStyles((theme) => ({
  card: {
    textAlign: "center",
    margin: "0% 5% 5% 5%",
    borderRadius: "10px",
  },
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
  },
  baner: {
    width: "100%",
    overflow: "hidden",
    borderRadius: "20px",
    margin: "5% 0 5% 0",
    maxHeight: "200px",
    objectFit: "cover",
    [theme.breakpoints.down("sm")]: {
      margin: "10% 0 10% 0",
    },
  },
  categoryName: {
    fontSize: "1rem",
    height: "2rem",
  },
}));

const settings = {
  className: "center",
  infinite: false,
  dots: true,
  slidesToShow: 5,
  speed: 600,
  rows: 2,
  slidesPerRow: 1,
  slidesToScroll: 3,
  overflow: "initial",
  arrows: true,
  adaptiveHeight: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
  ],
};

export default function Home() {
  const classes = useStyles();
  const [categories, setCategories] = React.useState<any>();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const categories: any = await productFunction.getCategories();
      setCategories(categories);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <Container fixed>
      <img
        className={classes.baner}
        alt=""
        src="https://images.unsplash.com/photo-1628271093159-6e186bc0d973?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx"
      />
      <div className={classes.container}>
        <div className={classes.header}>Danh mục nổi bật</div>
        {loading ? (
          <Loading />
        ) : (
          <Slider {...settings}>
            {categories?.map((item: any, index: any) => (
              <div key={item.id}>
                <Card className={classes.card}>
                  <CardActionArea>
                    <NavLink to={`/m/products?categoryId=${item.id}`}>
                      <CardMedia
                        component="img"
                        alt="CategoryImage"
                        image={`${process.env.REACT_APP_API_BASE_URl_IMAGE}${item.imageUrl}`}
                        loading="lazy"
                      />
                      <CardContent>
                        <Typography
                          gutterBottom
                          component="p"
                          className={classes.categoryName}
                        >
                          {item.name}
                        </Typography>
                      </CardContent>
                    </NavLink>
                  </CardActionArea>
                </Card>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </Container>
  );
}
