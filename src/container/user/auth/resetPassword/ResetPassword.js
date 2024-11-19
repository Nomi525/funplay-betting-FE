import React, { useState } from "react";
import Index from "../../../../component/Index";
import PageIndex from "../../../pageIndex";
import { userPasswordValidationSchemaSignUp } from "../../../../validation/Validation";
import DataService from "../../../../config/DataService";
import { Api } from "../../../../config/Api";
import { toast } from "react-toastify";

export default function ResetPassword({
  handleClosePassword,
  handleOpenSignIn,
  userId,
  handleCloseResetPassword,
  handleCloseForgotPassword,
  setEmail,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  let initialValues = {
    password: "",
    confirmPassword: "",
  };

  // user login with resetpassowrd api call
  const handlePassword = (values) => {
    const data = {
      password: values.password,
      userId: userId,
    };

    DataService.post(Api.User.RESET_PASSWORD, data)
      .then((res) => {
        toast.success(res?.data?.message, {
          toastId: "customId",
        });
        handleCloseResetPassword();
        handleCloseForgotPassword();
        handleClosePassword();
        setEmail("");
        handleOpenSignIn();
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
            Reset Password
          </Index.Typography>
        </Index.Box>
        <PageIndex.Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={userPasswordValidationSchemaSignUp}
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
                    password
                  </Index.Typography> */}
                  <Index.TextField
                    className="form-control custom-auth-user-control form-control-icon-left"
                    name="password"
                    placeholder="Please enter password"
                    type={showPassword ? "text" : "password"}
                    onBlur={handleBlur}
                    value={values.password}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      if (e.key === " " && e.target.value.trim() === "") {
                        e.preventDefault();
                      }
                    }}
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
                  {errors.password && (
                    <Index.FormHelperText error>
                      {errors.password}
                    </Index.FormHelperText>
                  )}
                </Index.Box>

                <Index.Box className="form-control-details-auth mb-30px-form password-field-details">
                  {/* <Index.Typography
                    className="user-auth-details-comman user-login-password"
                    variant="p"
                    component="p"
                  >
                    {" "}
                    confirm password
                  </Index.Typography> */}
                  <Index.TextField
                    className="form-control custom-auth-user-control form-control-icon-left"
                    name="confirmPassword"
                    placeholder="Please enter confirm password"
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      if (e.key === " " && e.target.value.trim() === "") {
                        e.preventDefault();
                      }
                    }}
                    type={showConfirmPassword ? "text" : "password"}
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
                  {errors.confirmPassword && (
                    <Index.FormHelperText error>
                      {errors.confirmPassword}
                    </Index.FormHelperText>
                  )}
                </Index.Box>

                <Index.Box className="btn-list-login-content">
                  <Index.Box className="login-btn-list">
                    <PageIndex.BlueButton
                      btnLabel="Submit"
                      className="blue-btn-content"
                      type="submit"
                      // onClick={() => handlePassword(values)}
                    />
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </form>
          )}
        </PageIndex.Formik>
      </Index.Box>
    </>
  );
}
