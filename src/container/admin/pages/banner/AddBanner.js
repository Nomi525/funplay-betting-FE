import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import "./AddBanner.css";
import PageIndex from "../../../pageIndex";
import { toast } from "react-toastify";
import DataService from "../../../../config/DataService";
import { Api } from "../../../../config/Api";
import { ErrorMessage, Form } from "formik";
import { useLocation } from "react-router-dom";

const AddBanner = () => {
  const navigate = Index.useNavigate();
  const location = useLocation();
  const [disable, setDisable] = useState(false);
  const [imageBanner, setImageBanner] = useState("");
  const row = location?.state?.selectedData;
  const [loading, setLoading] = useState(false);

  // Initital values
  let initialValues = {
    bannerName: row?.bannerName ? row?.bannerName : "",
    imageBanner: row?.bannerImage[0] ? row?.bannerImage[0] : "",
    bannerDescription: row?.bannerDescription ? row?.bannerDescription : "",
  };

  // useEffect(() => {
  //   if (row) {
  //     setImageBanner(row?.bannerImage[0]);
  //   }
  // }, [row])

  // if (row) {
  //   initialValues = {
  //       bannerName: row?.bannerName ? row?.bannerName : "",
  //     gameImage: row?.gameImage ? row?.gameImage : "",
  //     imageBanner: "",
  //     bannerDescription: row?.bannerDescription ? row?.bannerDescription : "",
  //   };
  //   setImageBanner(row?.bannerImage);
  // }

  const handleFormSubmit = async (values) => {
    setLoading(true);
    const formdata = new FormData();
    formdata.append("bannerName", values?.bannerName);
    formdata.append("bannerDescription", values?.bannerDescription);
    formdata.append("bannerImage", values?.imageBanner);
    if (row?._id) {
      formdata.append("bannerId", row?._id);
    }
    DataService.post(Api.ADMIN_BANNER_ADD, formdata)
      .then((res) => {
        setLoading(false);
        toast.success(res?.data?.message, { toastId: "customId" });
        navigate("/admin/banner", {
          state: { id: res.data.data._id },
        });
      })
      .catch((e) => {
        toast.error(
          e.response?.data?.message ? e.response?.data?.message : e.message,
          {
            toastId: "customId",
          }
        );
        setLoading(false);
      });
  };

  return (
    <>
      <Index.Box className="page-content-box">
        <Index.Box className="barge-common-box">
          <Index.Box className="title-header">
            <Index.Box className="title-header-flex">
              <Index.Box className="title-main mb-10">
                <Index.Typography
                  variant="p"
                  component="p"
                  className="page-title"
                >
                  {row?._id ? "Edit Banner" : "Add Banner"}
                  {/* {params?.gameId? "Edit Game" : "Add Game"} */}
                  {/* {location?.state?.values ? "Add Game" : "Edit Game "}  */}
                </Index.Typography>
              </Index.Box>
            </Index.Box>
          </Index.Box>
          <PageIndex.Formik
            enableReinitialize
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={PageIndex.validationSchemaBanner}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              setErrors,
            }) => (
              <Index.Stack
                component="form"
                spacing={2}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
              >
                {console.log(values.imageBanner, "name")}
                <Index.Box className="">
                  <Index.Grid container spacing={3}>
                    <Index.Grid item xs={12} sm={12} md={12}>
                      <Index.Button>
                        <Index.Box className="input-design-div with-border">
                          <label
                            htmlFor="upload-photo"
                            className="upload-banner-details"
                          >
                            <input
                              style={{ display: "none" }}
                              id="upload-photo"
                              name="imageBanner"
                              type="file"
                              accept="image/*"
                              className="upload-banner-input"
                              onChange={(e) => {
                                if (e.target.files.length !== 0) {
                                  let file = e.target.files[0];
                                  const allowedTypes = [
                                    "image/jpeg",
                                    "image/jpg",
                                    "image/png",
                                  ];

                                  if (allowedTypes.includes(file.type)) {
                                    setFieldValue(
                                      "imageBanner",
                                      e.target.files[0]
                                    );
                                    setImageBanner(e.target.files[0]);
                                  } else {
                                    setErrors({
                                      ...errors,
                                      imageBanner:
                                        "Allow only jpg,jpeg,png file",
                                    });
                                    // setFieldValue("imageBanner", "");
                                    //setImageBanner("");
                                  }
                                } else {
                                  setImageBanner("");
                                }
                              }}
                            />

                            <Index.Box className="upload-banner-content">
                              {imageBanner ? (
                                <>
                                  <Index.Avatar
                                    // alt="Remy Sharp"
                                    className="add-game-img"
                                    // src={imageBanner && URL.createObjectURL(imageBanner)}
                                    src={
                                      values?.gameImage
                                        ? process.env.REACT_APP_IMG +
                                          values?.gameImage
                                        : URL.createObjectURL(imageBanner)
                                    }
                                  />
                                </>
                              ) : (
                                <>
                                  <Index.Avatar
                                    // alt="Remy Sharp"
                                    className="add-game-img"
                                    src={
                                      row?.bannerImage &&
                                      process.env.REACT_APP_IMG +
                                        row?.bannerImage
                                    }
                                  />
                                </>
                              )}
                              {errors.imageBanner && (
                                <Index.FormHelperText error>
                                  {errors.imageBanner}
                                </Index.FormHelperText>
                              )}
                            </Index.Box>
                          </label>
                        </Index.Box>
                      </Index.Button>
                    </Index.Grid>
                    <Index.Grid item xs={12} sm={12} md={12}>
                      <Index.Typography
                        variant="label"
                        component="label"
                        className="input-label"
                      >
                        Banner Name<span className="red-star">*</span>
                      </Index.Typography>
                      <Index.Box className="input-design-div with-border">
                        <Index.TextField
                          hiddenLabel
                          id="filled-hidden-label-normal"
                          placeholder="Banner Name"
                          variant="filled"
                          className="admin-input-design input-placeholder"
                          autoComplete="off"
                          name="bannerName"
                          type="text"
                          onBlur={handleBlur}
                          value={values.bannerName}
                          onChange={handleChange}
                          // onChange={(e) => {
                          //   const value = e.target.value;
                          //   const regex = /^[A-Za-z][A-Za-z\s]*$/;

                          //   if (regex.test(value) || value === "") {
                          //     setFieldValue("bannerName", value.slice(0, 50))
                          //   }
                          // }}
                          InputProps={{
                            inputProps: {
                              maxLength: 50,
                            },
                          }}
                          helperText={touched.bannerName && errors.bannerName}
                          error={Boolean(
                            errors.bannerName && touched.bannerName
                          )}
                          onKeyDown={(e) => {
                            if (e.key === " " && e.target.value.trim() === "") {
                              e.preventDefault();
                            }
                          }}
                        />
                      </Index.Box>
                    </Index.Grid>
                    <Index.Grid item xs={12} sm={12} md={12}>
                      <Index.Typography
                        variant="label"
                        component="label"
                        className="input-label width"
                      >
                        Banner Description<span className="red-star">*</span>
                      </Index.Typography>
                      <Index.Box className="input-design-div with-border banner-textarea main-content-textarea">
                        <Index.TextareaAutosize
                          type="text"
                          hiddenLabel
                          id="filled-hidden-label-normal"
                          placeholder="Banner Description"
                          variant="filled"
                          className="admin-input-design input-placeholder form-control custom-auth-user-control textarea-content-comman"
                          autoComplete="off"
                          name="bannerDescription"
                          onBlur={handleBlur}
                          value={values.bannerDescription}
                          onChange={handleChange}
                          // onChange={(e) => {
                          //   const value = e.target.value;
                          //   const regex = /^[A-Za-z][A-Za-z\s]*$/;

                          //   if (regex.test(value) || value === "") {
                          //     setFieldValue("bannerDescription", value.slice(0, 250))
                          //   }
                          // }}
                          // InputProps={{
                          //   inputProps: {
                          //     maxLength:250,
                          //   },
                          // }}
                          onKeyDown={(e) => {
                            if (e.key === " " && e.target.value.trim() === "") {
                              e.preventDefault();
                            }
                          }}
                          sx={{ mb: 3 }}
                        />
                        {touched.bannerDescription &&
                          errors.bannerDescription && (
                            <Index.FormHelperText error>
                              {errors.bannerDescription}
                            </Index.FormHelperText>
                          )}
                      </Index.Box>
                    </Index.Grid>
                  </Index.Grid>

                  <Index.Box className="add-game-button">
                    <Index.Box className="common-button blue-button flex-start save-btn add-submit-btn">
                      <Index.Button
                        variant="contained"
                        onClick={() => navigate("/admin/banner")}
                      >
                        <img
                          src={PageIndex.Png.back}
                          className="back-btn-spacing"
                        />
                        Back
                      </Index.Button>
                    </Index.Box>

                    <Index.Box className="common-button blue-button flex-start save-btn add-submit-btn">
                      <Index.Button
                        variant="contained"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? (
                          <Index.CircularProgress color="secondary" size={20} />
                        ) : row?._id ? (
                          "Update"
                        ) : (
                          "Submit"
                        )}
                      </Index.Button>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              </Index.Stack>
            )}
          </PageIndex.Formik>
        </Index.Box>
      </Index.Box>
    </>
  );
};
export default AddBanner;
