import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import userFunction from "../../api/userFunction";
import { NavLink, useHistory } from "react-router-dom";
import Logo from "../../img/Logo/logo.png";
import { CustomTextField } from "../common/CustomTextField";
import { CustomCheckBox } from "../common/CustomCheckBox";
import { CustomSelect } from "../common/CustomSelect";
import React, { useState } from "react";
import Loading from "../Loading";
import { CustomButton } from "../common/CustomButton";
import { AppContext } from "../../context/Context";

export default function SignIn() {
  const { role, setRole } = React.useContext(AppContext);
  const navigated = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [roleUi, setRoleUi] = useState<string>("");
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const dataTemp = new FormData(event.currentTarget);
    const data = {
      username: dataTemp.get("username"),
      password: dataTemp.get("password"),
    };
    try {
      setLoading(true);
      const response: any = await userFunction.login(data, roleUi);
      localStorage.setItem("jwtToken", response.data.access_token);
      console.log("response.data.role", response.data.role);
      localStorage.setItem("role",response.data.role);
      setRole(response.data.role);
      switch (roleUi) {
        case "shop":
          // code block
          navigated.push("/shop-dash-board");

          break;
        case "customer":
          // code block
          navigated.push("/m");

          break;
        case "admin":
          // code block
          navigated.push("/dash-board");

          break;
        default:
        // code block
      }
      setLoading(false);

    } catch (err) {
      console.log(err);
      setError("Sai tên đăng nhập hoặc mật khẩu");
      setLoading(false);
    }
  };

  let logoStyle = {
    width: "50px",
    transition: "400ms ease",
    borderRadius: "50%",
    padding: "5px",
  };

  let navlinkLogoStyle = {
    display: "flex",
    alignItems: "center",
  };

  if (loading) return <Loading />;

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <NavLink to="/" style={navlinkLogoStyle}>
            <img src={Logo} alt="logo" style={logoStyle} />
          </NavLink>
          <Typography component="h1" variant="h5">
            Mua hàng ngay
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <CustomTextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Tên đăng nhập"
              name="username"
              autoComplete="email"
              autoFocus
            />
            <CustomTextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mật khẩu"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <CustomSelect
              label="Vai trò"
              options={[
                { value: "shop", label: "Cửa hàng" },
                { value: "customer", label: "Người dùng" },
                { value: "admin", label: "Admin" },
              ]}
              value={roleUi}
              setValue={setRoleUi}
            />
            <CustomCheckBox label="Nhớ tài khoản" />
            <Typography
              component="h1"
              variant="h6"
              style={{ color: "red", textAlign: "center" }}
            >
              {error}
            </Typography>
            <CustomButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Đăng nhập
            </CustomButton>
            <Grid container>
              <Grid item xs>
                <Link href="/forgot-password" variant="body2">
                  Quên mật khẩu?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/sign-up" variant="body2">
                  Không có tài khoản? Đăng kí ngay
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

const theme = createTheme();
