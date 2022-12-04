import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { CustomTextField } from "../../components/common/CustomTextField";
import { Grid } from "@material-ui/core";
import { CustomSelect } from "../../components/common/CustomSelect";
import {
  IconButton,
  ImageList,
  ImageListItem,
  MobileStepper,
  useTheme,
} from "@mui/material";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  PhotoCamera,
  Add,
} from "@mui/icons-material";
import productFunction from "../../api/productFunction";

export default function VoucherDialog({ render, onSave }: any) {
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
  const [activeStep, setActiveStep] = React.useState(0);
  const [categoryList, setCategoryList] = React.useState<any[]>([]);
  const [brandList, setBrandList] = React.useState<any[]>([]);
  const [optionList, setOptionList] = React.useState<any[]>([]);
  const [options, setOptions] = React.useState<any[]>([]);
  const theme = useTheme();

  const fetchCategories = async () => {
    const categories: any = await productFunction.getCategories();
    setCategoryList(categories);
  };

  const fetchBrands = async () => {
    const brands: any = await productFunction.getBrands();
    setBrandList(brands);
  };

  const fetchOptions = async () => {
    const options: any = await productFunction.getOptions();
    setOptionList(options);
  };

  React.useEffect(() => {
    fetchCategories();
    fetchBrands();
    fetchOptions();
  }, []);

  const handleAddOption = () => {
    setOptions([...options, { optionId: "", optionValue: "" }]);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpload = (e: any) => {
    setImages(e.target.files);
  };

  const handleSumit = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("weight", weight);
    formData.append("height", height);
    formData.append("width", width);
    formData.append("length", length);
    formData.append("categoryIds", category);
    formData.append("brand", brand);
    formData.append("shopId", "358ccf48-dcd7-4db3-a805-903faa468c7c");
    for (let i = 0; i < images.length; i++) {
      formData.append(`images`, images[i]);
    }
    for (let i = 0; i < options.length; i++) {
      formData.append(`productOptions[${i}].Id`, options[i].optionId);
      formData.append(
        `productOptions[${i}].Description`,
        options[i].optionValue
      );
    }
    await productFunction.createProduct(formData);
  };

  return (
    <>
      {render(handleClickOpen)}
      <Dialog fullWidth maxWidth={"md"} open={open} onClose={handleClose}>
        <DialogTitle>Thêm sản phẩm</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
              <>
                <Grid item xs={12}>
                  <CustomTextField
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
                        options={brandList?.map((brand) => ({
                          value: brand.id,
                          label: brand.name,
                        }))}
                        value={brand}
                        setValue={setBrand}
                        defaultValue=""
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CustomSelect
                        label="Danh mục"
                        options={categoryList?.map((category) => ({
                          value: category.id,
                          label: category.name,
                        }))}
                        value={category}
                        setValue={setCategory}
                        defaultValue=""
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Hủy
          </Button>
          <Button
            onClick={handleSumit}
            variant="outlined"
            disabled={activeStep !== 2}
          >
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
