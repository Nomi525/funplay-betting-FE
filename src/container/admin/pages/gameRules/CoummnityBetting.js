import React, { useEffect, useState } from "react";
import Index from "../../../../component/Index";
import PageIndex from "../../../pageIndex";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Formik } from "formik";
import { toast } from "react-toastify";
import DataService from "../../../../config/DataService";
import { Api } from "../../../../config/Api";

const CoummnityBetting = () => {
  const [loading, setLoading] = useState(false);

  const [initialGameRule, setInitialGameRule] = useState({
    // gameId:"",
    description: ""
  });

  const handleFormSubmit = async (values, action) => {
    const urlencoded = new URLSearchParams();
    urlencoded.append("gameName","Coummnity Betting");
    urlencoded.append("gameRules", values?.description);
    //  urlencoded.append("_id", values.gameId);
    DataService.post(Api.ADMIN_GAME_RULES_ADD, urlencoded)
      .then((res) => {
        action.resetForm();
        toast.success(res?.data?.message,{
          toastId:"customId"
        });
        getAllGamesRules();
      })
      .catch((e) => {
        toast.error(
          e.response.data.message ? e.response.data.message : e.message,{
            toastId:"customId"
          }
        );
      });
  };

  const getAllGamesRules = async() => {
 await   DataService.get(Api.ADMIN_GAME_RULES).then((res) => {
      const data = res.data?.data;
      const game = data?.find((row)=>row?.gameName == "Coummnity Betting");
      if(game){
        setInitialGameRule({
          description:game?.gameRules
        });
      }
    });
  };

  useEffect(() => {
     getAllGamesRules();
  }, []);

  return (
    <>
      {" "}
      {/* <Index.Box className="admin-comman-title-right">
        <Index.Typography className="admin-page-title" variant="h5">
          Coummnity Betting
        </Index.Typography>
      </Index.Box> */}
      <Index.Box className="input-design-div admin-design-div login-input-design-div">
        <PageIndex.Formik
          enableReinitialize
          initialValues={initialGameRule}
          validationSchema={PageIndex.validationSchemaGameRules}
          onSubmit={handleFormSubmit}
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
            <>
              <Index.Stack
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
              >
                <Index.Box className="barge-common-box p-0-inner-tab">
                  <Index.Box className="">
                    <Index.Box className="grid-row cms-page-row">
                      <Index.Box className="grid-main">
                        <Index.Box
                          display="grid"
                          gridTemplateColumns="repeat(12, 1fr)"
                          gap={{ xs: 2, sm: 2, md: 0, lg: 0 }}
                        >
                          {/* <Index.Box
                            gridColumn={{
                              xs: "span 12",
                              sm: "span 5",
                              md: "span 4",
                              lg: "span 10",
                            }}
                            className="grid-column"
                          >
                            <Index.Box className="input-box">
                              <Index.Typography
                                variant="label"
                                component="label"
                                className="input-label"
                              >
                                Title
                              </Index.Typography>
                              <Index.Box className="form-group cms-input-box">
                                <Index.TextField
                                  fullWidth
                                  id="title"
                                  size="small"
                                  className="cms-form-control form-control"
                                  placeholder="Enter title"
                                  name="title"
                                  onBlur={handleBlur}
                                  onFocus={() => setLoading(false)}
                                  value={values.title}
                                  onChange={handleChange}
                                  helperText={touched.title && errors.title}
                                  error={Boolean(errors.title && touched.title)}
                                  sx={{ mb: 3 }}
                                />
                              </Index.Box>
                            </Index.Box>
                          </Index.Box> */}

                          <Index.Box
                            gridColumn={{
                              xs: "span 12",
                              sm: "span 12",
                              md: "span 12",
                              lg: "span 10",
                            }}
                            className="grid-column"
                          >
                            <Index.Box className="input-box">
                              <Index.Typography
                                variant="label"
                                component="label"
                                className="input-label input comman-title-content"
                              >
                                Description
                              </Index.Typography>
                              <Index.Box className="form-group ck-custom-editor-main">
                                <PageIndex.CKEditor
                                  editor={ClassicEditor}
                                  data={values?.description}
                                  name="description"
                                  onReady={(editor) => {
                                    // You can store the "editor" and use when it is needed.
                                    
                                  }}
                                  onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setFieldValue("description", data);
                                    
                                  }}
                                />
                                <Index.FormHelperText error>
                                  {errors?.description}
                                </Index.FormHelperText>
                              </Index.Box>
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                    <Index.Box
                      mt={5}
                      className="save-btn-main border-btn-main"
                    >
                      <Index.Button
                        className="save-user-btn border-btn"
                        type="submit"
                      >
                        <img
                          alt="save"
                          src={PageIndex.Png.invoice}
                          className=""
                        />
                        Update
                      </Index.Button>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              </Index.Stack>
            </>
          )}
        </PageIndex.Formik>
      </Index.Box>
    </>
  );
};

export default CoummnityBetting;
