import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { CustomTextField } from "../../components/common/CustomTextField";
import { Grid } from "@material-ui/core";
import { CustomSelect } from "../../components/common/CustomSelect";
import { IconButton, ImageList, ImageListItem } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

export default function ProductDialog({ render, onSave }: any) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [width, setWidth] = React.useState("");
  const [length, setLength] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [images, setImages] = React.useState<any[]>([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setOpen(false);
  };

  const handleUpload = (e: any) => {
    setImages(e.target.files);
  };

  return (
    <>
      {render(handleClickOpen)}
      <Dialog fullWidth maxWidth={"md"} open={open} onClose={handleClose}>
        <DialogTitle>Thêm sản phẩm</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomTextField
                autoFocus
                margin="normal"
                id="name"
                label="Tên"
                fullWidth
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                autoFocus
                margin="normal"
                label="Mô tả"
                fullWidth
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <CustomTextField
                    autoFocus
                    margin="normal"
                    label="Giá"
                    fullWidth
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomTextField
                    autoFocus
                    margin="normal"
                    label="Số lượng"
                    fullWidth
                    value={quantity}
                    onChange={(e) => {
                      setQuantity(e.target.value);
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <CustomTextField
                    autoFocus
                    margin="normal"
                    label="Khối lượng"
                    fullWidth
                    value={weight}
                    onChange={(e) => {
                      setWeight(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <CustomTextField
                    autoFocus
                    margin="normal"
                    label="Dài"
                    fullWidth
                    value={length}
                    onChange={(e) => {
                      setLength(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <CustomTextField
                    autoFocus
                    margin="normal"
                    label="Rộng"
                    fullWidth
                    value={width}
                    onChange={(e) => {
                      setWidth(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <CustomTextField
                    autoFocus
                    margin="normal"
                    label="Cao"
                    fullWidth
                    value={height}
                    onChange={(e) => {
                      setHeight(e.target.value);
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <CustomSelect
                    label="Nhãn hiệu"
                    options={[
                      { value: "1", label: "1" },
                      { value: "2", label: "2" },
                    ]}
                    value={brand}
                    setValue={setBrand}
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomSelect
                    label="Danh mục"
                    options={[
                      { value: "1", label: "1" },
                      { value: "2", label: "2" },
                    ]}
                    value={category}
                    setValue={setCategory}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={3}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <IconButton
                    style={{ color: "#FFA500", padding: "10px" }}
                    component="label"
                  >
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      multiple
                      onChange={handleUpload}
                    />
                    <PhotoCamera />
                    Tải ảnh
                  </IconButton>
                </Grid>
                <Grid item xs={9}>
                  <ImageList sx={{ width: "100%" }} cols={4} rowHeight={200}>
                    {Array.from(images).map((item: any) => (
                      <ImageListItem key={item}>
                        <img
                          src={item ? URL.createObjectURL(item) : ""}
                          alt={item ? item.name : ""}
                          loading="lazy"
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="outlined"
            style={{ color: "#FFA500", borderColor: "#FFA500" }}
          >
            Hủy
          </Button>
          <Button
            onClick={handleSave}
            variant="outlined"
            style={{ color: "#FFA500", borderColor: "#FFA500" }}
          >
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
