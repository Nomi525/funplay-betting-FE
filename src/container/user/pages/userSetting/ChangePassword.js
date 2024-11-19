import React, { useState } from "react";
import DataService from "../../../../config/DataService";
import { Api } from "../../../../config/Api";
import { toast } from "react-toastify";
import Index from "../../../Index";
import PageIndex from "../../../pageIndex";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { userChangePassword } from "../../../../validation/Validation";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  let initialValues2 = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const [showPassword, setShowPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickOldPassword = () => setOldPassword((show) => !show);
  const handleClickConfirmPassword = () => setConfirmPassword((show) => !show);
  let navigate = useNavigate();
  const handleChangePassword = (values) => {
    const data = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    };
    DataService.post(Api.User.CHAGES_PASSWORD, data)
      .then((res) => {
        toast.success(res?.data?.message, {
          toastId: "customId",
        });
        navigate("/user");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message, {
          toastId: "customId",
        });
      });
  };

  return (
    <>
      <PageIndex.Formik
        enableReinitialize
        initialValues={initialValues2}
        onSubmit={handleChangePassword}
        validationSchema={userChangePassword}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          touched,
          errors,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Index.Box className="tab-main-card-content">
              <Index.Box className="tab-main-pd-content">
                <Index.Box sx={{ width: 1 }} className="grid-main">
                  <Index.Box
                    display="grid"
                    gridTemplateColumns="repeat(12, 1fr)"
                    gap={{ xs: 2, sm: 2, md: 0, lg: 0 }}
                    className="grid-row-details"
                  >
                    <Index.Box
                      gridColumn={{
                        xs: "span 12",
                        sm: "span 6",
                        md: "span 4",
                        lg: "span 6",
                      }}
                      className="grid-column grid-user-col"
                    >
                      <Item className="grid-item">
                        <Index.Box className="form-group-main deposit-form-content setting-pass-main mb-30px-form">
                          <Index.FormHelperText className="title-label-comman-user">
                            Old Password
                          </Index.FormHelperText>
                          <Index.Box className="input-design-div admin-design-div input-design-div-set-back setting-password">
                            <Index.Box className="input-details-main">
                              <Index.Box className="input-box cm-search-box">
                                <Index.Box className="form-group">
                                  <Index.Box className="form-group pass_group_main">
                                    <Index.TextField
                                      hiddenLabel
                                      id="filled-hidden-label-normal"
                                      variant="filled"
                                      className="admin-input-design input-placeholder"
                                      name="oldPassword"
                                      placeholder="Old Password"
                                      data-testid="email-input"
                                      aria-label="password"
                                      onBlur={handleBlur}
                                      helperText={
                                        touched.oldPassword &&
                                        errors.oldPassword
                                      }
                                      error={Boolean(
                                        errors.oldPassword &&
                                          touched.oldPassword
                                      )}
                                      onKeyDown={(e) => {
                                        if (
                                          e.key === " " &&
                                          e.target.value.trim() === ""
                                        ) {
                                          e.preventDefault();
                                        }
                                      }}
                                      value={values.oldPassword}
                                      onChange={handleChange}
                                      type={oldPassword ? "text" : "password"}
                                      autoComplete="off"
                                      inputProps={{
                                        className: "input_props",
                                      }}
                                      InputLabelProps={{
                                        className: "add-formlabel",
                                      }}
                                      InputProps={{
                                        // <-- This is where the toggle button is added.
                                        endAdornment: (
                                          <Index.InputAdornment position="end">
                                            <Index.IconButton
                                              aria-label="toggle password visibility"
                                              onClick={handleClickOldPassword}
                                              edge="end"
                                            >
                                              {oldPassword ? (
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
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>
                      </Item>
                    </Index.Box>
                    <Index.Box
                      gridColumn={{
                        xs: "span 12",
                        sm: "span 6",
                        md: "span 4",
                        lg: "span 6",
                      }}
                      className="grid-column grid-user-col"
                    >
                      <Item className="grid-item">
                        <Index.Box className="form-group-main deposit-form-content setting-pass-main mb-30px-form">
                          <Index.FormHelperText className="title-label-comman-user">
                            New Password
                          </Index.FormHelperText>
                          <Index.Box className="input-design-div admin-design-div input-design-div-set-back setting-password">
                            <Index.Box className="input-details-main">
                              <Index.Box className="input-box cm-search-box">
                                <Index.Box className="form-group">
                                  <Index.Box className="form-group pass_group_main">
                                    <Index.TextField
                                      hiddenLabel
                                      id="filled-hidden-label-normal"
                                      variant="filled"
                                      className="admin-input-design input-placeholder"
                                      name="newPassword"
                                      placeholder="New Password"
                                      data-testid="email-input"
                                      aria-label="password"
                                      helperText={
                                        touched.newPassword &&
                                        errors.newPassword
                                      }
                                      onKeyDown={(e) => {
                                        if (
                                          e.key === " " &&
                                          e.target.value.trim() === ""
                                        ) {
                                          e.preventDefault();
                                        }
                                      }}
                                      error={Boolean(
                                        errors.newPassword &&
                                          touched.newPassword
                                      )}
                                      onBlur={handleBlur}
                                      value={values.newPassword}
                                      onChange={handleChange}
                                      type={showPassword ? "text" : "password"}
                                      autoComplete="off"
                                      inputProps={{
                                        className: "input_props",
                                      }}
                                      InputLabelProps={{
                                        className: "add-formlabel",
                                      }}
                                      InputProps={{
                                        // <-- This is where the toggle button is added.
                                        endAdornment: (
                                          <Index.InputAdornment position="end">
                                            <Index.IconButton
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
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>
                      </Item>
                    </Index.Box>
                    <Index.Box
                      gridColumn={{
                        xs: "span 12",
                        sm: "span 6",
                        md: "span 4",
                        lg: "span 6",
                      }}
                      className="grid-column grid-user-col"
                    >
                      <Item className="grid-item">
                        <Index.Box className="form-group-main deposit-form-content setting-pass-main mb-30px-form">
                          <Index.FormHelperText className="title-label-comman-user">
                            Confirm Password
                          </Index.FormHelperText>
                          <Index.Box className="input-design-div admin-design-div input-design-div-set-back setting-password">
                            <Index.Box className="input-details-main">
                              <Index.Box className="input-box cm-search-box">
                                <Index.Box className="form-group">
                                  <Index.Box className="form-group pass_group_main">
                                    <Index.TextField
                                      hiddenLabel
                                      id="filled-hidden-label-normal"
                                      variant="filled"
                                      className="admin-input-design input-placeholder"
                                      name="confirmPassword"
                                      placeholder="Confirm Password"
                                      data-testid="email-input"
                                      aria-label="password"
                                      helperText={
                                        touched.confirmPassword &&
                                        errors.confirmPassword
                                      }
                                      error={Boolean(
                                        errors.confirmPassword &&
                                          touched.confirmPassword
                                      )}
                                      onKeyDown={(e) => {
                                        if (
                                          e.key === " " &&
                                          e.target.value.trim() === ""
                                        ) {
                                          e.preventDefault();
                                        }
                                      }}
                                      onBlur={handleBlur}
                                      value={values.confirmPassword}
                                      onChange={handleChange}
                                      type={
                                        confirmPassword ? "text" : "password"
                                      }
                                      autoComplete="off"
                                      inputProps={{
                                        className: "input_props",
                                      }}
                                      InputLabelProps={{
                                        className: "add-formlabel",
                                      }}
                                      InputProps={{
                                        // <-- This is where the toggle button is added.
                                        endAdornment: (
                                          <Index.InputAdornment position="end">
                                            <Index.IconButton
                                              aria-label="toggle password visibility"
                                              onClick={
                                                handleClickConfirmPassword
                                              }
                                              edge="end"
                                            >
                                              {confirmPassword ? (
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
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>
                      </Item>
                    </Index.Box>
                    <Index.Box
                      gridColumn={{
                        xs: "span 12",
                        sm: "span 12",
                        md: "span 12",
                        lg: "span 12",
                      }}
                      className="grid-column grid-user-col"
                    >
                      <Index.Box className="betting-card-btn-comman max-betting-card">
                        <PageIndex.BlueButton
                          btnLabel="Submit"
                          className="blue-btn-content"
                          type="submit"
                          // onClick={() =>
                          //   handleChangePassword(values)
                          // }
                        />
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.Box>
          </form>
        )}
      </PageIndex.Formik>
    </>
  );
};

export default ChangePassword;
