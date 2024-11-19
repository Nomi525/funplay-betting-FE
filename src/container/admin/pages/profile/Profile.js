import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import { styled } from "@mui/material/styles";
// import PageIndex from '../../../../component/PageIndex';
import { toast } from "react-toastify";
import DataService from "../../../../config/DataService";
import { Api } from "../../../../config/Api";
import { useLocation } from "react-router-dom";
import PageIndex from "../../../pageIndex";

const Item = styled(Index.Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Profile = () => {
  const navigate = Index.useNavigate();
  const location = useLocation();
  const [profileImage, setProfileImage] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  // const row = location?.state?.selectedData;
  const [profileList, setProfileList] = useState({});

  // Initital values

  let initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    address: "",
    profileImage: "",
    // gameImage: image ? image : row?.gameImage,
  };

  if (profileList) {
    initialValues = profileList;
  }

  const getAllProfileData = async () => {
    await DataService.get(Api.PROFILE_GET)
      .then((res) => {
        setProfileList(res.data.data);
      })
      .catch((e) => {
        toast.error(
          e.response?.data?.message ? e.response?.data?.message : e.message,
          {
            toastId: "customId",
          }
        );
      });
  };
  useEffect(() => {
    getAllProfileData();
  }, []);

  const handleFormSubmit = async (values) => {
    setIsDisabled(true);
    const formdata = new FormData();
    formdata.append("profile", values.profileImage);
    formdata.append("firstName", values.firstName);
    formdata.append("lastName", values.lastName);
    formdata.append("email", values.email);
    formdata.append("mobileNumber", values.mobileNumber);
    formdata.append("address", values.address);
    if (profileList?._id) {
      formdata.append("profile", profileList?._id);
    }
    DataService.post(Api.PROFILE_UPDATE, formdata)
      .then((res) => {
        setIsDisabled(false);
        toast.success(res.data.message);

        // setTimeout(()=>{

        // })
        navigate("/admin", {
          state: { flag: true },
        });
        //getAllProfileData();
      })
      .catch((e) => {
        toast.error(
          e.response.data.message ? e.response.data.message : e.message,
          {
            toastId: "customId",
          }
        );
        setIsDisabled(false);
        // navigate("/admin/login")
      });
  };

  return (
    <>
      <Index.Box className="p-15 background-ed profile-content flex-center ">
        <Index.Box className=" h-100 flex-center">
          <Index.Box className="card-center">
            <Index.Box className="card-main profile-card-main">
              <Index.Box className="title-main mb-15">
                <Index.Typography
                  variant="p"
                  component="p"
                  className="page-title"
                >
                  Update Profile
                </Index.Typography>
              </Index.Box>

              <PageIndex.Formik
                enableReinitialize
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={PageIndex?.profileValidationSchema}
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
                    <Index.Box className="">
                      <Index.Grid container>
                        <Index.Grid item xs={12} sm={12} md={12}>
                          <Index.Box className="mb-profile-details">
                            <Index.Box className="flex-center center-update-profile-details max-profile-content">
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
                                          profileList?.profile &&
                                          process.env.REACT_APP_IMG +
                                            profileList?.profile
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
                        </Index.Grid>

                        {/* <Index.Box className="profile-image text-center mb-20">
                                <img src={PageIndex.Png.user} alt="Image Preview" class="profile-img mb-15" />
                                    <Index.Box className="flex-center">
                                        <Index.Box className="common-button grey-button change-profile">
                                            <Index.Button variant="contained" type="button">
                                                Change Profile
                                            </Index.Button>
                                            <input
                                                type="file"
                                                className="change-profile-input"
                                                accept="image/*"
                                                name="image"
                                            />
                                        </Index.Box>
                                    </Index.Box>
                            </Index.Box> */}
                        <Index.Box className="profile-inner">
                          <Index.Box className="">
                            <Index.Grid
                              container
                              columnSpacing={{ xs: 3.75, sm: 3.75, md: 3.75 }}
                            >
                              <Index.Grid item xs={12} sm={6} md={6} lg={6}>
                                <Item className="dashboard-item">
                                  <Index.Box>
                                    <Index.Typography
                                      variant="label"
                                      component="label"
                                      className="input-label"
                                    >
                                      First Name
                                    </Index.Typography>
                                    <Index.Box className="input-design-div with-border mb-15">
                                      <Index.TextField
                                        hiddenLabel
                                        id="filled-hidden-label-normal"
                                        placeholder=" First Name "
                                        variant="filled"
                                        className="admin-input-design input-placeholder"
                                        autoComplete="off"
                                        name="firstName"
                                        // type="text"
                                        onBlur={handleBlur}
                                        value={values.firstName}
                                        // onChange={handleChange}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          const regex = /^[A-Za-z][A-Za-z\s]*$/;

                                          if (
                                            regex.test(value) ||
                                            value === ""
                                          ) {
                                            setFieldValue(
                                              "firstName",
                                              value.slice(0, 35)
                                            );
                                          }
                                        }}
                                        helperText={
                                          touched.firstName && errors.firstName
                                        }
                                        error={Boolean(
                                          errors.firstName && touched.firstName
                                        )}
                                        // InputProps={{
                                        //   inputProps: {
                                        //     maxLength:50,
                                        //   },
                                        // }}
                                        onKeyDown={(e) => {
                                          if (
                                            e.key === " " &&
                                            e.target.value.trim() === ""
                                          ) {
                                            e.preventDefault();
                                          }
                                        }}
                                      />
                                    </Index.Box>
                                  </Index.Box>
                                </Item>
                              </Index.Grid>
                              <Index.Grid item xs={12} sm={6} md={6} lg={6}>
                                <Item className="dashboard-item">
                                  <Index.Box>
                                    <Index.Typography
                                      variant="label"
                                      component="label"
                                      className="input-label"
                                    >
                                      Last Name
                                    </Index.Typography>
                                    <Index.Box className="input-design-div with-border mb-15">
                                      <Index.TextField
                                        hiddenLabel
                                        id="filled-hidden-label-normal"
                                        placeholder=" Last Name "
                                        variant="filled"
                                        className="admin-input-design input-placeholder custom-error-color"
                                        autoComplete="off"
                                        name="lastName"
                                        type="text"
                                        onBlur={handleBlur}
                                        value={values.lastName}
                                        // onChange={handleChange}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          const regex = /^[A-Za-z][A-Za-z\s]*$/;

                                          if (
                                            regex.test(value) ||
                                            value === ""
                                          ) {
                                            setFieldValue(
                                              "lastName",
                                              value.slice(0, 35)
                                            );
                                          }
                                        }}
                                        helperText={
                                          touched.lastName && errors.lastName
                                        }
                                        // error={Boolean(errors.lastName && touched.lastName)}
                                        // InputProps={{
                                        //   inputProps: {
                                        //     maxLength:50,
                                        //   },
                                        // }}
                                        onKeyDown={(e) => {
                                          if (
                                            e.key === " " &&
                                            e.target.value.trim() === ""
                                          ) {
                                            e.preventDefault();
                                          }
                                        }}
                                      />
                                    </Index.Box>
                                  </Index.Box>
                                </Item>
                              </Index.Grid>
                              <Index.Grid item xs={12} sm={6} md={6} lg={6}>
                                <Item className="dashboard-item">
                                  <Index.Box>
                                    <Index.Typography
                                      variant="label"
                                      component="label"
                                      className="input-label"
                                    >
                                      Email
                                    </Index.Typography>
                                    <Index.Box className="input-design-div with-border mb-15">
                                      <Index.TextField
                                        hiddenLabel
                                        id="filled-hidden-label-normal"
                                        placeholder=" Email "
                                        variant="filled"
                                        className="admin-input-design input-placeholder"
                                        autoComplete="off"
                                        name="email"
                                        type="email"
                                        onBlur={handleBlur}
                                        value={values.email}
                                        onChange={handleChange}
                                        helperText={
                                          touched.email && errors.email
                                        }
                                        error={Boolean(
                                          errors.email && touched.email
                                        )}
                                        onKeyDown={(e) => {
                                          if (
                                            e.key === " " &&
                                            e.target.value.trim() === ""
                                          ) {
                                            e.preventDefault();
                                          }
                                        }}
                                      />
                                    </Index.Box>
                                  </Index.Box>
                                </Item>
                              </Index.Grid>
                              <Index.Grid item xs={12} sm={6} md={6} lg={6}>
                                <Item className="dashboard-item">
                                  <Index.Box>
                                    <Index.Typography
                                      variant="label"
                                      component="label"
                                      className="input-label"
                                    >
                                      Mobile Number
                                    </Index.Typography>
                                    <Index.Box className="input-design-div with-border mb-15">
                                      <Index.TextField
                                        hiddenLabel
                                        id="filled-hidden-label-normal"
                                        placeholder=" Mobile Number "
                                        variant="filled"
                                        className="admin-input-design input-placeholder"
                                        autoComplete="off"
                                        name="mobileNumber"
                                        onBlur={handleBlur}
                                        value={values.mobileNumber}
                                        onChange={(e) => {
                                          !isNaN(e.target.value) &&
                                            handleChange(e);
                                        }}
                                        InputProps={{
                                          inputProps: {
                                            maxLength: 10,
                                          },
                                        }}
                                        helperText={
                                          touched.mobileNumber &&
                                          errors.mobileNumber
                                        }
                                        error={Boolean(
                                          errors.mobileNumber &&
                                            touched.mobileNumber
                                        )}
                                        onKeyDown={(e) => {
                                          if (
                                            e.key === " " &&
                                            e.target.value.trim() === ""
                                          ) {
                                            e.preventDefault();
                                          }
                                        }}
                                      />
                                    </Index.Box>
                                  </Index.Box>
                                </Item>
                              </Index.Grid>
                              <Index.Grid item xs={12}>
                                <Index.Box className="set-text-area mb-20">
                                  <Index.Typography
                                    variant="label"
                                    component="label"
                                    className="input-label"
                                  >
                                    Address
                                  </Index.Typography>
                                  <Index.Box className="set-textarea-box-top">
                                    <Index.TextareaAutosize
                                      className="set-textarea-box"
                                      aria-label="empty textarea"
                                      placeholder=" Address "
                                      variant="filled"
                                      autoComplete="off"
                                      name="address"
                                      type="text"
                                      onBlur={handleBlur}
                                      value={values.address}
                                      onChange={handleChange}
                                      helperText={
                                        touched.address && errors.address
                                      }
                                      onKeyDown={(e) => {
                                        if (
                                          e.key === " " &&
                                          e.target.value.trim() === ""
                                        ) {
                                          e.preventDefault();
                                        }
                                      }}
                                    />
                                    <Index.FormHelperText error>
                                      {touched.address && errors.address}
                                    </Index.FormHelperText>
                                  </Index.Box>
                                </Index.Box>
                              </Index.Grid>
                            </Index.Grid>
                          </Index.Box>
                        </Index.Box>
                      </Index.Grid>
                      <Index.Box className="common-button blue-button change-password-btn update_priofile_btn">
                        <Index.Button
                          variant="contained"
                          disableRipple
                          type="submit"
                          disabled={isDisabled}
                        >
                          Update Profile
                        </Index.Button>
                      </Index.Box>
                    </Index.Box>
                  </Index.Stack>
                )}
              </PageIndex.Formik>
            </Index.Box>
          </Index.Box>
        </Index.Box>
      </Index.Box>
    </>
  );
};
export default Profile;
