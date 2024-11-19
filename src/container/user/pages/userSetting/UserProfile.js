import React, { useEffect, useState } from "react";
import { userEditProfileSchema } from "../../../../validation/Validation";
import DataService from "../../../../config/DataService";
import { Api } from "../../../../config/Api";
import { toast } from "react-toastify";
import Index from "../../../Index";
import PageIndex from "../../../pageIndex";
import Loader from "../../../../component/comman/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { userProfile } from "../../../../redux/user/userReducer";
import {
  parsePhoneNumber,
  parsePhoneNumberFromString,
  getCountries,
  formatIncompletePhoneNumber,
} from "libphonenumber-js";
import "react-phone-number-input/style.css";
import PhoneInput, {
  formatPhoneNumber,
  formatPhoneNumberIntl,
  isValidPhoneNumber,
} from "react-phone-number-input";
const UserProfile = () => {
  const userData = useSelector((state) => state?.UserReducer?.userData);
  const loading = useSelector((state) => state?.UserReducer?.loading);
  const [mobileError, setMobileError] = useState("");
  const [mobileChange, setMobileChange] = useState(false);
  const [mobileNo, setMobileNo] = useState("");

  let initialValues = {
    profileImage: "",
    name: userData?.fullName ? userData?.fullName : "",
    email: userData?.email ? userData?.email : "",
    mobileNumber: userData?.mobileNumber
      ? String(`+${userData?.countryCode || "91"}${userData?.mobileNumber}`)
      : "",
    // mobileNumber: userData?.mobileNumber ? userData?.mobileNumber : "",
    // country: userData?.country ? userData?.country : "",
    // countryCode: userData?.countryCode ? userData?.countryCode : "",
  };
  const [profileImage, setProfileImage] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const handleEditDetails = (values) => {
    console.log(values, 49);
    const formData = new FormData();
    let mobileNumberDetails = values.mobileNumber
      ? parsePhoneNumber(values.mobileNumber)
      : "";
    setIsDisabled(true);
    formData.append("fullName", values?.name);
    formData.append("profile", values?.profileImage);
    formData.append("email", values?.email);
    formData.append(
      "mobileNumber",
      mobileNumberDetails.nationalNumber
        ? mobileNumberDetails.nationalNumber
        : ""
    );
    formData.append(
      "countryCode",
      mobileNumberDetails?.countryCallingCode
        ? mobileNumberDetails?.countryCallingCode
        : ""
    );
    formData.append(
      "country",
      mobileNumberDetails?.country ? mobileNumberDetails?.country : ""
    );
    DataService.post(Api.User.EDIT_PROFILE, formData)
      .then((res) => {
        console.log(res, 61);
        setIsDisabled(false);
        toast.success(res?.data?.message, {
          toastId: "customId",
        });
        navigate("/user");
        dispatch(userProfile());
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message, {
          toastId: "customId",
        });
        setIsDisabled(false);
      });
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  return (
    <>
      <PageIndex.Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={userEditProfileSchema}
        onSubmit={handleEditDetails}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          touched,
          errors,
          setFieldTouched,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            {console.log(errors, 101)}
            {loading ? (
              <Loader />
            ) : (
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
                          sm: "span 12",
                          md: "span 12",
                          lg: "span 12",
                        }}
                        className="grid-column grid-user-col"
                      >
                        <Item className="grid-item">
                          <Index.Box className="update-profile-details mb-profile-user">
                            <Index.Box className="flex-center center-update-profile-details max-profile-content ml-profile-left">
                              <label htmlFor="upload-photo">
                                <input
                                  style={{ display: "none" }}
                                  id="upload-photo"
                                  name="profileImage"
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    if (e.target.files.length !== 0) {
                                      setProfileImage(e.target.files[0]);
                                      setFieldValue(
                                        "profileImage",
                                        e.target.files[0]
                                      );
                                    } else {
                                      setProfileImage("");
                                    }
                                  }}
                                />
                                <Index.Box className="max-profile-img-admin">
                                  <Index.Box className="profile-pos-details">
                                    <Index.EditIcon color="primary" />
                                  </Index.Box>
                                  {profileImage ? (
                                    <>
                                      <Index.Avatar
                                        alt="Remy Sharp"
                                        className="add-game-img"
                                        //src={URL.createObjectURL(image) || URL.createObjectURL(values.gameImage)  }
                                        src={
                                          profileImage &&
                                          URL.createObjectURL(profileImage)
                                        }
                                        // src={values?.gameImage ? process.env.REACT_APP_IMG +values?.gameImage : URL.createObjectURL(image)}
                                      />
                                    </>
                                  ) : (
                                    <>
                                      <Index.Avatar
                                        alt="Remy Sharp"
                                        className="add-game-img"
                                        src={
                                          userData?.profile &&
                                          process.env.REACT_APP_IMG +
                                            userData?.profile
                                        }
                                      />
                                    </>
                                  )}
                                </Index.Box>
                              </label>
                            </Index.Box>
                            {errors.profileImage && (
                              <Index.FormHelperText error>
                                {errors.profileImage}
                              </Index.FormHelperText>
                            )}
                          </Index.Box>
                        </Item>
                      </Index.Box>
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
                              Name
                            </Index.FormHelperText>
                            <Index.Box className="form-control-details-auth">
                              <Index.Box className="icon-position-rel">
                                <Index.TextField
                                  className="form-control custom-auth-user-control"
                                  type="text"
                                  name="name"
                                  placeholder="Enter name"
                                  onBlur={handleBlur}
                                  value={values?.name}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    const regex = /^[A-Za-z][A-Za-z\s]*$/;

                                    if (regex.test(value) || value === "") {
                                      setFieldValue("name", value.slice(0, 35));
                                    }
                                  }}
                                  inputProps={{
                                    maxLength: 35,
                                  }}
                                />

                                {errors.name && (
                                  <Index.FormHelperText error>
                                    {errors.name}
                                  </Index.FormHelperText>
                                )}
                              </Index.Box>
                            </Index.Box>
                          </Index.Box>
                        </Item>
                      </Index.Box>
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
                              Email
                            </Index.FormHelperText>
                            <Index.Box className="form-control-details-auth">
                              <Index.Box className="icon-position-rel">
                                <Index.TextField
                                  className="form-control custom-auth-user-control"
                                  name="email"
                                  placeholder="Enter email"
                                  helperText={touched.email && errors.email}
                                  error={Boolean(errors.email && touched.email)}
                                  onKeyDown={(e) => {
                                    if (
                                      e.key === " " &&
                                      e.target.value.trim() === ""
                                    ) {
                                      e.preventDefault();
                                    }
                                  }}
                                  onBlur={handleBlur}
                                  value={values?.email}
                                  onChange={handleChange}
                                />
                              </Index.Box>
                            </Index.Box>
                          </Index.Box>
                        </Item>
                      </Index.Box>
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
                              Mobile Number
                            </Index.FormHelperText>
                            <Index.Box className="form-control-details-auth">
                              <Index.Box className="icon-position-rel">
                                <PhoneInput
                                  className="form-control custom-auth-user-control profile-mobile-no-color"
                                  international
                                  countryCallingCodeEditable={false}
                                  defaultCountry="IN"
                                  value={values.mobileNumber}
                                  onChange={(e) => {
                                    setFieldValue("mobileNumber", e);
                                  }}
                                />
                              </Index.Box>
                              <div className="error-text text-start">
                                {errors.mobileNumber}
                              </div>
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
                        <Index.Box className="betting-card-btn-comman max-betting-card ">
                          <PageIndex.BlueButton
                            btnLabel="Submit"
                            className="blue-btn-content"
                            type="submit"
                            disabled={isDisabled}
                          />
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            )}
          </form>
        )}
      </PageIndex.Formik>
    </>
  );
};

export default UserProfile;
