import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  Rating,
  Switch,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import orderApi from "../../api/orderApi";
import {
  INextActionResponse,
  IOrderDetail,
  IReviewCreatePayload,
  IReviewOrder,
} from "./interface";
import Link from "@mui/material/Link";
import util from "./util";
import { amber, cyan, grey, red } from "@mui/material/colors";
import OrderItem from "./OrderItem";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { Star } from "@material-ui/icons";
import StarIcon from "@mui/icons-material/Star";
import constant from "./constant";

export default function OrderDetail(child: any) {
  const orderId = child.orderId as string;
  const refReviewContent = useRef<any>(null);
  const [order, setOrder] = useState<IOrderDetail | null>(null);
  const [review, setReview] = useState<IReviewOrder | null>({
    rating: 0,
    content: "",
  } as IReviewOrder);
  const [enableReview, setEnableReview] = useState<boolean>(false);

  // loading
  const [orderLoading, setOrderLoading] = useState<boolean>(false);
  const [reviewLoading, setReviewLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetch() {
      try {
        setOrderLoading((p) => true);
        const response1 = await orderApi.detailOrderById(orderId);
        setOrderLoading((p) => false);
        if (response1.data) {
          const data = response1.data as IOrderDetail;
          setOrder(data);
        }

        // get review
        setReviewLoading((p) => true);
        orderApi.getReviewByOrderId(orderId).then((response) => {
          setReviewLoading((p) => false);
          if (response.data) {
            const data = response.data as IReviewOrder;
            setReview(data);
            setEnableReview(false);
          } else {
            setReview({ rating: 0, content: "" } as IReviewOrder);
          }
        });
      } catch (err) {
        setOrderLoading((p) => false);
        setReviewLoading((p) => false);
      }
    }
    fetch().then();
  }, [orderId]);

  const handleEnabelReviewChange = (e: any) => {
    console.log(e.target.checked);
    if (e.target.checked) {
      setEnableReview(true);
    } else {
      setEnableReview(false);
    }
  };
  const handleReviewContentChange = (e: any) => {
    setReview((prevState) => {
      return {
        ...prevState,
        content: refReviewContent.current.value,
      } as IReviewOrder;
    });
    console.log(review);
  };
  const handleChangeRating = (e: any, value: number | null) => {
    if (value) {
      setReview((prevState) => {
        return {
          ...prevState,
          rating: value,
        } as IReviewOrder;
      });
    }
    console.log(review);
  };

  const handleSubmitReview = () => {
    const payload = {
      order: orderId,
      content: review?.content,
      rating: review?.rating,
    } as IReviewCreatePayload;

    if (review?.id) {
      orderApi
        .updateReview(review)
        .then((res) => {
          // get review
          setReviewLoading((p) => true);
          orderApi.getReviewByOrderId(orderId).then((response) => {
            if (response.data) {
              const data = response.data as IReviewOrder;
              setReview(data);
              setEnableReview(false);
              setReviewLoading((p) => false);
            }
          });
        })
        .catch((err) => setReviewLoading((p) => false));
    } else {
      orderApi
        .createReview(payload)
        .then((res) => {
          setReviewLoading((p) => true);
          orderApi.getReviewByOrderId(orderId).then((response) => {
            if (response.data) {
              const data = response.data as IReviewOrder;
              setReview(data);
              setEnableReview(false);
              setReviewLoading((p) => false);
            }
          });
        })
        .catch((err) => setReviewLoading((p) => false));
    }
  };

  return (
    <Box
      mt={5}
      style={{
        minHeight: "100px",
        backgroundColor: "white",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
      }}
    >
      <Box style={{ padding: "20px" }}>
        {/*header*/}
        <Box
          style={{
            padding: "20px 0",
            cursor: "pointer",
            borderBottom: "1px solid",
            borderColor: grey[300],
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <div style={{ display: "flex", alignItems: "center" }}>
              <h3>Chi tiết đơn hàng</h3>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <StorefrontIcon />
              <h3 style={{ color: amber[900], margin: "0 10px" }}>Cửa hàng </h3>
              <Link>{order?.shop.name}</Link>
            </div>
          </Box>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p style={{ marginRight: "3px", color: cyan[400] }}>
              {util.getNameStatusByValue(order?.status)}
            </p>
            {review?.id ? (
              <p style={{ color: amber[900] }}>
                <span style={{ marginRight: "3px" }}>|</span>Đã đánh giá
              </p>
            ) : (
              <></>
            )}
          </Box>
        </Box>
        {/*body*/}
        <Box>
          {order?.items.map((item) => {
            return <OrderItem key={item.id} item={item}></OrderItem>;
          })}
        </Box>
        {/*footer*/}
        <Box mt={5}>
          <Grid container>
            <Grid xs={8}>
              <Box>
                <label
                  style={{ fontWeight: "bold", color: amber[900] }}
                  htmlFor={"address"}
                >
                  Địa chỉ nhận hàng
                </label>
                <p id={"address"}>{order?.address}</p>
              </Box>

              {order?.status == constant.status.completed.value ? (
                <>
                  <Box>
                    <label
                      htmlFor={"reviewEnable"}
                      style={{ color: amber[900] }}
                    >
                      Mở đánh giá
                    </label>
                    <Switch
                      id={"reviewEnable"}
                      checked={enableReview}
                      onChange={(e) => handleEnabelReviewChange(e)}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </Box>
                  <Box
                    sx={
                      enableReview ? { display: "block" } : { display: "none" }
                    }
                  >
                    {reviewLoading ? (
                      <CircularProgress />
                    ) : (
                      <FormControl style={{ width: "80%" }}>
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <label htmlFor={"contentReview"}>
                            Nội dung đánh giá{" "}
                          </label>
                          <textarea
                            rows={10}
                            ref={refReviewContent}
                            style={{
                              resize: "none",
                              columns: 30,
                              maxHeight: 300,
                            }}
                            id={"contentReview"}
                            value={review ? review.content : ""}
                            onChange={(e) => handleReviewContentChange(e)}
                          />
                          <br />
                          <label htmlFor={"ratingReview"}>Xếp hạng </label>
                          <div style={{ width: "100%", textAlign: "center" }}>
                            <Rating
                              size={"large"}
                              id={"ratingReview"}
                              value={review?.rating}
                              onChange={(e, value) =>
                                handleChangeRating(e, value)
                              }
                            />
                          </div>
                          <Button
                            onClick={(e) => handleSubmitReview()}
                            style={{
                              backgroundColor: amber[900],
                              color: "white",
                            }}
                          >
                            Đánh giá
                          </Button>
                        </div>
                      </FormControl>
                    )}
                  </Box>
                </>
              ) : (
                <></>
              )}
            </Grid>
            <Grid xs={4}>
              <Grid container>
                <Grid item xs={6}>
                  <p>Tổng tiền</p>
                </Grid>
                <Grid item xs={6}>
                  <p> {util.convertToMoneyString(order?.totalPrice)}</p>
                </Grid>
                <Grid item xs={6}>
                  <p>Phí vận chuyển</p>
                </Grid>
                <Grid item xs={6}>
                  <p>{util.convertToMoneyString(order?.deliveryFee)}</p>
                </Grid>
                <Grid item xs={6}>
                  <p>Giảm giá</p>
                </Grid>
                <Grid item xs={6}>
                  <p>- {util.convertToMoneyString(order?.totalDiscount)}</p>
                </Grid>
                <Grid item xs={6}>
                  <p>Tiền phải thanh toán</p>
                </Grid>
                <Grid item xs={6}>
                  <p style={{ color: red[700] }}>
                    {util.convertToMoneyString(order?.total)}
                  </p>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
