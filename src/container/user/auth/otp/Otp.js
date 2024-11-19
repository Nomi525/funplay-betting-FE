import React, { useEffect, useState } from "react";
import Index from "../../../../component/Index";
import PageIndex from "../../../pageIndex";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { MuiOtpInput } from "mui-one-time-password-input";
import DataService from "../../../../config/DataService";
import { Api } from "../../../../config/Api";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../../redux/user/userReducer";
import { CircularProgress } from "@mui/material";

export default function Otp({
  userId,
  handleCloseOtp,
  handleOpenResetPassword,
  forgot,
  handleOpenSignIn,
  setLogin,
  setShow,
  handleOpenSetPassword,
  setReferCode,
  setSignOut,
  login,
  setEmail,
}) {
  const [otpError, setOtpError] = useState("");
  const [otp, setOtp] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [disable, setDisable] = useState(false);
  const [resendOtpDisabled, setResendOtpDisabled] = useState(false);
  const [resendOtpData, setResendOtpData] = useState(false);

  // OTP verify API call
  const handleFormSubmit = () => {
    const data = {
      otp: otp,
      userId: userId,
      type: forgot ? forgot : !login ? "login" : "signup",
    };
    setDisable(true);
    if (!isNaN(otp) && otp.length === 4) {
      setOtpError("");

      dispatch(loginUser(data))
        .then((res) => {
          console.log(res, 46);
          setDisable(false);
          if (res?.payload?.data?.status !== 400) {
            localStorage.setItem("token", res?.payload?.token);

            if (data?.type == forgot) {
              handleOpenResetPassword();
              setEmail("");
              // handleOpenSignIn();
            } else {
              if (res?.payload?.password) {
                navigate("/user");
              } else {
                handleOpenSetPassword();
              }
              setReferCode(res?.payload?.referralCode);
            }
            handleCloseOtp();
            setSignOut(true);
            setShow(false);
            setLogin(false);
            toast.success(res?.data?.message, {
              toastId: "customId",
            });
          }
          if (res?.payload?.data?.status === 400) {
            setOtp("");
          }
        })
        .catch((error) => {
          console.log(error, 72);
          toast.error(error?.response?.data?.message, { toastId: "customId" });
        });
    } else {
      setOtpError("OTP is required");
      setDisable(false);
    }
  };

  // OTP change function
  const handleChange = (newValue) => {
    setOtp(newValue);
    if (!isNaN(newValue) && newValue.length === 4) {
      setOtpError();
    }
  };

  const resendOtp = (userId) => {
    setMinutes(1);
    setSeconds(59);
    setResendOtpDisabled(true);
    const data = { userId: userId };
    DataService.post(Api.User.RESEND_OTP, data)
      .then((res) => {
        toast.success(res?.data?.message);
        setResendOtpDisabled(false);
      })
      .catch((error) => {
        toast.error(error?.data?.message);
        setResendOtpDisabled(false);
      });
  };

  // otp timer
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(59);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [minutes, seconds]);
  return (
    <>
      <Index.Box className="signin-main-content">
        <Index.Box className="signin-content-details">
          <Index.Typography
            className="user-auth-title-comman"
            variant="h6"
            component="h6"
          >
            OTP
          </Index.Typography>
          <Index.Typography
            className="user-auth-details-comman"
            variant="p"
            component="p"
          >
            Enter your OTP.
          </Index.Typography>
        </Index.Box>

        <Index.Box className="comman-details-auth-user">
          <Index.Box className="otp-flex-main-user otp-custom-details">
            <MuiOtpInput
              className="otp-input"
              length={4}
              value={otp}
              onChange={handleChange}
              name="otp"
              inputProps={[{ inputMode: "numeric" }]}
              validateChar={(val) => !isNaN(val)}
            />
          </Index.Box>
          {otpError && (
            <Index.FormHelperText error>{otpError}</Index.FormHelperText>
          )}
          {/* <Index.Box className="resend-pass-right">
            <Index.Button
              className="redirect-resend"
              disabled={resendOtpDisabled}
              onClick={() => resendOtp(userId)}
            >
              Resend OTP
            </Index.Button>
          </Index.Box> */}
          <Index.Box className="countdown-text reset--otp-main">
            {seconds > 0 || minutes > 0 ? (
              <p>
                Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                {seconds < 10 ? `0${seconds}` : seconds}
              </p>
            ) : (
              ""
            )}
            {!(seconds > 0 || minutes > 0) && (
              <Index.Box className="resend-button resend-pass-right">
                {/* <Index.Link
                                          disabled={seconds > 0 || minutes > 0}
                                          // style={{
                                          //   color:
                                          //     seconds > 0 || minutes > 0
                                          //       ? "#DFE3E8"
                                          //       : "#FF5630",
                                          // }}
                                          onClick={resendOTP}
                                        >
                                          Resend OTP
                                        </Index.Link> */}

                <Index.Button
                  type="button"
                  btnLabel="Resend Otp"
                  onClick={() => resendOtp(userId)}
                  className="redirect-resend"
                >
                  {resendOtpDisabled ? (
                    <CircularProgress size={24} />
                  ) : (
                    "Resend Otp"
                  )}
                </Index.Button>
              </Index.Box>
            )}
          </Index.Box>
          <Index.Box className="btn-list-login-content">
            <Index.Box className="login-btn-list">
              <PageIndex.BlueButton
                btnLabel="Submit"
                className="blue-btn-content"
                disabled={disable}
                onClick={() => {
                  handleFormSubmit();
                }}
              />
            </Index.Box>
          </Index.Box>
        </Index.Box>
      </Index.Box>
    </>
  );
}
