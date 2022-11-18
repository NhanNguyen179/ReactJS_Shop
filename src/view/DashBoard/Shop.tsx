import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import userAPI from "../../api/userFunction";

export default function Shop() {
  const [shops, setShops] = React.useState([]);
  const getShops = async () => {
    const respone: any = await userAPI.getShops();
    setShops(respone.data);
  };

  React.useEffect(() => {
    getShops();
  }, []);

  return (
    <React.Fragment>
      <Title>Danh sách cửa hàng</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Ảnh: </TableCell>
            <TableCell>Tên cửa hàng: </TableCell>
            <TableCell>Email: </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shops?.map((shop: any) => (
            <TableRow key={shop.id}>
              <TableCell style={{ maxWidth: "100px", overflow: "hidden" }}>
                <img
                  src={`${process.env.REACT_APP_API_BASE_URl_IMAGE}${shop?.profile.avatar}`}
                  style={{ width: "100px" }}
                  alt="img"
                />
              </TableCell>
              <TableCell style={{ maxWidth: "100px", overflow: "hidden" }}>
                {shop.profile.name}
              </TableCell>
              <TableCell style={{ maxWidth: "100px", overflow: "hidden" }}>
                {shop.profile.email}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
