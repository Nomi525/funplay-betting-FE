import React, { useEffect, useState } from "react";
import "./Login.css";
import Index from "../../../Index";
import PageIndex from "../../../pageIndex";
import { loginAdmin } from "../../../../redux/admin/AddService";
import { logout } from "../../../../redux/admin/adminslice/AdminSlice";
import { toast } from "react-toastify";
// import { logout } from "../../../../redux/user/userSlice";

function Login() {
  const dispatch = PageIndex.useDispatch();
  const navigate = PageIndex.useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // Initital values
  let initialValues = {
    email: "",
    password: "",
  };

  // Login
  const handleFormSubmit = (values, action) => {
    setIsDisabled(true);
    dispatch(loginAdmin(values, navigate)).then((res) => {
      action.resetForm();
      setIsDisabled(false);
      if (res.payload !== undefined) {
        localStorage.setItem("user-data", JSON.stringify(res.payload));
        setTimeout(() => {
          navigate("/admin");
        }, 1000);
      }
    });
  };

  // handleFocus for login button disabled
  const handleFocus = () => {
    // setLoading(false);
  };

  // auto logout from browser navigater
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
  };

  useEffect(() => {
    handleLogout();
  }, []);
  return (
    <div>
      <Index.Box>
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
                  <Index.Box>
                    <Index.Box className="box-text bluebox-text text-center">
                      <Index.Typography
                        variant="body1"
                        component="p"
                        className=""
                      >
                        Welcome back!
                      </Index.Typography>
                    </Index.Box>
                    <Index.Box className="box-login-text bluebox-text text-center">
                      <Index.Typography
                        variant="body1"
                        component="p"
                        className=""
                      >
                        Login your account.
                      </Index.Typography>
                    </Index.Box>
                    <Index.Box className="input-design-div admin-design-div login-input-design-div">
                      <PageIndex.Formik
                        enableReinitialize
                        onSubmit={handleFormSubmit}
                        initialValues={initialValues}
                        validationSchema={PageIndex.validationSchemaLogin}
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
                              placeholder="Email"
                              variant="filled"
                              className="admin-input-design input-placeholder"
                              name="email"
                              data-testid="email-input"
                              autoComplete="off"
                              onBlur={handleBlur}
                              onFocus={handleFocus}
                              value={values.email}
                              onChange={handleChange}
                              helperText={touched.email && errors.email}
                              error={Boolean(errors.email && touched.email)}
                            />
                            <Index.TextField
                              hiddenLabel
                              id="filled-hidden-label-normal"
                              placeholder="Password"
                              variant="filled"
                              className="admin-input-design input-placeholder password"
                              name="password"
                              data-testid="email-input"
                              onBlur={handleBlur}
                              onFocus={handleFocus}
                              value={values.password}
                              onChange={handleChange}
                              onKeyDown={(e) => {
                                if (
                                  e.key === " " &&
                                  e.target.value.trim() === ""
                                ) {
                                  e.preventDefault();
                                }
                              }}
                              helperText={touched.password && errors.password}
                              error={Boolean(
                                errors.password && touched.password
                              )}
                              aria-label="password"
                              type={showPassword ? "text" : "password"}
                              autoComplete="off"
                              inputProps={{
                                className: "input_props",
                              }}
                              InputLabelProps={{ className: "add-formlabel" }}
                              FormHelperTextProps={{
                                className: "input_label_props",
                              }}
                              // onFocus={handleFocus}

                              sx={{ mb: 3 }}
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
                            <Index.Box className="box-login-text forgot bluebox-text forgot-main">
                              <PageIndex.Link to="/admin/forgot-password">
                                <Index.Typography
                                  variant="body1"
                                  // component="p"
                                  className="forgot_password"
                                  // sx={{display:bl}}
                                  // onClick={() =>
                                  //   navigate("/admin/forgot-password")
                                  // }
                                >
                                  Forgot password?
                                </Index.Typography>
                              </PageIndex.Link>
                            </Index.Box>
                            <Index.Box className="orange-btn login-btn login-btn-main">
                              {/* <PageIndex.Link to="/admin/dashboard"> */}
                              <Index.Button
                                type="submit"
                                data-testid="button"
                                variant="contained"
                                // disableRipple
                                // disabled={loading}
                                disabled={isDisabled}
                              >
                                Login
                              </Index.Button>
                              {/* </PageIndex.Link> */}
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

export default Login;
