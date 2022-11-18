import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AppContextSearch } from "../../context/ContextSearch";
import { Types } from "../../context/ReducersSearch";
import SearchIcon from "@material-ui/icons/Search";
import { alpha, createStyles, makeStyles, Theme } from "@material-ui/core";
import { InputBase } from "@mui/material";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: "relative",
      borderRadius: "10px",
      backgroundColor: alpha("#FFA500", 0.15),
      "&:hover": {
        backgroundColor: alpha("#FFA500", 0.25),
      },
      marginLeft: theme.spacing(1),
      width: "auto",
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    input: {
      color: "inherit",
      "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "6ch",
        "&:focus": {
          width: "12ch",
        },
        [theme.breakpoints.up("sm")]: {
          width: "12ch",
          "&:focus": {
            width: "20ch",
          },
        },
      },
    },
  })
);

export default function Search() {
  const styles = useStyles();

  const [letters, setLetters] = useState("");
  const handleChangeLetters = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLetters(event.target.value);
  };

  const { state, dispatch } = useContext(AppContextSearch);
  const handleUpdateLetters = () => {
    dispatch({
      type: Types.UpdateLetters,
      payload: { search: letters },
    });
  };

  const history = useHistory();
  const handleOnKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && letters !== "") {
      event.preventDefault();
      handleUpdateLetters();
      history.push(`/search/query=${letters}`);
    }
  };

  useEffect(() => {
    setLetters("");
  }, [state.search]);

  return (
    <div className={styles.container}>
      <div className={styles.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Tìm kiếm…"
        inputProps={{ "aria-label": "search" }}
        className={styles.input}
        onChange={handleChangeLetters}
        onKeyDown={handleOnKeyPress}
      />
    </div>
  );
}
