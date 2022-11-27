import { Dispatch, SetStateAction } from "react";
import AddToCartButton from "./AddToCartButton";
import Quantityselect from "./QuantitySelect";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import util from "../order/util";
import { Box, Chip, Grid, Stack } from "@mui/material";

type option = {
  id: string;
  name: string;
  choices: string[];
};

type eachItemProps = {
  name: string;
  description: string;
  price: number;
  id: string;
  quantityState: {
    quantity: string;
    name: string;
  };
  setQuantityState: Dispatch<
    SetStateAction<{
      quantity: string;
      name: string;
    }>
  >;
  quantity: string;
  options: option[];
  AddProduct: () => void;
};

const DescriptionView = ({
  name,
  description,
  price,
  id,
  quantityState,
  setQuantityState,
  quantity,
  options,
  AddProduct,
}: eachItemProps) => {
  const isMobile = useMediaQuery("(max-width:599px)");

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: number | unknown }>
  ) => {
    const name = event.target.name as keyof typeof quantityState;
    setQuantityState({
      ...quantityState,
      [name]: event.target.value,
    });
  };


  return (
    <div>
      {!isMobile && (
        <div className="product-view-name_bigger-screen">{name}</div>
      )}
      <div
        className={
          isMobile
            ? "product-view-description_mobile"
            : "product-view-description_bigger-screen"
        }
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              component="div"
              sx={{
                display: "block",
                backgroundColor: "#fafafa",
                padding: "15px 20px",
                fontSize: "21px",
                lineWeight: 500,
                color: "#FFA500",
              }}
            >
              {util.convertToMoneyString(price)}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                Mô tả
              </Grid>
              <Grid item xs={9}>
                {description}
              </Grid>
            </Grid>
          </Grid>
          {options.map((option) => (
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  {option.name}
                </Grid>
                <Grid item xs={9}>
                  <Stack direction="row" spacing={1}>
                    {option.choices.map((choice) => (
                      <Chip label={choice} variant="outlined" />
                    ))}
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Quantityselect onChange={handleChange} value={quantity} />
        <AddToCartButton onClick={AddProduct} />
        <div className="product-view-id">ID: {id}</div>
      </div>
    </div>
  );
};

export default DescriptionView;
