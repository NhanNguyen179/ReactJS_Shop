import { Avatar, Container, Grid, Rating } from "@mui/material";
import { yellow } from "@mui/material/colors";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Box } from "@material-ui/core";
import StarIcon from "@mui/icons-material/Star";
import TextField from "@mui/material/TextField";
import { Label } from "@material-ui/icons";
import Link from "@mui/material/Link";
import { IReview } from "./Interface";
import { useState } from "react";
import util from "../order/util";

export default function ReviewItem(review: IReview) {
  return (
    <Box
      mt={4}
      style={{ width: "100%", boxShadow: "rgba(0, 0, 0, 0.2) 1px 1px 4px" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={2} style={{ textAlign: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Avatar
              sx={{ width: 50, height: 50 }}
              src={review.customer.avatar}
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <Link
              href={"https://gateway.loca.it/user/" + review.customer.id}
              style={{
                border: "none",
                fontSize: "10px",
                width: "100%",
                textAlign: "center",
                textDecoration: "none",
              }}
            >
              {review.customer.name}
            </Link>
          </div>
        </Grid>
        <Grid item xs={10}>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <Rating
              name="text-feedback"
              value={review.rating}
              readOnly
              precision={0.5}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
            <span style={{ marginLeft: "20px" }}>
              {util.getFormattedDate(new Date(review.updatedAt))}
            </span>
          </Box>
          <Box>
            <p style={{ fontSize: "16px" }}>{review.content}</p>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
