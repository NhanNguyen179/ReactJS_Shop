import { Dispatch, SetStateAction } from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Quantityselect from "./QuantitySelect";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import util from "../order/util";
import { Box, Chip, Grid, Stack } from "@mui/material";
import { amber, grey } from "@mui/material/colors";
import { CustomButton } from "../common/CustomButton";

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

  let chipstyle = {
    backgroundColor: grey[100],
    color: grey[800],
    fontWeight: 600,
    fontSize: "1rem",

    "&:hover": {
      backgroundColor: amber[800],
      color: grey[800],
    },
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
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box
              component="div"
              sx={{
                display: "block",
                backgroundColor: grey[100],
                padding: "15px 20px",
                fontSize: "21px",
                lineWeight: 500,
                color: amber[800],
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
            <Grid item xs={12} key={option.id}>
              <Grid
                container
                spacing={2}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Grid item xs={3}>
                  {option.name}
                </Grid>
                <Grid item xs={9}>
                  <Stack direction="row" spacing={1}>
                    {option.choices.map((choice) => (
                      <Chip
                        label={choice}
                        variant="outlined"
                        sx={chipstyle}
                        key={choice}
                      />
                    ))}
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Grid
              container
              spacing={1}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Grid item xs={3}>
                Số lượng
              </Grid>
              <Grid item xs={3}>
                <Quantityselect
                  onChange={handleChange}
                  value={quantityState.quantity}
                  firstValue={quantity}
                />
              </Grid>
              <Grid item xs={6}>
                {quantity} sản phẩm có sẵn
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <CustomButton fullWidth onClick={AddProduct}>
              <ShoppingCartIcon />
              Thêm vào giỏ hàng
            </CustomButton>
          </Grid>
        </Grid>

        <div className="product-view-id">ID: {id}</div>
      </div>
    </div>
  );
};

export default DescriptionView;
