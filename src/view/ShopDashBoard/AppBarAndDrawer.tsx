import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import {
  Link as RouterLink,
  NavLink,
  useHistory,
  useLocation,
} from "react-router-dom";
import Icon from "@material-ui/core/Icon";
import Avatar from "@material-ui/core/Avatar";
import { Button } from "@mui/material";

export const drawerWidth = 240;

const useStyles = makeStyles((theme: any) => ({
  root: {
    display: "flex",
  },
  logo: {
    color: "white",
    textDecoration: "none",
    fontFamily: "Montserrat, sans-serif",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    backgroundColor: "#fff",
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
}));

function ResponsiveDrawer(props: any) {
  const classes = useStyles();
  const { pathname } = useLocation();
  const navigated = useHistory();

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {[
          {
            text: "shop-dash-board/data-center",
            display: "Thống kê",
            icon: "trending_up",
          },
          {
            text: "shop-dash-board/products",
            display: "Sản phẩm",
            icon: "shopping_cart",
          },
          {
            text: "shop-dash-board/orders",
            display: "Đơn hàng",
            icon: "receipt",
          },
        ].map(({ text, display, icon }, index) => (
          <ListItem
            component={RouterLink}
            selected={pathname === `/${text}`}
            to={`/${text}`}
            button
            key={text}
          >
            <ListItemIcon>
              <Icon>{icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={display.toUpperCase()} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            to={"/"}
            component={RouterLink}
            className={classes.logo}
          >
            Chào mừng đến với trang quản lý cửa hàng
          </Typography>
          <div style={{ flexGrow: 1 }}></div>
          <div>
            <Button
              variant="outlined"
              onClick={() => (window.location.href = "/")}
            >
              Trang chủ
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      <nav aria-label="mailbox folders">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
        >
          {drawer}
        </Drawer>
      </nav>
    </div>
  );
}

export default ResponsiveDrawer;
