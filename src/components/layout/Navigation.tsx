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

export default function Navigation() {
  const { auth, setAuth } = useContext(AppContext);

  useEffect(() => {
    async function fetchData() {
      const information = await userAPI.getInforUser();
      setAuth(information);
    }
    if (auth !== null) {
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
              <AccountCircleIcon /> <span>{auth.username}</span>
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
          <NavLink to="/m" style={navlinkLogoStyle}>
            <img src={logo} alt="logo" style={logoStyle} />
            <h2
              style={{
                fontSize: "1.5rem",
              }}
            >
              ShopBee
            </h2>
          </NavLink>
        </div>
        {auth ? (
          <>
            <NavLink to="/m/profile" style={navlinkStyle}>
              <AccountCircleIcon /> <span>{auth.profile.name}</span>
            </NavLink>
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
