import React from "react";
import Index from "../../../../../Index";
import "./Signaturewallet.css";
import { useNavigate } from "react-router-dom";

const SignatureWallet = ({
  handleCloseSignature,
  handleCloseSignatureModal,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <Index.Box className="choose-wallet-modal-main">
        <Index.Box className="choose-wallet-details" mt={3}>
          <Index.Typography
            component="h5"
            variant="h5"
            className=""
            align="center"
          >
            Welcome to OpenSea
          </Index.Typography>
        </Index.Box>
        <Index.Box className="signature-group-btn">
          <Index.Box>
            <Index.Button
              variant="outlined"
              onClick={() => handleCloseSignatureModal()}
            >
              Cancle
            </Index.Button>
          </Index.Box>
          <Index.Box>
            <Index.Button
              variant="contained"
              onClick={() => {
                handleCloseSignature();
                navigate("/user/setting");
              }}
            >
              Accept
            </Index.Button>
          </Index.Box>
        </Index.Box>
      </Index.Box>
    </>
  );
};

export default SignatureWallet;
