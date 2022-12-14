import { NavLink } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: "90vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    notfound: {
      textAlign: "center",
      maxWidth: "520px",
      width: "100%",
      lineHeight: "1.4",
    },
    notfoundItem: {
      position: "relative",
      height: "200px",
      margin: "0px auto",
      "@media only screen and (max-width: 480px)": {
        height: "148px",
        margin: "0px auto 10px",
      },
      "& h1": {
        fontFamily: "Montserrat, sans-serif",
        fontSize: "236px",
        fontWeight: "200",
        margin: "0px",
        color: "#211b19",
        textTransform: "uppercase",
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        "@media only screen and (max-width: 767px)": {
          fontSize: "148px",
        },
        "@media only screen and (max-width: 480px)": {
          fontSize: "86px",
        },
      },
      "& h2": {
        fontFamily: "Montserrat, sans-serif",
        fontSize: "28px",
        fontWeight: 400,
        textTransform: "uppercase",
        color: "#211b19",
        padding: "10px 5px",
        margin: "auto",
        display: "inline-block",
        position: "absolute",
        bottom: "0px",
        background: "#f5f5f5",
        left: 0,
        right: 0,
        "@media only screen and (max-width: 767px)": {
          fontSize: "20px",
        },
        "@media only screen and (max-width: 480px)": {
          fontSize: "16px",
        },
      },
    },
    home: {
      fontFamily: "Montserrat, sans-serif",
      display: " inline-block",
      fontWeight: 700,
      textDecoration: "none",
      textTransform: "uppercase",
      padding: "13px 23px",
      background: "#FFA500",
      fontSize: " 18px",
      transition: "0.2s all",
      "@media only screen and (max-width: 480px)": {
        padding: "7px 15px",
        fontSize: "14px",
      },
      "&:hover": {
        color: "#FFA500",
        background: "#211b19",
      },
    },
  })
);

export default function NotFoundPage() {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.notfound}>
        <div className={styles.notfoundItem}>
          <h1>Oops!</h1>
          <h2>404 - Không tìm thấy trang này</h2>
        </div>
        <NavLink className={styles.home} to={`/`}>
          Trang chủ
        </NavLink>
      </div>
    </div>
  );
}
