import React, { useState } from "react";
import Index from "../../../Index";
import PageIndex from "../../../pageIndex";
import "../forgotPassword/ForgotPassword.css";
import { Api } from "../../../../config/Api";
import DataService from "../../../../config/DataService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = Index.useNavigate();

  // Initital values
  let initialValues = {
    email: "",
  };

  const handleFormSubmit = async (values, { setFieldValue }) => {
    setIsDisabled(true);
    const urlencoded = new URLSearchParams();
    urlencoded.append("email", values.email);
    DataService.post(Api.FORGOT_PASSWORD, urlencoded)
      .then((res) => {
        console.log(res, 26);
        toast.success(res.data.message);
        setIsDisabled(false);
        navigate("/admin/otp", {
          state: { id: res.data.data._id },
        });
      })
      .catch((e) => {
        console.log(e?.response?.data?.status, 34);
        toast.error(
          e.response.data.message ? e.response.data.message : e.message
        );
        if (e?.response?.data?.status === 404) {
          setFieldValue("email", "");
        }
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
                  <PageIndex.Link className="logo-admin-redirect" to="#">
                    <img src={PageIndex.Svg.userlogo} alt="logo" className="" />
                  </PageIndex.Link>
                </Index.Box>
                <Index.Box className="main-box">
                  <Index.Box>
                    <Index.Box className="box-text bluebox-text text-center mb-20px-details ">
                      <Index.Typography
                        variant="body1"
                        component="p"
                        className="mb-20px-details"
                      >
                        Forgot Password
                      </Index.Typography>
                    </Index.Box>
                    <Index.Box className="input-design-div admin-design-div login-input-design-div">
                      <PageIndex.Formik
                        enableReinitialize
                        onSubmit={handleFormSubmit}
                        initialValues={initialValues}
                        validationSchema={
                          PageIndex.validationSchemaForgotpassword
                        }
                      >
                        {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          setFieldValue,
                        }) => (
                          <Index.Stack
                            component="form"
                            spacing={2}
                            noValidate
                            autoComplete="off"
                            onSubmit={handleSubmit}
                          >
                            <Index.Box className="box-login-text1 bluebox-text1">
                              <Index.Typography component="p" className="">
                                Enter your email
                              </Index.Typography>
                            </Index.Box>
                            <Index.TextField
                              hiddenLabel
                              id="filled-hidden-label-normal"
                              placeholder="Enter email"
                              variant="filled"
                              className="admin-input-design input-placeholder"
                              name="email"
                              autoComplete="off"
                              onBlur={handleBlur}
                              onFocus={() => setLoading(false)}
                              value={values?.email}
                              onChange={handleChange}
                              helperText={touched.email && errors.email}
                              error={Boolean(errors.email && touched.email)}
                              sx={{ mb: 3 }}
                              onKeyDown={(e) => {
                                if (
                                  e.key === " " &&
                                  e.target.value.trim() === ""
                                ) {
                                  e.preventDefault();
                                }
                              }}
                            />
                            <Index.Box className="orange-btn login-btn login-btn-main">
                              <Index.Button
                                variant="contained"
                                type="submit"
                                // disableRipple
                                disabled={isDisabled}
                              >
                                Submit
                              </Index.Button>
                            </Index.Box>
                            <Index.Box
                              className="box-login-text forgot forgot-main bluebox-text"
                              sx={{ mt: 3 }}
                            >
                              <Link to="/admin/login">
                                <Index.Typography
                                  variant="body1"
                                  component="p"
                                  className="forgot_password"
                                >
                                  Back to login
                                </Index.Typography>
                              </Link>
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
};

export default ForgotPassword;
