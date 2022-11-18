import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink, useLocation } from "react-router-dom";
import Icon from "@material-ui/core/Icon";
import Avatar from "@material-ui/core/Avatar";

export const drawerWidth = 240;

const useStyles = makeStyles((theme: any) => ({
  root: {
    display: "flex",
    fontFamily: "Montserrat, sans-serif",
  },
  logo: {
    color: "white",
    textDecoration: "none",
    fontFamily: "Montserrat, sans-serif",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    backgroundColor: `#FFA500`,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  active: {
    backgroundColor: theme.palette.action.selected,
  },
}));

function ResponsiveDrawer(props: any) {
  const classes = useStyles();
  const { pathname } = useLocation();

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {[
          // { text: "home", icon: "home" },
          // { text: "login", icon: "lock" },
          { text: "dash-board/users", display: "Người dùng", icon: "person" },
          {
            text: "dash-board/shops",
            display: "Cửa hàng",
            icon: "shopping_cart",
          },
          // { text: "people", icon: "people" },
          // { text: "map", icon: "map" },
          // { text: "components", icon: "apps" },
          // { text: "settings", icon: "settings" },
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
            Trang quản trị
          </Typography>
          <div style={{ flexGrow: 1 }}></div>
          <IconButton color="inherit" aria-label="open drawer" edge="end">
            <Avatar src="" />
          </IconButton>
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
