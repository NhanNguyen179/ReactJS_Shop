import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import userApi from "../../api/userApi";
import userAPI from "../../api/userFunction";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import { Container } from "@mui/material";
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

export default function Users() {
  const [value, setValue] = React.useState(0);
  const [checkSwitch, setCheckSwitch] = React.useState(false);
  const [viewRm, setViewRm] = React.useState(false);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [users, setUsers] = React.useState([]);
  React.useEffect(() => {
    const fetch = async () => {
      const respone: any = await userAPI.getAllUser();
      setUsers(respone.results);
    };
    fetch();
  }, []);
  const handleToggle = (id: string) => {
    setCheckSwitch(true);
    userAPI.changeRole(id).then((rs) => {
      setCheckSwitch(false);
    });
  };
  return (
    <React.Fragment>
      <Title>Danh sách người dùng</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Tên người dùng: </TableCell>
            <TableCell>SĐT: </TableCell>
            <TableCell>Email: </TableCell>
            <TableCell align="left">CMND : </TableCell>
            <TableCell>
              {" "}
              R&M:{" "}
              <Switch
                {...label}
                defaultChecked={viewRm}
                onClick={() => setViewRm(!viewRm)}
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((row: any) => (
            <TableRow key={row.id}>
              <TableCell style={{ maxWidth: "100px", overflow: "hidden" }}>
                {row.profile.name}
              </TableCell>
              <TableCell style={{ maxWidth: "100px", overflow: "hidden" }}>
                {row.profile.phone_number}
              </TableCell>
              <TableCell style={{ maxWidth: "100px", overflow: "hidden" }}>
                {row.profile.email}
              </TableCell>
              <TableCell
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
