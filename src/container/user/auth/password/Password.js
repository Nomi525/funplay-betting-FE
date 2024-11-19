import React, { useState } from "react";
import Index from "../../../../component/Index";
import PagesIndex from "../../../pageIndex";
import {
  userPasswordValidationSchemaLogin,
  userPasswordValidationSchemaSignUp,
} from "../../../../validation/Validation";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLoginPassword } from "../../../../redux/user/userReducer";

export default function Password({
  signUp,
  email,
  handleClosePassword,
  handleCloseSignIn,
  handleOpenForgotPassword,
  setSignOut,
  handleOpenPassword,
  login,
  currency,
  userName,
  handleProcess,
  handleOpenSignIn,
}) {
  const location = useLocation();
  let joinReferralCode = location?.search?.split("=")[1];
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [disable, setDisable] = useState(false);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let initialValues = {
    password: "",
    confirmPassword: "",
  };

  // user login with password api call
  const handlePassword = (values) => {
    const data = {
      password: values.password,
      email: email,
      registerType: "Password",
      type: login ? "signup" : "login",
      fullName: userName,
      currency: currency,
    };
    // new joinReferralCode add
    if (joinReferralCode) {
      console.log(joinReferralCode, 53);
      data.referralByCode = joinReferralCode;
    }
    // new
    setDisable(true);
    dispatch(userLoginPassword(data))
      .then((res) => {
        setDisable(false);
        if (res?.payload) {
          handleClosePassword();
          handleCloseSignIn();
          setSignOut(true);
          navigate("/user");
        } else {
          handleOpenPassword();
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message, {
          toastId: "customId",
        });
      });
  };
  return (
    <>
      <Index.Box className="signin-main-content">
        <Index.Box className="signin-content-details">
          <Index.Typography
            className="user-auth-title-comman"
            variant="h6"
            component="h6"
          >
             {!signUp ? 'Set Password' : 'Password' }
          </Index.Typography>
        </Index.Box>
        <PagesIndex.Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={
            !signUp
              ? userPasswordValidationSchemaSignUp
              : userPasswordValidationSchemaLogin
          }
          onSubmit={handlePassword}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Index.Box className="comman-details-auth-user">
                <Index.Box className="form-control-details-auth mb-30px-form password-field-details">
                  {/* <Index.Typography
                    className="user-auth-details-comman user-login-password"
                    variant="p"
                    component="p"
                  >
                    Password
                  </Index.Typography> */}
                  <Index.TextField
                    className="form-control custom-auth-user-control form-control-icon-left admin-input-design input-placeholder"
                    name="password"
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    onBlur={handleBlur}
                    value={values.password}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      if (e.key === " " && e.target.value.trim() === "") {
                        e.preventDefault();
                      }
                    }}
                    helperText={touched.password && errors.password}
                    error={Boolean(errors.password && touched.password)}
                    InputProps={{
                      // <-- This is where the toggle button is added.
                      endAdornment: (
                        <Index.InputAdornment
                          position="end"
                          className="pass_position"
                        >
                          <Index.IconButton
                            className="icon_end_icon"
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? (
                              <Index.VisibilityOff className="pass-icon-color-admin" />
                            ) : (
                              <Index.Visibility className="pass-icon-color-admin" />
                            )}
                          </Index.IconButton>
                        </Index.InputAdornment>
                      ),
                    }}
                  />
                </Index.Box>

                {!signUp ? (
                  <Index.Box className="form-control-details-auth mb-30px-form password-field-details">
                    {/* <Index.Typography
                      className="user-auth-details-comman user-login-password"
                      variant="p"
                      component="p"
                    >
                      Confirm Password
                    </Index.Typography> */}
                    <Index.TextField
                      className="form-control custom-auth-user-control form-control-icon-left"
                      name="confirmPassword"
                      placeholder="Confirm password"
                      onBlur={handleBlur}
                      value={values.confirmPassword}
                      onChange={handleChange}
                      type={showConfirmPassword ? "text" : "password"}
                      onKeyDown={(e) => {
                        if (e.key === " " && e.target.value.trim() === "") {
                          e.preventDefault();
                        }
                      }}
                      helperText={
                        touched.confirmPassword && errors.confirmPassword
                      }
                      error={Boolean(
                        errors.confirmPassword && touched.confirmPassword
                      )}
                      InputProps={{
                        // <-- This is where the toggle button is added.
                        endAdornment: (
                          <Index.InputAdornment
                            position="end"
                            className="pass_position"
                          >
                            <Index.IconButton
                              className="icon_end_icon"
                              aria-label="toggle password visibility"
                              onClick={handleClickShowConfirmPassword}
                              edge="end"
                            >
                              {showConfirmPassword ? (
                                <Index.VisibilityOff className="pass-icon-color-admin" />
                              ) : (
                                <Index.Visibility className="pass-icon-color-admin" />
                              )}
                            </Index.IconButton>
                          </Index.InputAdornment>
                        ),
                      }}
                    />
                  </Index.Box>
                ) : (
                  ""
                )}
                {signUp ? (
                  <Index.Box className="forgot-password-main">
                    <Index.Typography
                      className="user-auth-details-comman user-login-password forgot-password"
                      variant="p"
                      component="p"
                      onClick={handleOpenForgotPassword}
                    >
                      Forgot Password?
                    </Index.Typography>
                  </Index.Box>
                ) : (
                  ""
                )}

                <Index.Box className="btn-list-login-content">
                  <Index.Box className="login-btn-list">
                    <PagesIndex.BlueButton
                      btnLabel="Submit"
                      className="blue-btn-content"
                      type="submit"
                      disabled={disable}
                    />
                  </Index.Box>
                </Index.Box>
                <Index.Box
                  className="box-login-text forgot forgot-main bluebox-text"
                  sx={{ mt: 3 }}
                >
                  <Index.Typography
                    variant="body1"
                    component="p"
                    className="forgot_password"
                    onClick={(e) => {
                      // handleProcess("signup");
                      handleClosePassword();
                      handleOpenSignIn();
                    }}
                  >
                    {/* {console.log("240:", handleProcess)} */}
                    {signUp ? " Back to Login?" : "Back to Sign Up?"}
                  </Index.Typography>
                </Index.Box>
              </Index.Box>
            </form>
          )}
        </PagesIndex.Formik>
      </Index.Box>
    </>
  );
}
