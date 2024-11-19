import React, { useEffect, useState } from "react";
import Index from "../../../Index";
// import "./AddGame.css";
import PageIndex from "../../../pageIndex";
import { useLocation } from "react-router-dom";

export default function ViewQuery() {
  const [file, setFile] = useState();
  const [image, setImage] = useState("");
  const location = useLocation();

  const row = location?.state?.queryData;

  console.log(row, 14);

  function handleImage(image) {
    setFile(URL.createObjectURL(image));
  }

  //   let initialValues = {
  //     bannerName: "",
  //     imageBanner: "",
  //     bannerDescription: "",
  //   };

  const handleFormSubmit = (values) => {
    console.log(values, "values123456");
  };

  //   function handleChange(event) {
  //     setFile(event.target.files[0])
  //   }

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
                  Query Details
                </Index.Typography>
              </Index.Box>
            </Index.Box>
          </Index.Box>

          <PageIndex.Formik
            onSubmit={handleFormSubmit}
            // initialValues={initialValues}
            enableReinitialize
          >
            {({ values, handleChange, handleSubmit, setFieldValue }) => (
              <form onSubmit={handleSubmit}>
                <Index.Box className="view-query-manage-details">
                  <Index.Grid
                    container
                    columnSpacing={{ xs: 3, sm: 3, md: 3 }}
                    rowSpacing={{ xs: 3, sm: 3, md: 3 }}
                  >
                    {/* <Index.Grid item xs={12} sm={12} md={12}>
                    <Index.TextField type="file" />
                    <Index.Button type="submit">Upload</Index.Button>
                    </Index.Grid> */}

                    <Index.Grid item xs={12} sm={12} md={12}>
                      {/* <Index.Typography
                        variant="label"
                        component="label"
                        className="input-label"
                      >
                        Game Image
                      </Index.Typography> */}
                      <Index.Box className="input-design-div with-border">
                        <label htmlFor="upload-photo">
                          <Index.Box className="banner-border-profile ">
                            {image ? (
                              <>
                                <Index.Avatar
                                  alt="Remy Sharp"
                                  className="add-game-img"
                                  src={
                                    URL.createObjectURL(image) ||
                                    URL.createObjectURL(row?.queryDocument)
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
                                    row?.queryDocument &&
                                    process.env.REACT_APP_IMG +
                                      row?.queryDocument
                                  }
                                />
                              </>
                            )}
                          </Index.Box>
                        </label>
                      </Index.Box>
                    </Index.Grid>

                    <Index.Grid item xs={12} sm={4} md={4}>
                      <Index.Typography
                        variant="label"
                        component="label"
                        className="input-design-div with-border view-game-details-content view-mb-label"
                      >
                        Name
                      </Index.Typography>
                      <Index.Box className="input-label-box-admin">
                        {row?.userName}
                      </Index.Box>
                    </Index.Grid>
                    <Index.Grid item xs={12} sm={4} md={4}>
                      <Index.Typography
                        variant="label"
                        component="label"
                        className="input-design-div with-border view-game-details-content view-mb-label"
                      >
                        Email
                      </Index.Typography>
                      <Index.Box className="input-label-box-admin">
                        {row?.email}
                      </Index.Box>
                    </Index.Grid>
                    <Index.Grid item xs={12} sm={4} md={4}>
                      <Index.Typography
                        variant="label"
                        component="label"
                        className="input-design-div with-border view-game-details-content view-mb-label"
                      >
                        Number
                      </Index.Typography>
                      <Index.Box className="input-label-box-admin">
                        {row?.mobileNumber}
                      </Index.Box>
                    </Index.Grid>

                    <Index.Grid item xs={12} sm={12} md={12}>
                      <Index.Typography
                        variant="label"
                        component="label"
                        className="input-design-div with-border view-game-details-content view-mb-label"
                      >
                        Description
                      </Index.Typography>
                      <Index.Box className="textarea-label-box-admin">
                        {row?.description}
                      </Index.Box>
                    </Index.Grid>
                  </Index.Grid>
                  <Index.Box
                    className="common-button blue-button res-blue-button"
                    marginTop={5}
                  >
                    <PageIndex.Link
                      to="/admin/query"
                      className="no-text-decoration"
                      //onClick={(e) => handleEdit(e)}
                    >
                      {" "}
                      <Index.Button variant="contained" disableRipple>
                        <img
                          src={PageIndex.Png.back}
                          className="back-btn-spacing"
                        />
                        Back
                      </Index.Button>
                    </PageIndex.Link>
                  </Index.Box>
                </Index.Box>
              </form>
            )}
          </PageIndex.Formik>
        </Index.Box>
      </Index.Box>
    </>
  );
}
