import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { CustomTextField } from "../../../components/common/CustomTextField";
import { Grid, TextField } from "@material-ui/core";
import Value from "../../../components/Value";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddVoucher() {
  return (
    <>
      <Box sx={style}>
        <Value value="Thêm voucher" size="24px" color="gray"></Value>
        <Grid item xs={12}>
          <CustomTextField
            margin="normal"
            id="name"
            label="Tên"
            fullWidth
            onChange={(e) => {}}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            margin="normal"
            label="Mô tả"
            fullWidth
            onChange={(e) => {}}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            margin="normal"
            label="Code"
            fullWidth
            onChange={(e) => {}}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-number"
            label="Number"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Box>
    </>
  );
}
