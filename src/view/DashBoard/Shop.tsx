import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import userAPI from "../../api/userFunction";
import { Avatar, Container, Paper, Typography } from "@mui/material";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

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

export default function Shop() {
  const [shops, setShops] = React.useState([]);
  let history = useHistory();
  const classes = useStyles();
  const getShops = async () => {
    const respone: any = await userAPI.getShops();
    setShops(respone.data);
  };

  React.useEffect(() => {
    getShops();
  }, []);

  return (
    <Container>
      <Paper elevation={2} className={classes.summaryCard}>
        <Typography color={"textSecondary"} variant="h5" gutterBottom>
          Cửa hàng
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Id</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shops?.map((shop: any) => (
              <TableRow
                hover
                key={shop.id}
                onClick={(e) => {
                  history.push(`/dash-board/shop/${shop.id}`);
                }}
                style={{ cursor: "pointer" }}
              >
                <TableCell>
                  <Avatar
                    src={`${process.env.REACT_APP_API_BASE_URl_IMAGE}${shop?.profile.avatar}`}
                    sx={{ width: 56, height: 56 }}
                    alt="img"
                  />
                </TableCell>
                <TableCell>{shop.profile.name}</TableCell>
                <TableCell>{shop.id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
