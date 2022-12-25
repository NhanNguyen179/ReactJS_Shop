import { NavLink } from "react-router-dom";
import QuantitySelectCartTextField from "./QuantitySelectCart_TextField";
import QuantitySelectCartDropDown from "./QuantitySelectCart_DropDown";
import QuantitySetButtonSwitch from "./QuantitySetButtonSwitch";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Checkbox, Grid } from "@mui/material";
import util from "../order/util";

type eachItemProps = {
  category: string;
  id: string;
  image: string;
  quantity: string;
  price: number;
  name: string;
  currentQuantity: string;
  button: boolean;
  shopId: string;
  handleChangeQuantity_TextField: (id: string, e: string) => void;
  handleUpdateQuantity_TextField: (
    id: string,
    quantity: string,
    price: number
  ) => void;
  handleUpdateQuantity_DropDown: (
    id: string,
    quantity: string,
    price: number,
    e: unknown
  ) => void;
  deleteProduct: (id: string, quantity: string, price: number) => void;
};

const EachItemInCartBiggerScreen = ({
  category,
  id,
  image,
  quantity,
  price,
  name,
  currentQuantity,
  button,
  handleChangeQuantity_TextField,
  handleUpdateQuantity_TextField,
  handleUpdateQuantity_DropDown,
  deleteProduct,
  shopId,
}: eachItemProps) => {
  const QuantityPresentationSwitch = () => {
    if (parseInt(currentQuantity) >= 10) {
      return (
        <div>
          <QuantitySelectCartTextField
            onChange={(e) =>
              handleChangeQuantity_TextField(id, e.target.value.toString())
            }
            value={quantity}
          />
          <QuantitySetButtonSwitch
            id={id}
            quantity={quantity}
            price={price}
            button={button}
            handleUpdateQuantity_TextField={handleUpdateQuantity_TextField}
          />
        </div>
      );
    } else if (parseInt(currentQuantity) <= 9) {
      return (
        <QuantitySelectCartDropDown
          onChange={(e) =>
            handleUpdateQuantity_DropDown(id, quantity, price, e.target.value)
          }
          value={quantity}
        />
      );
    } else return null;
  };

  return (
    <>
      <Grid
        container
        style={{
          borderRadius: "5px",
          border: "1px solid #e0e0e0",
          margin: "10px 0",
          padding: "10px 0",
          boxSizing: "border-box",
        }}
      >
        <Grid
          item
          xs={1}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AddShoppingCartIcon />
        </Grid>
        <Grid item xs={5} style={{ display: "flex", alignItems: "center" }}>
          <NavLink to={`/product/${id}`}>
            <img
              src={`${process.env.REACT_APP_API_BASE_URl_IMAGE}/${image[0]}`}
              alt=""
              style={{
                width: "130px",
                height: "130px",
                display: "block",
              }}
            />
          </NavLink>
          <div
            style={{
              display: "flex",
              overflow: "hidden",
              lineHeight: "16px",
              padding: "5px 20px 0 10px",
            }}
          >
            {name}
          </div>
        </Grid>
        <Grid
          item
          xs={6}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid container>
            <Grid
              item
              xs={3}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {util.convertToMoneyString(price)}
            </Grid>
            <Grid
              item
              xs={3}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <QuantityPresentationSwitch />
            </Grid>
            <Grid
              item
              xs={3}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {util.convertToMoneyString(price)}
            </Grid>
            <Grid
              item
              xs={3}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <DeleteOutlinedIcon
                onClick={() => deleteProduct(id, quantity, price)}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default EachItemInCartBiggerScreen;
