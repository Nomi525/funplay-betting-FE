import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Index from "../../../Index";
import PageIndex from "../../../pageIndex";
import Paper from "@mui/material/Paper";
import { styled, alpha } from "@mui/material/styles";
import DataService from "../../../../config/DataService";
import { Api } from "../../../../config/Api";
import { toast } from "react-toastify";
import Loader from "../../../../component/comman/loader/Loader";
import {
  userChangePassword,
  userEditProfileSchema,
  userPasswordValidationSchemaSignUp,
} from "../../../../validation/Validation";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  userProfile,
  userSetPassword,
} from "../../../../redux/user/userReducer";
import {
  userPasswordValidationSchema,
  userBankDetails,
} from "../../../../validation/Validation";
import UserProfile from "./UserProfile";
import ChangePassword from "./ChangePassword";
import TransationHistory from "../transationHistory/TransationHistory";
import UserBankDetailsList from "./UserBankDetailsList";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Index.Box className="tab-details-content-top">
          <Index.Typography className="tab-details-inner">
            {children}
          </Index.Typography>
        </Index.Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function UserSetting() {
  const [openConfirmDeactivate, setOpenConfirmDeactivate] = useState(false);
  const userData = useSelector((state) => state?.UserReducer?.userData);
  const loading = useSelector((state) => state?.UserReducer?.loading);
  const [value, setValue] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [page, setPage] = useState(0);
  const [searchedData, setSearchedData] = useState([]);
  const [profileList, setProfileList] = useState({});
  const [loader, setLoader] = useState(true);
  const confirmDeactivateOpen = () => setOpenConfirmDeactivate(true);
  const confirmDeactivateClose = () => setOpenConfirmDeactivate(false);
  const userActive = useSelector(
    (state) => state?.UserReducer?.userData?.isActive
  );
  const location = useLocation();
  let navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickOldPassword = () => setOldPassword((show) => !show);
  const handleClickConfirmPassword = () => setConfirmPassword((show) => !show);

  const label = { inputProps: { "aria-label": "Switch demo" } };
  // const [passwordError, setPasswordError] = useState("");

  let initialValues2 = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  let initialValues3 = {
    password: "",
    confirmPassword: "",
  };
  let initialValues4 = {
    bankName: "",
    branch: "",
    accountHolder: "",
    accountNumber: "",
    IFSCCode: "",
  };

  useEffect(() => {
    if (location.state && location.state.tab) {
      handleChange("", location?.state?.tab);
    }
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let dispatch = useDispatch();
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    setLoader(true);
    dispatch(userProfile())
      .then((res) => {
        setProfileList(res?.payload);
        setLoader(false);
      })
      .catch((error) => {});
  }, []);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

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

  const handleSetPassword = (values) => {
    const data = {
      password: values.password,
    };

    // if (values?.password === "") {
    // setPasswordError("Password is required");
    // setConfirmPassword("Confirm Password is required")
    //   } else if (!values?.password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
    //     setPasswordError("Password is not valid");
    // }

    // setPasswordError("");
    dispatch(userSetPassword(data))
      .then((res) => {
        // toast.success(res?.data?.message);
        // setPassword(res?.data?.data?.password)
        navigate("/user");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message, {
          toastId: "customId",
        });
      });
  };

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));
  const StyledInputBase = styled(Index.InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));

  const handleSearch = (searched) => {
    if (!searched) return setSearchedData();
    setSearchedData();
    // userlist.filter(
    //   (item) =>
    //     item?.gameName?.toLowerCase().includes(searched.toLowerCase())

    // )
    setPage(0);
  };

  const handleBankDetails = (values, errors) => {
    console.log(values, 237);
    const data = {
      bankName: values.bankName,
      branch: values.branch,
      accountHolder: values.accountHolder,
      accountNumber: parseInt(values.accountNumber),
      IFSCCode: values.IFSCCode,
    };
    DataService.post(Api.User.EDIT_PROFILE, { bankDetails: data })
      .then((res) => {
        console.log(res, 248);
        toast.success(res?.data?.message, {
          toastId: "customId",
        });
        // navigate("/user/setting", {
        //   state: { tab: userDetail?.password ? 2 : 1 },
        // });
        // navigate("/user/setting", {
        //   state: { value: 2 },
        // });
        setValue(3);
        dispatch(userProfile());
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message, {
          toastId: "customId",
        });
      });
  };

  const handleDeactivateAccount = () => {
    DataService.post(Api.User.DELETE_USER)
      .then((res) => {
        // setDelateUSer(res?.data)
        toast.success(res?.data?.message, {
          toastId: "customId",
        });
        confirmDeactivateClose();
        navigate("/user", { state: { accountStatus: "deactivated" } });
        // dispatch(logout());
        // setSignOut(false);
        // navigate("/user")
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message, {
          toastId: "customId",
        });
      });
  };
  console.log(userData?.password, "userData?.password");
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Index.Box className="user-setting-details">
          <Index.Box className="user-details-content">
            <Index.Box className="user-title-deatils">
              <Index.Typography
                component="h5"
                variant="h5"
                className="account-user-title"
              >
                Account Settings
              </Index.Typography>
            </Index.Box>

            <Index.Box className="user-details-setting-details">
              <Index.Box className="tab-details-setting">
                <Index.Box sx={{ width: "100%" }} className="tab-account-user">
                  <Index.Box
                    sx={{ borderBottom: 1, borderColor: "divider" }}
                    className="tab-border-user"
                  >
                    <Index.Tabs
                      value={value}
                      onChange={handleChange}
                      variant="scrollable"
                      scrollButtons
                      allowScrollButtonsMobile
                      aria-label="scrollable force tabs example"
                      className="tab-content-user"
                    >
                      <Index.Tab
                        label="Update Profile"
                        {...a11yProps(0)}
                        className="tab-btn-details"
                      />
                      {userData?.password && (
                        <Index.Tab
                          label="Change Password"
                          {...a11yProps(1)}
                          className="tab-btn-details"
                        />
                      )}
                      {!userData?.password && (
                        <Index.Tab
                          label="Set Password"
                          {...a11yProps(2)}
                          className="tab-btn-details"
                        />
                      )}
                      <Index.Tab
                        label="Bank Details"
                        {...a11yProps(3)}
                        className="tab-btn-details"
                      />
                      <Index.Tab
                        label="Bank Details List"
                        {...a11yProps(4)}
                        className="tab-btn-details"
                      />
                      {window.innerWidth <= 767 && (
                        <Index.Tab
                          label="Transaction History"
                          {...a11yProps(5)}
                          className="tab-btn-details"
                        />
                      )}

                      <Index.Tab
                        label="Account Status"
                        {...a11yProps(6)}
                        className="tab-btn-details"
                      />
                    </Index.Tabs>
                  </Index.Box>
                  {/* update profile */}
                  <CustomTabPanel
                    value={value}
                    index={0}
                    className="tabpanel-user-details"
                  >
                    <UserProfile />
                  </CustomTabPanel>
                  {/* change password */}
                  {userData?.password ? (
                    <CustomTabPanel
                      value={value}
                      index={1}
                      className="tabpanel-user-details"
                    >
                      <ChangePassword />
                    </CustomTabPanel>
                  ) : (
                    ""
                  )}
                  {/* set password */}
                  {!userData?.password ? (
                    <CustomTabPanel
                      value={value}
                      index={userData?.password ? 2 : 1}
                      className="tabpanel-user-details"
                    >
                      <PageIndex.Formik
                        enableReinitialize
                        initialValues={initialValues3}
                        onSubmit={handleSetPassword}
                        validationSchema={userPasswordValidationSchemaSignUp}
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
                                <Index.Box
                                  sx={{ width: 1 }}
                                  className="grid-main"
                                >
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
                                        md: "span 6",
                                        lg: "span 6",
                                      }}
                                      className="grid-column grid-user-col"
                                    >
                                      <Item className="grid-item">
                                        <Index.Box className="form-group-main deposit-form-content setting-pass-main mb-30px-form">
                                          <Index.FormHelperText className="title-label-comman-user">
                                            Password
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
                                                      name="password"
                                                      placeholder="Password"
                                                      data-testid="email-input"
                                                      aria-label="password"
                                                      helperText={
                                                        touched.password &&
                                                        errors.password
                                                      }
                                                      onKeyDown={(e) => {
                                                        if (
                                                          e.key === " " &&
                                                          e.target.value.trim() ===
                                                            ""
                                                        ) {
                                                          e.preventDefault();
                                                        }
                                                      }}
                                                      error={Boolean(
                                                        errors.password &&
                                                          touched.password
                                                      )}
                                                      onBlur={handleBlur}
                                                      value={values.password}
                                                      onChange={handleChange}
                                                      type={
                                                        showPassword
                                                          ? "text"
                                                          : "password"
                                                      }
                                                      autoComplete="off"
                                                      inputProps={{
                                                        className:
                                                          "input_props",
                                                      }}
                                                      InputLabelProps={{
                                                        className:
                                                          "add-formlabel",
                                                      }}
                                                      InputProps={{
                                                        // <-- This is where the toggle button is added.
                                                        endAdornment: (
                                                          <Index.InputAdornment position="end">
                                                            <Index.IconButton
                                                              aria-label="toggle password visibility"
                                                              onClick={
                                                                handleClickShowPassword
                                                              }
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
                                                  {/* {password && (
                                              <Index.FormHelperText error>
                                                {password}
                                              </Index.FormHelperText>
                                            )} */}
                                                </Index.Box>
                                              </Index.Box>
                                            </Index.Box>
                                          </Index.Box>
                                        </Index.Box>
                                      </Item>
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
                                                      onKeyDown={(e) => {
                                                        if (
                                                          e.key === " " &&
                                                          e.target.value.trim() ===
                                                            ""
                                                        ) {
                                                          e.preventDefault();
                                                        }
                                                      }}
                                                      error={Boolean(
                                                        errors.confirmPassword &&
                                                          touched.confirmPassword
                                                      )}
                                                      onBlur={handleBlur}
                                                      value={
                                                        values.confirmPassword
                                                      }
                                                      onChange={handleChange}
                                                      type={
                                                        confirmPassword
                                                          ? "text"
                                                          : "password"
                                                      }
                                                      autoComplete="off"
                                                      inputProps={{
                                                        className:
                                                          "input_props",
                                                      }}
                                                      InputLabelProps={{
                                                        className:
                                                          "add-formlabel",
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
                                                  {/* {confirmPassword && (
                                              <Index.FormHelperText error>
                                                {confirmPassword}
                                              </Index.FormHelperText>
                                            )} */}
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
                                          type="submit"
                                          btnLabel="Submit"
                                          className="blue-btn-content"
                                          // onClick={() => handleSetPassword(values)}
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
                    </CustomTabPanel>
                  ) : (
                    ""
                  )}
                  {/* bank details form */}
                  <CustomTabPanel
                    value={value}
                    index={2}
                    className="tabpanel-user-details"
                  >
                    <PageIndex.Formik
                      enableReinitialize
                      initialValues={initialValues4}
                      validationSchema={userBankDetails}
                      onSubmit={handleBankDetails}
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
                          {console.log(values, 646)}
                          <Index.Box className="tab-main-card-content">
                            <Index.Box className="tab-main-pd-content">
                              <Index.Box
                                sx={{ width: 1 }}
                                className="grid-main"
                              >
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
                                          Bank Name
                                        </Index.FormHelperText>
                                        <Index.Box className="input-design-div admin-design-div input-design-div-set-back setting-password">
                                          <Index.Box className="input-details-main">
                                            <Index.Box className="input-box cm-search-box">
                                              <Index.Box className="form-group">
                                                <Index.Box className="form-group pass_group_main">
                                                  <Index.TextField
                                                    variant="filled"
                                                    className="admin-input-design input-placeholder"
                                                    placeholder="Bank Name"
                                                    type="text"
                                                    name="bankName"
                                                    onBlur={handleBlur}
                                                    value={values.bankName}
                                                    // onChange={handleChange}
                                                    onChange={(e) => {
                                                      let value =
                                                        e?.target?.value;
                                                      if (value?.length <= 40) {
                                                        setFieldValue(
                                                          "bankName",
                                                          value
                                                        );
                                                      }
                                                    }}
                                                    onKeyDown={(e) => {
                                                      if (
                                                        e.key === " " &&
                                                        e.target.value.trim() ===
                                                          ""
                                                      ) {
                                                        e.preventDefault();
                                                      }
                                                    }}
                                                  />
                                                  {errors.bankName &&
                                                    touched.bankName && (
                                                      <Index.FormHelperText
                                                        error
                                                      >
                                                        {errors.bankName}
                                                      </Index.FormHelperText>
                                                    )}
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
                                          Branch
                                        </Index.FormHelperText>
                                        <Index.Box className="input-design-div admin-design-div input-design-div-set-back setting-password">
                                          <Index.Box className="input-details-main">
                                            <Index.Box className="input-box cm-search-box">
                                              <Index.Box className="form-group">
                                                <Index.Box className="form-group pass_group_main">
                                                  <Index.TextField
                                                    variant="filled"
                                                    className="admin-input-design input-placeholder"
                                                    type="text"
                                                    name="branch"
                                                    placeholder="Branch"
                                                    onBlur={handleBlur}
                                                    value={values.branch}
                                                    // onChange={handleChange}
                                                    onChange={(e) => {
                                                      let value =
                                                        e?.target?.value;
                                                      if (
                                                        value?.length <= 100
                                                      ) {
                                                        setFieldValue(
                                                          "branch",
                                                          value
                                                        );
                                                      }
                                                    }}
                                                    onKeyDown={(e) => {
                                                      if (
                                                        e.key === " " &&
                                                        e.target.value.trim() ===
                                                          ""
                                                      ) {
                                                        e.preventDefault();
                                                      }
                                                    }}
                                                  />
                                                  {errors.branch &&
                                                    touched.branch && (
                                                      <Index.FormHelperText
                                                        error
                                                      >
                                                        {errors.branch}
                                                      </Index.FormHelperText>
                                                    )}
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
                                          Account Holder Name
                                        </Index.FormHelperText>
                                        <Index.Box className="input-design-div admin-design-div input-design-div-set-back setting-password">
                                          <Index.Box className="input-details-main">
                                            <Index.Box className="input-box cm-search-box">
                                              <Index.Box className="form-group">
                                                <Index.Box className="form-group pass_group_main">
                                                  <Index.TextField
                                                    variant="filled"
                                                    className="admin-input-design input-placeholder"
                                                    type="text"
                                                    name="accountHolder"
                                                    placeholder="Account Holder Name"
                                                    onBlur={handleBlur}
                                                    value={values.accountHolder}
                                                    // onChange={handleChange}
                                                    onChange={(e) => {
                                                      let value =
                                                        e?.target?.value;
                                                      if (value?.length <= 40) {
                                                        setFieldValue(
                                                          "accountHolder",
                                                          value
                                                        );
                                                      }
                                                    }}
                                                    // inputProps={{
                                                    //   maxLength: 17,
                                                    // }}
                                                    onKeyDown={(e) => {
                                                      if (
                                                        e.key === " " &&
                                                        e.target.value.trim() ===
                                                          ""
                                                      ) {
                                                        e.preventDefault();
                                                      }
                                                    }}
                                                  />
                                                  {errors.accountHolder &&
                                                    touched.accountHolder && (
                                                      <Index.FormHelperText
                                                        error
                                                      >
                                                        {errors.accountHolder}
                                                      </Index.FormHelperText>
                                                    )}
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
                                          Account Number
                                        </Index.FormHelperText>
                                        <Index.Box className="input-design-div admin-design-div input-design-div-set-back setting-password">
                                          <Index.Box className="input-details-main">
                                            <Index.Box className="input-box cm-search-box">
                                              <Index.Box className="form-group">
                                                <Index.Box className="form-group pass_group_main">
                                                  <Index.TextField
                                                    variant="filled"
                                                    className="admin-input-design input-placeholder"
                                                    type="number"
                                                    onWheel={(event) =>
                                                      event.target.blur()
                                                    }
                                                    name="accountNumber"
                                                    placeholder="Account Number"
                                                    onBlur={handleBlur}
                                                    value={values.accountNumber}
                                                    // onChange={handleChange}
                                                    // inputProps={{
                                                    //   maxLength: 17,
                                                    // }}
                                                    onChange={(e) => {
                                                      let value =
                                                        e?.target?.value;
                                                      if (value?.length <= 14) {
                                                        setFieldValue(
                                                          "accountNumber",
                                                          value
                                                        );
                                                      }
                                                    }}
                                                    onKeyPress={(e) => {
                                                      if (e.key === "e") {
                                                        e.preventDefault();
                                                      }
                                                    }}
                                                    onKeyDown={(e) => {
                                                      if (
                                                        e.key === " " &&
                                                        e.target.value.trim() ===
                                                          ""
                                                      ) {
                                                        e.preventDefault();
                                                      }
                                                    }}
                                                  />
                                                  {errors.accountNumber &&
                                                    touched.accountNumber && (
                                                      <Index.FormHelperText
                                                        error
                                                      >
                                                        {errors.accountNumber}
                                                      </Index.FormHelperText>
                                                    )}
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
                                          IFSC Code
                                        </Index.FormHelperText>
                                        <Index.Box className="input-design-div admin-design-div input-design-div-set-back setting-password">
                                          <Index.Box className="input-details-main">
                                            <Index.Box className="input-box cm-search-box">
                                              <Index.Box className="form-group">
                                                <Index.Box className="form-group pass_group_main">
                                                  <Index.TextField
                                                    variant="filled"
                                                    className="admin-input-design input-placeholder"
                                                    type="nmber"
                                                    name="IFSCCode"
                                                    placeholder="IFSC Code"
                                                    onBlur={handleBlur}
                                                    value={values.IFSCCode}
                                                    onChange={handleChange}
                                                    inputProps={{
                                                      maxLength: 11,
                                                    }}
                                                    onKeyDown={(e) => {
                                                      if (
                                                        e.key === " " &&
                                                        e.target.value.trim() ===
                                                          ""
                                                      ) {
                                                        e.preventDefault();
                                                      }
                                                    }}
                                                  />
                                                  {errors.IFSCCode &&
                                                    touched.IFSCCode && (
                                                      <Index.FormHelperText
                                                        error
                                                      >
                                                        {errors.IFSCCode}
                                                      </Index.FormHelperText>
                                                    )}
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
                                        //   handleBankDetails(values, errors)
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
                  </CustomTabPanel>

                  {/* bank details table list */}
                  <CustomTabPanel
                    value={value}
                    index={3}
                    className="tabpanel-user-details"
                  >
                    {/* <Index.Box className="page-content-box">
                      <Index.Box className="barge-common-box">
                        <Index.Box className="title-header">
                          <Index.Box className="title-header-flex res-title-header-flex flex-w-100-transaction">
                            <Index.Box className="title-main">
                              <Index.Typography
                                variant="p"
                                component="p"
                                className="page-title"
                              >
                                Bank Details fdg
                              </Index.Typography>
                            </Index.Box>
                            <Index.Box className="d-flex align-items-center res-set-search">
                              <Search className="search admin-search-comman">
                                <StyledInputBase
                                  placeholder="Search"
                                  inputProps={{ "aria-label": "search" }}
                                  onChange={(e) => handleSearch(e.target.value)}
                                />
                              </Search>
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>

                        <Index.Box className="main-bank-details-tables">
                          <Index.TableContainer
                            component={Index.Paper}
                            className="table-container bank-details-conatiner"
                          >
                            <Index.Table
                              aria-label="simple table"
                              className="table-design-main barge-table bank-details-table"
                            >
                              <Index.TableHead className="bankdetails-thead">
                                <Index.TableRow className="bankdetails-tr">
                                  <Index.TableCell className="bankdetails-th">
                                    User Name
                                  </Index.TableCell>
                                  <Index.TableCell className="bankdetails-th">
                                    {" "}
                                    Bank Name
                                  </Index.TableCell>
                                  <Index.TableCell className="bankdetails-th">
                                    Branch
                                  </Index.TableCell>
                                  <Index.TableCell
                                    className="bankdetails-th"
                                    align="left"
                                  >
                                    {" "}
                                    Account Holder Name
                                  </Index.TableCell>
                                  <Index.TableCell
                                    align="left"
                                    className="bankdetails-th"
                                  >
                                    {" "}
                                    Account Number
                                  </Index.TableCell>
                                  <Index.TableCell
                                    align="left"
                                    className="bankdetails-th"
                                  >
                                    {" "}
                                    IFSC Code
                                  </Index.TableCell>
                                </Index.TableRow>
                              </Index.TableHead>
                              <Index.TableBody>
                                <Index.TableRow className="bankdetails-tr">
                                  <Index.TableCell
                                    align="left"
                                    className="bankdetails-td"
                                  >
                                    User
                                  </Index.TableCell>
                                  <Index.TableCell
                                    align="left"
                                    className="bankdetails-td"
                                  >
                                    SBI
                                  </Index.TableCell>
                                  <Index.TableCell
                                    align="left"
                                    className="bankdetails-td"
                                  >
                                    Satellite Ahmedabad, Gujarat
                                  </Index.TableCell>
                                  <Index.TableCell
                                    align="left"
                                    className="bankdetails-td"
                                  >
                                    -
                                  </Index.TableCell>
                                  <Index.TableCell
                                    align="left"
                                    className="bankdetails-td"
                                  >
                                    -
                                  </Index.TableCell>

                                  <Index.TableCell
                                    align="left"
                                    className="bankdetails-td"
                                  >
                                    1212121212
                                  </Index.TableCell>
                                </Index.TableRow>
                              </Index.TableBody>
                            </Index.Table>
                          </Index.TableContainer>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box> */}
                    <UserBankDetailsList />
                  </CustomTabPanel>
                  {/* transaction history */}
                  {window.innerWidth <= 767 && (
                    <CustomTabPanel
                      value={value}
                      index={window.innerWidth <= 767 ? 4 : 5}
                      className="tabpanel-user-details dnone-tab-transaction-mobile"
                    >
                      <TransationHistory />
                    </CustomTabPanel>
                  )}
                  {/* activate account */}
                  <CustomTabPanel
                    value={value}
                    index={window.innerWidth <= 767 ? 5 : 4}
                    className="tabpanel-user-details"
                  >
                    <Index.Box className="flex-activaed-details">
                      <Index.Typography> Deactivate Account </Index.Typography>
                      <Index.Switch
                        {...label}
                        className="switch-details-account"
                        onClick={confirmDeactivateOpen}
                        value={userActive}
                        checked={!userActive}
                      />
                    </Index.Box>
                  </CustomTabPanel>
                </Index.Box>
              </Index.Box>
            </Index.Box>
          </Index.Box>
          {/* deactivate account modal */}
          <Index.Modal
            open={openConfirmDeactivate}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="modal-comman-details"
            onClose={confirmDeactivateClose}
          >
            <Index.Box sx={style} className="modal-comman-inner-style">
              <Index.Box className="modal-cancel-btn">
                <Index.Button
                  className="btn btn-cancel"
                  onClick={confirmDeactivateClose}
                >
                  <img
                    src={PageIndex.Svg.cancelmodal}
                    className="cancel-modal"
                    alt="modal-cancel"
                  />
                </Index.Button>
              </Index.Box>
              <Index.Box className="body-switch-content">
                <Index.Typography
                  component="p"
                  variant="p"
                  className="switch-deactived-title"
                >
                  {" "}
                  Are you sure, you want to deactivate account ?
                </Index.Typography>
              </Index.Box>

              <Index.Box className="flex-end-edit-modal">
                <PageIndex.BlueButton
                  btnLabel="Cancel"
                  className=" blue-btn-content"
                  onClick={confirmDeactivateClose}
                />
                <PageIndex.BlueOutlineButton
                  btnLabel="Ok"
                  className="outline-blue-btn-content"
                  onClick={handleDeactivateAccount}
                />
              </Index.Box>
            </Index.Box>
          </Index.Modal>
        </Index.Box>
      )}
    </>
  );
}
