import Header from "./Header";
import Category from "./Category";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import HomeProducts from "./HomeProducts";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@mui/material/colors";
import { Box, Dialog, Modal, Typography } from "@material-ui/core";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: grey[100],
  },
  baner: {
    width: "100%",
    objectFit: "cover",

    [theme.breakpoints.down("sm")]: {
      margin: "10% 0 10% 0",
    },
  },
}));

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  p: 4,
  maxHeight: "400px",
  maxWidth: "400px",
  "&:focus": {
    outline: "none",
  },
};

export default function Home() {
  const isMobile = useMediaQuery("(max-width:599px)");
  const styles = useStyles();
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (user !== undefined && user !== null) {
      const inforUser = JSON.parse(user);
      toast.info(`Happy shopping, ${inforUser.profile.name}`, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
    }
  }, []);
  return (
    <div
      style={isMobile ? { paddingBottom: "120px" } : { paddingBottom: "90px" }}
      className={styles.container}
    >
      <div style={{ outline: "none" }}>
        <ToastContainer />
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          onClose={handleClose}
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <img
              className={classes.baner}
              alt=""
              src="https://cf.shopee.vn/file/368b9ca41121b5e89bae5292a389ace5"
            />
          </Box>
        </Modal>
      </div>

      <Header />
      <Category />
      <HomeProducts />
    </div>
  );
}
