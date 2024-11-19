
import React, { useEffect, useState } from "react";
import Index from "../../../Index";
// import "./AddGame.css";
import PageIndex from "../../../pageIndex";
import { useLocation } from "react-router-dom";

export default function ViewBanner() {
    const [file, setFile] = useState();
    const [image, setImage] = useState("");
    const location = useLocation();
  
  const row = location?.state?.selectedData;

  // function handleImage(image) {
  //   setFile(URL.createObjectURL(image));
  // }
  
  let initialValues = {
    bannerName: "",
    imageBanner: "",
    bannerDescription: "",
  };

  const handleFormSubmit = (values) => {
    console.log(values, "values123456");
  }

  
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
                 Banner Details
                </Index.Typography>
              </Index.Box>
            </Index.Box>
          </Index.Box>

          <PageIndex.Formik 
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
          enableReinitialize>
            {({ values, handleChange, handleSubmit, setFieldValue }) => (
              <form onSubmit={handleSubmit}>
               
                <Index.Box className="view-details-content">
                  <Index.Grid container spacing={3}>
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
                          {/* <input
                            style={{ display: "none" }}
                            id="upload-photo"
                            name="uploadphoto"
                            type="file"
                            onChange={(e) => {
                              setFieldValue("uploadphoto", e.target.files[0]);
                              handleImage(e.target.files[0])
                            }}
                          /> */}
                          <Index.Box className="banner-border-profile">
                          {image ? (
                              <>
                                <Index.Avatar
                                  alt="Remy Sharp"
                                  className="add-game-img"
                                  src={URL.createObjectURL(image) || URL.createObjectURL(row?.bannerImage)  }
                                  // src={values?.gameImage ? process.env.REACT_APP_IMG + values?.gameImage : URL.createObjectURL(image)}
                                />
                              </>
                            ) : (
                              <>
                                <Index.Avatar
                                  alt="Remy Sharp"
                                  className="add-game-img"
                                  src={
                                    row?.bannerImage &&
                                    process.env.REACT_APP_IMG +row?.bannerImage
                                  }
                                />
                              </>
                            )}
                          </Index.Box>
                        </label>
                      </Index.Box>
                    </Index.Grid>
                    <Index.Grid item xs={12} sm={12} md={12} lg={12}>
                      <Index.Typography
                        variant="label"
                        component="label"
                       
                        className="input-design-div with-border view-game-details-content view-mb-label"
                      >
                        Banner Name
                      </Index.Typography>
                      <Index.Box  className=" input-label-box-admin">
                       {row?.bannerName}
                      </Index.Box>
                    </Index.Grid>
                    <Index.Grid item xs={12} sm={12} md={12} lg={12} >
                      <Index.Typography
                        variant="label"
                        component="label"
                        className="input-design-div with-border view-game-details-content view-mb-label"
                      >
                        Banner Description
                      </Index.Typography>
                      <Index.Box   className=" textarea-label-box-admin">
                       
                    {row?.bannerDescription}
                      </Index.Box>
                    </Index.Grid>
                  </Index.Grid>  
                  <Index.Box className="common-button blue-button res-blue-button" marginTop={3}>
                  <PageIndex.Link
                    to="/admin/banner"
                    className="no-text-decoration"
                    //onClick={(e) => handleEdit(e)}
                  >
                    {" "}
                    <Index.Button variant="contained" disableRipple>
                    <img src={PageIndex.Png.back} className="back-btn-spacing"/>
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
  )
}
