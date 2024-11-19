import React, { useState } from "react";
import Index from "../../../../component/Index";
import PageIndex from "../../../pageIndex";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { MuiOtpInput } from "mui-one-time-password-input";
import { Api } from "../../../../config/Api";
import DataService from "../../../../config/DataService";
import { useLocation } from "react-router-dom";

function Otp() {
  const [otpError, setOtpError] = useState("");
  const navigate = useNavigate();
  const [otp, setOtp] = useState();
  const [isDisabled, setIsDisabled] = useState(false);
  const { state } = useLocation();
  let id = state?.id;

  // OTP verify API call

  const handleFormSubmit = async (values) => {
    setIsDisabled(true);
    const urlencoded = new URLSearchParams();
    urlencoded.append("id", id);
    urlencoded.append("otp", otp);
    DataService.post(Api.ADMIN_OTP, urlencoded)
      .then((res) => {
        toast.success(res.data.message, {
          toastId: "customId",
        });
        setIsDisabled(false);
        navigate("/admin/reset-password", {
          state: { id: res.data.data._id },
        });
      })
      .catch((e) => {
        toast.error(
          e.response.data.message ? e.response.data.message : e.message,
          {
            toastId: "customId",
          }
        );
        setIsDisabled(false);
      });
  };

  // OTP change function
  const handleChange = (newValue) => {
    setOtp(newValue);
    if (!isNaN(newValue) && newValue.length === 4) {
      setOtpError();
    }
  };

  //RESEND_OTP
  const handleResend = () => {
    // setResendTime(15);
    const urlencoded = new URLSearchParams();
    urlencoded.append("adminId", id);
    DataService.post(Api.RESEND_OTP, urlencoded)
      .then((res) => {
        toast.success(res.data.message, {
          toastId: "customId",
        });
        // navigate("/admin/otp", {
        //   state: { id: res.data.data._id }
        // });
      })
      .catch((e) => {
        toast.error(
          e.response.data.message ? e.response.data.message : e.message,
          {
            toastId: "customId",
          }
        );
      });
  };

  return (
    <>
      <Index.Box className="otp-details-content">
        <Index.Box className="main-login">
          <Index.Box>
            <Index.Box className=" white-login-main">
              <Index.Box className="white-login-box">
                <Index.Box className="logo-set2 text-center">
                  <PageIndex.Link
                    className="logo-admin-redirect"
                    to="/admin/login"
                  >
                    <img src={PageIndex.Svg.userlogo} alt="logo" className="" />
                  </PageIndex.Link>
                </Index.Box>
                <Index.Box className="main-box">
                  <Index.Box className="otp-title-details">
                    <Index.Box className="box-text bluebox-text text-center">
                      <Index.Typography
                        variant="body1"
                        component="p"
                        className=""
                      >
                        OTP
                      </Index.Typography>
                    </Index.Box>

                    <Index.Box className="otp-flex-input-content">
                      <Index.Box className="comman-details-auth-user">
                        <Index.Box className="otp-flex-main-user otp-custom-details">
                          <MuiOtpInput
                            className="otp-input"
                            length={4}
                            value={otp}
                            onChange={handleChange}
                            name="otp"
                          />
                        </Index.Box>
                        <Index.Box className="resend-pass-right">
                          {/* // <Link className="redirect-resend">Resend OTP</Link> */}
                          <Index.Button
                            className="redirect-resend"
                            onClick={handleResend}
                          >
                            Resend OTP
                          </Index.Button>
                        </Index.Box>
                        {/* <Index.Box className="btn-list-login-content">
                          <Index.Box className="login-btn-list">
                            <PageIndex.BlueButton
                              btnLabel="Submit"
                              className="blue-btn-content"
                              onClick={() => handleFormSubmit()}
                            />
                          </Index.Box>
                        </Index.Box> */}
                        <Index.Box className="orange-btn login-btn login-btn-main">
                          <Index.Button
                            type="submit"
                            data-testid="button"
                            variant="contained"
                            onClick={() => handleFormSubmit()}
                            disabled={isDisabled}
                          >
                            Submit
                          </Index.Button>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.Box>
            {/* <Index.Box className="signin-main-content">
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
              <Index.Box className="otp-flex-main-user">
                <MuiOtpInput
                  className="otp-input"
                  length={4}
                  value={otp}
                  onChange={handleChange}
                  name="otp"
                />
              </Index.Box>
              <Index.Box className="resend-pass-right">
                <Link className="redirect-resend">Resend OTP</Link>
              </Index.Box>
              <Index.Box className="btn-list-login-content">
                <Index.Box className="login-btn-list">
                  <PageIndex.BlueButton
                    btnLabel="Submit"
                    className="blue-btn-content"
                    onClick={() => handleFormSubmit()}
                  />
                </Index.Box>
              </Index.Box>
            </Index.Box>
          </Index.Box> */}
          </Index.Box>
        </Index.Box>
      </Index.Box>
    </>
  );
}

export default Otp;
