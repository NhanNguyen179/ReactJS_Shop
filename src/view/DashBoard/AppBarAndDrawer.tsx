import React, { useContext, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink, useLocation } from "react-router-dom";
import Icon from "@material-ui/core/Icon";
import { AppContext } from "../../context/Context";
import userAPI from "../../api/userFunction";
import { NavLink } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {
  Avatar,
  Dialog,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

export const drawerWidth = 240;

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <List sx={{ pt: 0 }}>
        <ListItem onClick={() => handleListItemClick("addAccount")}>
          <NavLink
            onClick={(e) => {
              localStorage.removeItem("jwtToken");
              localStorage.removeItem("role");
            }}
            to="/sign-in"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ListItemAvatar>
              <Avatar>
                <ExitToAppIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Đăng xuất" />
          </NavLink>
        </ListItem>
      </List>
    </Dialog>
  );
}

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
    backgroundColor: `#FFA500`,
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
}));

function ResponsiveDrawer(props: any) {
  const classes = useStyles();
  const { pathname } = useLocation();
  const { auth, setAuth } = useContext(AppContext);
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  useEffect(() => {
    async function fetch() {
      const infor = await userAPI.getInforUser();
      setAuth(infor);
    }
  }, []);

  let navlinkStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {[
          { text: "dash-board/users", display: "Người dùng", icon: "person" },
          {
            text: "dash-board/shops",
            display: "Cửa hàng",
            icon: "shopping_cart",
          },
          {
            text: "dash-board/orders",
            display: "Đơn hàng",
            icon: "shopping_cart",
          },
          {
            text: "dash-board/vouchers",
            display: "Voucher",
            icon: "discount_icon",
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
          <div>
            <a style={navlinkStyle} onClick={handleClickOpen}>
              <Avatar src={auth.profile.avatar} />
              <span
                style={{
                  marginLeft: "5px",
                  maxWidth: "100px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {auth.profile.name}
              </span>
            </a>
            <SimpleDialog
              selectedValue={selectedValue}
              open={open}
              onClose={handleClose}
            />
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
