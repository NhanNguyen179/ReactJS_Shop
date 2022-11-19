import AppBarAndDrawer from "./AppBarAndDrawer";
import { Route, Switch } from "react-router-dom";
import Shop from "./Shop";
import Users from "./Users";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Product from "./Product";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    overflow: "auto",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - 240px)`,
      marginLeft: "240px",
    },
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    position: "relative",
  },
}));

function DashboardContent() {
  const classes = useStyles();
  return (
    <div>
      <AppBarAndDrawer />
      <div className={classes.root}>
        <main className={classes.content}>
          <Container maxWidth="xl" className={classes.container}>
            <Switch>
              <Route exact path="/dash-board" component={Shop}></Route>
              <Route exact path="/dash-board/users" component={Users}></Route>
              <Route exact path="/dash-board/shops" component={Shop}></Route>
              <Route
                exact
                path="/dash-board/shop/:shopId"
                component={Product}
              ></Route>
            </Switch>
          </Container>
        </main>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
