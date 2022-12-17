import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import useWindowScrollPosition from "@rehooks/window-scroll-position";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CartPreview from "./CartPreview";
import Search from "./Search";
import logo from "../../img/Logo/logo.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import { AppContext } from "../../context/Context";
import userAPI from "../../api/userFunction";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {
  Avatar,
  Dialog,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

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
    <Dialog onClose={handleClose} open={open} >
      <List sx={{ pt: 0 }} style={{padding: '12px'}}> 
        <ListItem onClick={() => handleListItemClick("addAccount")}>
          <NavLink
            to="/profile"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ListItemAvatar>
              <Avatar>
                <AccountCircleIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Thông tin cá nhân" />
          </NavLink>
        </ListItem>
        <ListItem onClick={() => handleListItemClick("addAccount")}>
          <NavLink
            to="/order"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ListItemAvatar>
              <Avatar>
                <ReceiptLongIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Lịch sử đơn hàng" />
          </NavLink>
        </ListItem>
        <ListItem onClick={() => handleListItemClick("addAccount")}>
          <NavLink
            onClick={(e) => {
              localStorage.removeItem("jwtToken");
              localStorage.removeItem("role");
              localStorage.removeItem("user");
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

export default function Navigation() {
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
    async function fetchData() {
      const information = await userAPI.getInforUser();
      localStorage.setItem("user", JSON.stringify(information));
      setAuth(information);
    }
    const user = localStorage.getItem("user");
    if (user) {
      setAuth(JSON.parse(user));
    } else {
      fetchData();
    }
  }, []);

  const [change, setChange] = useState(false);
  const changePosition = 50;
  let position = useWindowScrollPosition();
  if (position.y > changePosition && !change) {
    setChange(true);
  }
  if (position.y <= changePosition && change) {
    setChange(false);
  }
  let style = {
    backgroundColor: change ? "rgb(243, 243, 243)" : "transparent",
    transition: "400ms ease",
  };
  let logoStyle = {
    width: change ? "50px" : "60px",
    transition: "400ms ease",
    borderRadius: "50%",
    padding: "5px",
  };
  let navlinkLogoStyle = {
    display: "flex",
    alignItems: "center",
  };
  let navlinkStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  };

  const isMobile = useMediaQuery("(max-width:599px)");

  if (isMobile) {
    return (
      <div>
        <div className="navbar" style={style}>
          <div className="logo_mobile">
            <NavLink to="/" style={navlinkLogoStyle}>
              <img src={logo} alt="logo" style={logoStyle} />
            </NavLink>
          </div>

          {auth ? (
            <>
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
            </>
          ) : (
            <NavLink to="/sign-in">
              <LoginIcon />
            </NavLink>
          )}
          <Search />
          <CartPreview />
        </div>
      </div>
    );
  } else {
    return (
      <div className="navbar" style={style}>
        <div className="logo_bigger-screen">
          <NavLink to="/" style={navlinkLogoStyle}>
            <img src={logo} alt="logo" style={logoStyle} />
            ShopBee
          </NavLink>
        </div>

        {auth ? (
          <>
            <div>
              <a style={navlinkStyle} onClick={handleClickOpen}>
                <Avatar src={auth.profile.avatar} />
                <span
                  style={{
                    marginLeft: "5px",
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
          </>
        ) : (
          <NavLink to="/sign-in">
            <LoginIcon />
          </NavLink>
        )}
        <Search />
        <CartPreview />
      </div>
    );
  }
}
