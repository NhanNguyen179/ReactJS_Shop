import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import userAPI from "../../api/userFunction";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import productAPI from "../../api/productFunction";
import { CustomSelect } from "../../components/common/CustomSelect";

// Generate Order Data
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
const label = { inputProps: { "aria-label": "Switch demo" } };
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Product() {
  const [active, setActive] = React.useState<String>("");
  const [value, setValue] = React.useState(0);
  const [checkSwitch, setCheckSwitch] = React.useState(false);
  const [viewRm, setViewRm] = React.useState(false);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [products, setProducts] = React.useState([]);
  const getProducts = async () => {
    const respone: any = await productAPI.getProducts(null);
    setProducts(respone.data);
  };
  const getDeactiveProducts = async () => {
    const respone: any = await productAPI.getDeactiveProducts();
    setProducts(respone.data);
  };

  React.useEffect(() => {
    getProducts();
  }, []);
  const handleActiveChange = (active: string) => {
    setActive(active);
    active === "true" ? getProducts() : getDeactiveProducts();
  };
  return (
    <React.Fragment>
      <Title>Sản phẩm</Title>
      <CustomSelect
        label="Phân loại"
        options={[
          { value: "true", label: "Đã phê duyệt" },
          { value: "false", label: "Chưa phê duyệt" },
        ]}
        value={active}
        setValue={handleActiveChange}
        defaultValue="true"
      />
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Ảnh: </TableCell>
            <TableCell>Tên sản phẩm: </TableCell>
            <TableCell>Giá: </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products?.map((row: any) => (
            <TableRow key={row.id}>
              <TableCell style={{ maxWidth: "100px", overflow: "hidden" }}>
                <img
                  src={`${process.env.REACT_APP_API_BASE_URl_IMAGE}/${row?.imageUrl}`}
                  style={{ width: "100px", height: "100px" }}
                  alt="img"
                />
              </TableCell>
              <TableCell style={{ maxWidth: "100px", overflow: "hidden" }}>
                {row.name}
              </TableCell>
              <TableCell style={{ maxWidth: "100px", overflow: "hidden" }}>
                {row.price} đ
              </TableCell>
              {/* <TableCell
                align="left"
                style={{ maxWidth: "100px", overflow: "hidden" }}
              >{`$${row.profile.certificate}`}</TableCell>
              <TableCell
                align="left"
                style={{ minWidth: "300px", overflow: "hidden" }}
              >
                {viewRm && (
                  <Box sx={{ width: "100%" }}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                      >
                        <Tab label="Role" {...a11yProps(0)} />
                        <Tab label="Payment" {...a11yProps(1)} />
                      </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                      {row.account_role.map((item: any) => (
                        <>
                          <Stack
                            direction="row"
                            spacing={1}
                            style={{ marginBottom: "10px" }}
                          >
                            <Chip label={item.role.name} />
                            <Switch
                              {...label}
                              defaultChecked={item.is_active}
                              disabled={checkSwitch}
                              onClick={() => handleToggle(item.id)}
                            />
                          </Stack>
                        </>
                      ))}
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                      {row.profile.profile_payment_type.map((item: any) => (
                        <>
                          <Stack
                            direction="row"
                            spacing={1}
                            style={{ marginBottom: "10px" }}
                          >
                            <Chip label={item.payment_type.payment_name} />
                            <Chip
                              label={item.payment_number}
                              variant="outlined"
                            />
                          </Stack>
                        </>
                      ))}
                    </TabPanel>
                  </Box>
                )}
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link> */}
    </React.Fragment>
  );
}
