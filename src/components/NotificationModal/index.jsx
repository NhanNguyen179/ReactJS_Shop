/* eslint-disable no-underscore-dangle */
import React from "react";
import Modal from "@mui/material/Modal";
// import { useHistory } from 'react-router-dom';

import SuccessImage from "../../img/success.png";
import FailedImage from "../../img/failed.png";
import { Box } from "@material-ui/core";
import { CustomButton } from "../common/CustomButton";
import { useHistory } from "react-router-dom";

const styleTextSuccess = {
  fontFamily: "Inter",
  fontStyle: "normal",
  fontWeight: "700",
  fontSize: "24px",
  lineHeight: "150%",
  textAlign: "center",
  letterSpacing: "1px",
  color: "#171B2F",
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};
function NotificationModal(props) {
  const history = useHistory();
  const {
    isModalSuccessVisible,
    setIsModalSuccessVisible,
    message,
    success,
    url,
    textUrl,
  } = props;
  // const history = useHistory();
  React.useEffect(() => {}, []);

  const handleCancel = () => {
    setIsModalSuccessVisible(false);
  };

  const handleRedirect = () => {
    history.push(url);
  };

  return (
    <>
      <Modal
        open={isModalSuccessVisible}
        onClose={handleCancel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={success === true ? SuccessImage : FailedImage}
              alt="ConfirmDelete"
              style={{ width: "30%" }}
            />
            <p style={styleTextSuccess}>{message} </p>
            <CustomButton onClick={handleRedirect}>{textUrl}</CustomButton>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default NotificationModal;
