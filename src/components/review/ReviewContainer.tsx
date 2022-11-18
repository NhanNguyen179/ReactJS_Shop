import { IReview, IReviewResponse } from "./Interface";
import { Box } from "@material-ui/core";
import ReviewItem from "./ReviewItem";
import Grid from "@mui/material/Grid";
import { amber, yellow } from "@mui/material/colors";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import orderApi from "../../api/orderApi";
import { Pagination } from "@mui/material";
import { Star } from "@material-ui/icons";

const buttons = [
  { id: 0, name: "Tất cả", value: 0 },
  { id: 1, name: "1 Sao", value: 1 },
  { id: 2, name: "2 Sao", value: 2 },
  { id: 3, name: "3 Sao", value: 3 },
  { id: 4, name: "4 Sao", value: 4 },
  { id: 5, name: "5 Sao", value: 5 },
];

export default function ReviewContainer(child: any) {
  const productId = child.productId;
  const [reviews, setReviews] = useState(() => {
    const temp = [] as Array<IReview>;
    return temp;
  });
  const [ratingSearch, setRatingSearch] = useState(0);
  const [page, setPage] = useState(1);
  const [totalRating, setTotalRating] = useState(0);
  const [numOfPage, setNumOfPage] = useState(1);

  useEffect(() => {
    async function fetch() {
      const response = await orderApi.getReviewByProductId(productId);
      const data = response.data as IReviewResponse;
      if (data) {
        const reviews = data.reviews as Array<IReview>;
        if (reviews != null) {
          setReviews(reviews);
        }
        setTotalRating(data.totalRating);
        setNumOfPage(data.numOfPage);
      }
    }
    fetch().then();
  }, []);

  useEffect(() => {
    async function fetch() {
      const response: any = await orderApi.getReviewByProductId(
        productId,
        ratingSearch
      );
      const data = response.data as IReviewResponse;
      if (data) {
        const reviews = data.reviews as Array<IReview>;
        if (reviews != null) {
          setReviews(reviews);
        }
        setTotalRating(data.totalRating);
        setNumOfPage(data.numOfPage);
      }
    }
    fetch().then();
  }, [page]);

  // handler
  const handlerRatingSearch = (rating: number) => {
    async function fetch() {
      const response = await orderApi.getReviewByProductId(productId, rating);
      if (response) {
        const data = response.data as IReviewResponse;
        if (data.reviews != null) {
          setReviews(data.reviews);
        }
      }
    }
    fetch().then();
    setRatingSearch(rating);
  };

  const handleChangePage = (e: any) => {
    setPage(e.value);
  };

  return (
    <Box mt={20}>
      <Grid
        container
        spacing={2}
        style={{
          backgroundColor: yellow[50],
          display: "flex",
          alignItems: "center",
        }}
      >
        <Grid item xs={2}>
          <h3 style={{ color: amber[900] }}>
            Đánh giá {totalRating}/5 <Star style={{ color: "yellow" }} />
          </h3>
        </Grid>
        <Grid item xs={10}>
          <Box>
            {buttons.map((button) => {
              return (
                <Button
                  variant="outlined"
                  key={button.id}
                  style={{ margin: "0px 5px" }}
                  onClick={(e) => handlerRatingSearch(button.value)}
                >
                  {button.name}
                </Button>
              );
            })}
          </Box>
        </Grid>
      </Grid>
      <Box>
        {reviews.map((review) => {
          return <ReviewItem key={review.id} {...review}></ReviewItem>;
        })}
      </Box>
      <Box
        mt={10}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pagination
          count={numOfPage}
          defaultPage={1}
          color={"primary"}
          variant="outlined"
          onChange={(e) => handleChangePage(e)}
        />
      </Box>
    </Box>
  );
}
