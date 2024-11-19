import React, { useState } from "react";
import Index from "../../../Index";
import PageIndex from "../../../pageIndex";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import DataService from "../../../../config/DataService";
import { Api } from "../../../../config/Api";

function ResetPassword() {
  const { state } = useLocation();
  let resetId = state?.id;
  const [showNewPassword, setShowNewPassword] = useState(false);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false)
  const navigate = Index.useNavigate();
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((show) => !show);
  };

  // Initital values
  let initialValues = {
    newPassword: "",
    confirmPassword: "",
  };

  const handleFormSubmit = async (values) => {
    setIsDisabled(true);
    const urlencoded = new URLSearchParams();
    urlencoded.append("adminId", resetId)
    urlencoded.append("password", values.newPassword)
    urlencoded.append("confirm_password", values.confirmPassword)
    DataService.post(Api.RESET_PASSWORD, urlencoded).then((res) => {
      toast.success(res.data.message);
      setIsDisabled(false);
      navigate("/admin/login");
    }).catch((e) => {
      toast.error(e.response.data.message ? e.response.data.message : e.message);
      setIsDisabled(false);
    });
  };


  return (
    <div>
      <Index.Box>
        <Index.Box className="main-login">
          <Index.Box>
            <Index.Box className=" white-login-main">
              <Index.Box className="white-login-box">
                <Index.Box className="logo-set2 text-center">
                  <PageIndex.Link className="logo-admin-redirect" to="/admin/login">
                    <img src={PageIndex.Svg.userlogo} alt="logo" className="" />
                  </PageIndex.Link>
                </Index.Box>
                <Index.Box className="main-box">
                  <Index.Box>
                    <Index.Box className="box-text bluebox-text text-center">
                      <Index.Typography
                        variant="body1"
                        component="p"
                        className=""
                      >
                        Reset Password
                      </Index.Typography>
                    </Index.Box>
                    <Index.Box className="box-login-text bluebox-text text-center">
                      <Index.Typography
                        variant="body1"
                        component="p"
                        className=""
                      >
                        Please enter your new password
                      </Index.Typography>
                    </Index.Box>
                    <Index.Box className="input-design-div admin-design-div login-input-design-div">
                      <PageIndex.Formik
                        enableReinitialize
                        onSubmit={handleFormSubmit}
                        initialValues={initialValues}
                        validationSchema={
                          PageIndex.validationSchemaResetPassword
                        }
                      >
                        {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                        }) => (
                          <Index.Stack
                            component="form"
                            spacing={2}
                            noValidate
                            autoComplete="off"
                            onSubmit={handleSubmit}
                          >
                            <Index.TextField
                              hiddenLabel
                              id="filled-hidden-label-normal"
                              variant="filled"
                              placeholder="New Password"
                              className="admin-input-design input-placeholder "
                              name="newPassword"
                              type={showNewPassword ? "text" : "password"}
                              autoComplete="off"
                              inputProps={{
                                className: "input_props",
                              }}
                              InputLabelProps={{ className: "add-formlabel" }}
                              FormHelperTextProps={{
                                className: "input_label_props",
                              }}
                              onBlur={handleBlur}
                              value={values.newPassword}
                              onChange={handleChange}
                              helperText={
                                touched.newPassword && errors.newPassword
                              }
                              error={Boolean(
                                errors.newPassword && touched.newPassword
                              )}
                              sx={{ mb: 3 }}
                              onKeyDown={(e) => {
                                if (e.key === " " && e.target.value.trim() === "") {
                                  e.preventDefault();
                                }
                              }}
                              InputProps={{
                                // <-- This is where the toggle button is added.
                                endAdornment: (
                                  <Index.InputAdornment position="end">
                                    <Index.IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowNewPassword}
                                      edge="end"
                                    >
                                      {showNewPassword ? (
                                        <Index.VisibilityOff className="pass-icon-color-admin" />
                                      ) : (
                                        <Index.Visibility className="pass-icon-color-admin" />
                                      )}
                                    </Index.IconButton>
                                  </Index.InputAdornment>
                                ),
                              }}
                            />
                            <Index.TextField
                              hiddenLabel
                              id="filled-hidden-label-normal"
                              variant="filled"
                              placeholder="Confirm Password"
                              className="admin-input-design input-placeholder password"
                              name="confirmPassword"
                              type={showConfirmPassword ? "text" : "password"}
                              autoComplete="off"
                              inputProps={{
                                className: "input_props",
                              }}
                              InputLabelProps={{ className: "add-formlabel" }}
                              FormHelperTextProps={{
                                className: "input_label_props",
                              }}
                              onBlur={handleBlur}
                              value={values.confirmPassword}
                              onChange={handleChange}
                              helperText={
                                touched.confirmPassword &&
                                errors.confirmPassword
                              }
                              error={Boolean(
                                errors.confirmPassword &&
                                touched.confirmPassword
                              )}
                              sx={{ mb: 3 }}
                              onKeyDown={(e) => {
                                if (e.key === " " && e.target.value.trim() === "") {
                                  e.preventDefault();
                                }
                              }}
                              InputProps={{
                                // <-- This is where the toggle button is added.
                                endAdornment: (
                                  <Index.InputAdornment position="end">
                                    <Index.IconButton
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
                            <Index.Box
                              className="orange-btn login-btn login-btn-main"
                              sx={{ mt: 4 }}
                            >
                              <Index.Button
                                variant="contained"
                                type="submit"
                                disabled={isDisabled}
                              >
                                Submit
                              </Index.Button>
                            </Index.Box>
                          </Index.Stack>
                        )}
                      </PageIndex.Formik>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.Box>
          </Index.Box>
        </Index.Box>
      </Index.Box>
    </div>
  );
}

export default ResetPassword;
