import { NavLink } from "react-router-dom";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      color: "primary",
      backgroundColor: "rgb(255,255,255,0.9)",
      "&:hover": {
        backgroundColor: "rgb(255,255,255,0.9)",
      },
      padding: "10px 18px 10px 30px",
      fontSize: "15px",
      fontWeight: "normal",
      borderRadius: "24px",
    },
  })
);

export default function MainButton() {
  const isMobile = useMediaQuery("(max-width:599px)");
  const styles = useStyles();
  return (
    <div
      className={isMobile ? "main-button_mobile" : "main-button_bigger-screen"}
    >
      <NavLink to="/products">
        <Button variant="contained" className={styles.button}>
          Mua ngay hôm nay
          <KeyboardArrowRightIcon style={{ marginLeft: "13px" }} />
        </Button>
      </NavLink>
    </div>
  );
}
