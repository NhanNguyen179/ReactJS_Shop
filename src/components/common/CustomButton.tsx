import styled from "styled-components";
import Button from "@mui/material/Button";

export const CustomButton = styled(Button)({
  fontFamily: "Montserrat, sans-serif",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
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
    "& svg": {
      color: "#FFA500",
    },
  },
});
