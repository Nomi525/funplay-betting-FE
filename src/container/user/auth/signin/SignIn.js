import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import PagesIndex from "../../../pageIndex";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import {
  userLoginValidationSchema,
  userSignupValidationSchema,
} from "../../../../validation/Validation";
import { toast } from "react-toastify";
import DataService from "../../../../config/DataService";
import { Api } from "../../../../config/Api";
import en from "react-phone-number-input/locale/en";

export default function SignIn({
  handleOpenOtp,
  handleOpenPassword,
  handleCloseSignIn,
  setUserId,
  referCode,
  setSignUp,
  setEmail,
  setPassword,
  type,
  login,
  setLogin,
  show,
  setShow,
  setReferCode,
  setWalletAddress,
  handleProcess,
  email,
  setforgot,
  currency,
  setCurrency,
  setUserName,
  userName,
}) {
  // const { referralCode } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  let joinReferralCode = location?.search?.split("=")[1];
  const [userCurrencyValue, setUserCurrencyValue] = useState();
  const [isDisabledOtp, setIsDisabledOtp] = useState(false);
  const [isDisabledPassword, setIsDisabledPassword] = useState(false);
  const [country, setCountry] = useState("IN");
  let initialValues = {
    email: email || "",
    name: "",
    currencyValue: "",
  };
  const handleLogIn = () => {
    setLogin(true);
    setShow(true);
    handleProcess("signup");
  };

  if (!login) {
    setSignUp(true);
  } else {
    setSignUp(false);
  }

  const userCurrency = async () => {
    await DataService.get(Api.User.USER_CURRENCY)
      .then((res) => {
        setUserCurrencyValue(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    userCurrency();
  }, []);

  // user signup/login with otp call api
  const handleOtp = (values, errors) => {
    if (errors?.email || errors?.currencyValue || errors?.name) {
      return;
    }
    setIsDisabledOtp(true);
    const data = {
      email: values?.email,
      password: values?.password,
      fullName: values?.name,
      registerType: "OTP",
      type: login ? "signup" : "login",
    };

    if (joinReferralCode) {
      // console.log(joinReferralCode, 89);
      data.referralByCode = joinReferralCode;
      setLogin(true);
    }
    if (show) {
      data.currency = values.currencyValue;
    }

    DataService.post(Api.User.SIGNUP_USER, data)
      .then((res) => {
        localStorage.setItem("user-data", JSON.stringify(res.data.data));
        toast.success(res?.data?.message, {
          toastId: "customId",
        });
        setIsDisabledOtp(false);
        setUserId(res?.data?.data?._id);
        // setEmail(res?.data?.data?.email);
        // setEmail(values?.email);
        // setCurrency(values?.currencyValue);
        setWalletAddress("");
        setReferCode("");
        setTimeout(() => {
          handleCloseSignIn();
          handleOpenOtp();
          setEmail(values?.email);
          setPassword(values?.password);
          setUserName(values?.name);
          setCurrency(values?.currencyValue);

          setforgot("");
        }, 2000);
      })
      .catch((error) => {
        setIsDisabledOtp(false);
        toast.error(error?.response?.data?.message, {
          toastId: "customId",
        });
      });
  };

  // user signup/login with password call api
  const handlePassword = (values, errors) => {
    if (errors.email || errors.currencyValue || errors?.name) {
      return;
    }
    setIsDisabledPassword(true);
    const data = {
      email: values?.email,
      fullName: values?.name,
      type: login ? "signup" : "login",
      registerType: "Password",
    };

    if (joinReferralCode) {
      // console.log(joinReferralCode, 142);
      data.referralByCode = joinReferralCode;
    }

    if (show) {
      data.currency = values.currencyValue;
    }
    DataService.post(Api.User.LOGIN_USER, data)
      .then((res) => {
        if (res.data.status === 200 || res.data.status === 201) {
          handleOpenPassword();
          setEmail(values?.email);
        }
        setIsDisabledPassword(false);
      })
      .catch((error) => {
        setIsDisabledPassword(false);
        if (error?.response?.data?.status === 404) {
          if (!show) {
            toast.error(error?.response?.data?.message, {
              toastId: "customId",
            });
          } else {
            setEmail(values?.email);
            setPassword(values?.password);
            setUserName(values?.name);
            setCurrency(values?.currencyValue);
            handleOpenPassword();
          }
        } else if (error?.response?.data?.status === 400) {
          toast.error(error?.response?.data?.message, {
            toastId: "customId",
          });
        }
      });

    // setEmail(data?.email);
  };

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (joinReferralCode && token) {
      handleCloseSignIn();
      setLogin(false);
      setShow(false);
      navigate("/user")
    }
  }, [joinReferralCode]);

  return (
    <>
      <Index.Box className="signin-main-content">
        <Index.Box className="signin-content-details">
          <Index.Typography
            className="user-auth-title-comman"
            variant="h6"
            component="h6"
          >
            {login ? "Sign Up" : "Log In"}
          </Index.Typography>
          <Index.Typography
            className="user-auth-details-comman"
            variant="p"
            component="p"
          >
            {login ? " Sign up " : "Log in "}
            with your email / phone number.
          </Index.Typography>
        </Index.Box>
        {login ? (
          <PagesIndex.Formik
            enableReinitialize
            validateOnMount
            initialTouched={{ zip: true }}
            initialValues={initialValues}
            validationSchema={userSignupValidationSchema}
          >
            {({
              values,
              handleChange,
              handleSubmit,
              errors,
              setFieldValue,
              setFieldTouched,
              setErrors,
              touched,
              setTouched,
              handleBlur,
            }) => (
              <form>
                {console.log("signup condition: ", { errors })}
                <Index.Box className="comman-details-auth-user">
                  <Index.Box
                    className={`form-control-details-auth ${
                      !errors.email || !touched.email
                        ? "mb-30px-form"
                        : "mb-12px-form"
                    }`}
                  >
                    <Index.Box>
                      <Index.Box className="icon-position-rel">
                        {/* <PagesIndex.CountrySelect
                          labels={en}
                          value={country}
                          onChange={setCountry}
                        /> */}
                        <Index.TextField
                          className="form-control custom-auth-user-control form-control-icon-left"
                          placeholder="Enter your email / phone number"
                          name="email"
                          type="text"
                          value={values.email}
                          // onBlur={handleBlur}
                          onChange={(e) => {
                            if (
                              !isNaN(e.target.value) &&
                              e.target.value.toString().length <= 10
                            ) {
                              handleChange(e);
                            } else if (isNaN(e.target.value)) {
                              handleChange(e);
                            }
                          }}
                        />
                        <Index.Box className="icon-pos-top-control">
                          <img
                            src={PagesIndex.Svg.mailicon}
                            className="mail-icon-main"
                          />
                        </Index.Box>
                      </Index.Box>

                      {errors.email && touched.email && (
                        <Index.FormHelperText error>
                          {errors.email}
                        </Index.FormHelperText>
                      )}
                    </Index.Box>
                  </Index.Box>


                  <Index.Box
                    className={`form-control-details-auth ${
                      !errors.name || !touched.name
                        ? "mb-30px-form"
                        : "mb-12px-form"
                    }`}
                  >
                    {show || (joinReferralCode && referCode) ? (
                      <>
                        <Index.Box className="icon-position-rel">
                          <Index.TextField
                            className="form-control custom-auth-user-control form-control-icon-left"
                            placeholder="Enter your name"
                            type="text"
                            name="name"
                            value={values.name}
                            // onBlur={handleBlur}
                            onChange={(e) => {
                              let value = e?.target?.value;
                              // Remove non-alphabetic characters using a regular expression
                              value = value.replace(/[^A-Za-z]/gi, "");
                              if (value?.length <= 25) {
                                setFieldValue("name", value);
                              }
                            }}
                          />
                          <Index.Box className="icon-pos-top-control">
                            <img
                              src={PagesIndex.Svg.account}
                              className="mail-icon-main"
                            />
                          </Index.Box>
                        </Index.Box>
                        {errors.name && touched.name && (
                          <Index.FormHelperText error>
                            {errors.name}
                          </Index.FormHelperText>
                        )}{" "}
                      </>
                    ) : (
                      ""
                    )}
                  </Index.Box>

                  <Index.Box
                    className={`form-control-details-auth ${
                      !errors.password || !touched.password
                        ? "mb-30px-form"
                        : "mb-12px-form"
                    }`}
                  >
                    {show || (joinReferralCode && referCode) ? (
                      <>
                        <Index.Box className="icon-position-rel">
                          <Index.TextField
                            className="form-control custom-auth-user-control form-control-icon-left"
                            placeholder="Enter your password"
                            type="password"
                            name="password"
                            value={values.password}
                            onBlur={handleBlur}
                            onChange={(e) => {
                              let value = e?.target?.value;
                              console.log({e}," e password");
                              console.log({value},"password");
                              // Remove non-alphabetic characters using a regular expression
                              // value = value.replace(/[^A-Za-z]/gi, "");
                              if (value?.length <= 50) {
                                setFieldValue("password", value);
                              }
                            }}
                          />
                          <Index.Box className="icon-pos-top-control">
                            <img
                              src={PagesIndex.Svg.account}
                              className="mail-icon-main"
                            />
                          </Index.Box>
                        </Index.Box>
                        {errors.password && touched.password && (
                          <Index.FormHelperText error>
                            {errors.password}
                          </Index.FormHelperText>
                        )}{" "}
                      </>
                    ) : (
                      ""
                    )}
                  </Index.Box>

                  <Index.Box
                    className={`form-control-details-auth ${
                      !errors.currencyValue || !touched.currencyValue
                        ? "mb-30px-form"
                        : "mb-12px-form"
                    }`}
                  >
                    {show || (joinReferralCode && referCode) ? (
                      <Index.Box className=" signin-drop-details">
                        <Index.FormControl className="formcontrol_login sign-in-inner-form">
                          <Index.Select
                            onChange={handleChange}
                            value={values.currencyValue}
                            name="currencyValue"
                            className="currency-select-drop"
                            displayEmpty
                            renderValue={
                              values?.currencyValue !== ""
                                ? undefined
                                : () => "Select your currency"
                            }
                            // onBlur={handleBlur}
                          >
                            {userCurrencyValue?.map((ele) => {
                              return (
                                <Index.MenuItem
                                  key={ele?._id}
                                  value={ele?.currencyName}
                                  className="currency-select-menu"
                                >
                                  {ele?.currencyName}
                                </Index.MenuItem>
                              );
                            })}
                          </Index.Select>
                        </Index.FormControl>
                        {errors.currencyValue && touched.currencyValue && (
                          <Index.FormHelperText error>
                            {errors.currencyValue}
                          </Index.FormHelperText>
                        )}
                      </Index.Box>
                    ) : (
                      ""
                    )}
                  </Index.Box>
                  <Index.Box className="form-control-details-auth mb-30px-form">
                    {joinReferralCode && (
                      <Index.Box className="icon-position-rel">
                        <Index.TextField
                          className="form-control custom-auth-user-control form-control-icon-left"
                          placeholder="Enter your refferal code"
                          name="referCode"
                          value={joinReferralCode}
                          disabled
                        />
                        <Index.Box className="icon-pos-top-control">
                          <img
                            src={PagesIndex.Svg.mailicon}
                            className="mail-icon-main"
                          />
                        </Index.Box>
                      </Index.Box>
                    )}
                  </Index.Box>
                  <Index.Box className="btn-list-login-content">
                    {/* <Index.Box className="login-btn-list">
                      <PagesIndex.BlueButton
                        onClick={() => {
                          if (
                            errors.email ||
                            errors.name ||
                            errors.currencyValue
                          ) {
                            setFieldTouched("email", true);
                            setFieldTouched("name", true);
                            setFieldTouched("currencyValue", true);
                            return;
                          }
                          handlePassword(values, errors);
                          handleProcess("signup");
                        }}
                        // type="submit"
                        btnLabel={"Sign up with password"}
                        className="blue-btn-content"
                        disabled={
                          !values.currencyValue || !values.email || !values.name
                        }
                      />
                      {console.log("402: ", errors)}
                    </Index.Box>
                    <Index.Box className="login-btn-list-orlist">
                      <Index.Typography
                        className="or-title-list"
                        variant="p"
                        component="p"
                      >
                        OR
                      </Index.Typography>
                    </Index.Box> */}
                    <Index.Box className="login-btn-list">
                      <PagesIndex.BlueOutlineButton
                        onClick={() => {
                          if (
                            errors.email ||
                            errors.password ||
                            errors.name ||
                            errors.currencyValue
                          ) {
                            setFieldTouched("email", true);
                            setFieldTouched("password", true);
                            setFieldTouched("name", true);
                            setFieldTouched("currencyValue", true);
                            return;
                          }
                          handleOtp(values, errors);
                          handleProcess("signup");
                        }}
                        // type="submit"
                        disabled={
                          !values.currencyValue || !values.email || !values.name
                        }
                        btnLabel={"Sign Up With OTP"}
                        className="outline-blue-btn-content"
                      />
                    </Index.Box>
                    {show && (
                      <Index.Box className="sign-in-back-btn">
                        <Index.Link
                          className="back-to-login-details"
                          onClick={() => {
                            setLogin(false);
                            setShow(false);
                            handleProcess("login");
                            setFieldValue("email", "");
                            setFieldValue("password", "");
                            setFieldValue("name", "");
                            setFieldValue("currencyValue", "");
                            setErrors({});
                            setFieldTouched("email", false);
                            setFieldTouched("name", false);
                            setFieldTouched("password", false);
                            setFieldTouched("currencyValue", false);
                          }}
                        >
                          Back to Login?
                        </Index.Link>
                      </Index.Box>
                    )}

                    {/* <Index.Box className="club-register-link"></Index.Box> */}
                  </Index.Box>
                </Index.Box>
              </form>
            )}
          </PagesIndex.Formik>
        ) : (
          <PagesIndex.Formik
            enableReinitialize
            validateOnMount
            initialTouched={{ zip: true }}
            initialValues={initialValues}
            validationSchema={userLoginValidationSchema}
          >
            {({
              values,
              handleChange,
              handleSubmit,
              errors,
              setFieldValue,
              setFieldTouched,
              setErrors,
              touched,
              handleBlur,
            }) => (
              <form>
                {console.log("login condition", { touched, errors })}
                <Index.Box className="comman-details-auth-user">
                  <Index.Box className="form-control-details-auth mb-30px-form">
                    <Index.Box>
                      <Index.Box className="icon-position-rel">
                        <Index.TextField
                          className="form-control custom-auth-user-control form-control-icon-left"
                          placeholder="Enter your email / phone number"
                          name="email"
                          type="text"
                          value={values.email}
                          onBlur={handleBlur}
                          onChange={(e) => {
                            if (
                              !isNaN(e.target.value) &&
                              e.target.value.toString().length <= 10
                            ) {
                              handleChange(e);
                            } else if (isNaN(e.target.value)) {
                              handleChange(e);
                            }
                          }}
                        />
                        <Index.Box className="icon-pos-top-control">
                          <img
                            src={PagesIndex.Svg.mailicon}
                            className="mail-icon-main"
                          />
                        </Index.Box>
                      </Index.Box>

                      {errors.email && touched.email && (
                        <Index.FormHelperText error>
                          {errors.email}
                        </Index.FormHelperText>
                      )}
                    </Index.Box>
                  </Index.Box>
                  <Index.Box className="btn-list-login-content">
                    <Index.Box className="login-btn-list">
                      <PagesIndex.BlueButton
                        onClick={() => {
                          if (errors.email) {
                            setFieldTouched("email", true);
                            return;
                          }
                          handlePassword(values, errors);
                          handleProcess("login");
                        }}
                        // type="submit"
                        btnLabel={"Login with password"}
                        className="blue-btn-content"
                        disabled={isDisabledPassword || errors.email}
                      />
                    </Index.Box>
                    {/* <Index.Box className="login-btn-list-orlist">
                      <Index.Typography
                        className="or-title-list"
                        variant="p"
                        component="p"
                      >
                        OR
                      </Index.Typography>
                    </Index.Box>
                    <Index.Box className="login-btn-list">
                      <PagesIndex.BlueOutlineButton
                        onClick={() => {
                          if (errors.email) {
                            setFieldTouched("email", true);
                            return;
                          }
                          handleOtp(values, errors);
                          handleProcess("login");
                        }}
                        // type="submit"
                        disabled={isDisabledOtp || errors.email}
                        btnLabel={"Login With OTP"}
                        className="outline-blue-btn-content"
                      />
                    </Index.Box> */}
                    {!show && (
                      <Index.Box className="club-register-link">
                        <Index.Typography
                          component="p"
                          variant="p"
                          className="club-link-redirect"
                        >
                          <Link
                            onClick={() => {
                              handleLogIn();
                              handleProcess("signup");
                              setFieldValue("email", "");
                              setFieldValue("password", "");
                              setFieldValue("name", "");
                              setFieldValue("currencyValue", "");
                              setErrors({});
                              setFieldTouched("email", false);
                              setFieldTouched("password", false);
                              setFieldTouched("currencyValue", false);
                              setFieldTouched("name", false);
                            }}
                          >
                            Create Account
                          </Link>
                        </Index.Typography>
                      </Index.Box>
                    )}

                    {/* <Index.Box className="club-register-link"></Index.Box> */}
                  </Index.Box>
                </Index.Box>
              </form>
            )}
          </PagesIndex.Formik>
        )}
      </Index.Box>
    </>
  );
}
