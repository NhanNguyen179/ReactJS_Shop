import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AddIcon from "@material-ui/icons/Add";
import { AppContext } from "../../context/Context";
import {
  Avatar,
  Button,
  Container,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import productAPI from "../../api/productFunction";
import { CustomSelect } from "../../components/common/CustomSelect";
import ProductDialog from "./ProductDialog";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    headerContainer: {
      position: "relative",
      height: "100px",
    },
    header: {
      display: "flex",
      position: "absolute",
      width: "calc(100%)",
      top: "-70px",
      alignItems: "flex-end",
      "& > *": {
        margin: `${theme.spacing(3)}px ${theme.spacing(1)}px`,
      },
    },
    spacer: {
      flexGrow: 1,
    },
    avatar: {
      border: `3px solid white`,
      width: theme.spacing(13),
      height: theme.spacing(13),
      boxShadow: theme.shadows[3],
    },
    actionGroup: {
      display: "flex",
      width: "330px",
      justifyContent: "space-between",
      marginRight: 0,
    },
    summaryCards: {
      display: "flex",
      flexWrap: "wrap",
    },
    summaryCard: {
      margin: theme.spacing(1),
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    tripCard: {
      margin: theme.spacing(1),
      padding: theme.spacing(2),
    },
  })
);

export default function ShopProduct() {
  const [products, setProducts] = React.useState([]);
  const [active, setActive] = React.useState(true);
  const [snackOpen, setSnackOpen] = React.useState(false);
  const { auth, setAuth } = React.useContext(AppContext);
  const classes = useStyles();
  const getProducts = async () => {
    const request = {
      params: {
        shopId: auth.Id,
      },
    };
    const respone: any = await productAPI.getProducts(request);
    setProducts(respone.data);
  };

  const getDeactiveProducts = async () => {
    const respone: any = await productAPI.getDeactiveProducts();
    setProducts(respone.data);
  };

  const handleDeactive = async (id: string) => {
    await productAPI.deactiveProduct(id);
    getProducts();
  };

  const handleActive = async (id: string) => {
    await productAPI.activeProduct(id);
    getDeactiveProducts();
  };

  React.useEffect(() => {
    getProducts();
  }, []);

  const handleChange = (value: boolean) => {
    setActive(value);
    if (value) {
      getProducts();
    } else {
      getDeactiveProducts();
    }
  };

  return (
    <Container>
      <Toolbar>
        <div className={classes.spacer} />
        <ProductDialog
          edge="end"
          onSave={() => {
            setSnackOpen(false);
          }}
          render={(open: any) => (
            <Button variant="outlined" startIcon={<AddIcon />} onClick={open}>
              Thêm
            </Button>
          )}
        />
      </Toolbar>
      <Paper elevation={2} className={classes.summaryCard}>
        <Typography color={"textSecondary"} variant="h5" gutterBottom>
          Sản phẩm
        </Typography>
        <CustomSelect
          label=""
          options={[
            { value: true, label: "Đã phê duyệt" },
            { value: false, label: "Chưa phê duyệt" },
          ]}
          value={active}
          setValue={handleChange}
          defaultValue={true}
        />
        <Table size="small" style={{ margin: "20px 0" }}>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Giá</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((product: any) => (
              <TableRow hover key={product.id}>
                <TableCell>
                  <Avatar
                    src={`${process.env.REACT_APP_API_BASE_URl_IMAGE}/${product.imageUrl}`}
                    sx={{ width: 56, height: 56 }}
                    alt="img"
                  />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price} đ</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={
                      active
                        ? () => handleDeactive(product.id)
                        : () => handleActive(product.id)
                    }
                  >
                    {active ? "Hủy" : "Kích hoạt"}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="outlined" color="error" fullWidth>
                    Xóa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
