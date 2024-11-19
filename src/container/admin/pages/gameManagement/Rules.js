import React, { useEffect, useState } from "react";
import Index from "../../../../component/Index";
import PageIndex from "../../../pageIndex";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Formik } from "formik";
import { toast } from "react-toastify";
import DataService from "../../../../config/DataService";
import { Api } from "../../../../config/Api";
import { useLocation, useNavigate } from "react-router-dom";
import dataService from "../../../../config/CkService";


const Rules = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const location = useLocation();
  const location = useLocation();
  const row = location?.state?.selectedData;
  const [initialGameRule, setInitialGameRule] = useState({
    gameName: row?.gameName ? row?.gameName : "",
    description: "",
    // gameId:""
  });

  const handleFormSubmit = async (values, action) => {
    const urlencoded = new URLSearchParams();
    // urlencoded.append("gameName", values.gameName);
    urlencoded.append("gameRules", values.description);
    urlencoded.append("gameId", row?._id);

    DataService.post(Api.ADMIN_GAME_RULES_ADD, urlencoded)
      .then((res) => {
        action.resetForm();
        toast.success(res?.data?.message, {
          toastId: "customId",
        });
        navigate("/admin/game-management");
        getAllGamesRules();
      })
      .catch((e) => {
        toast.error(
          e?.response?.data?.message ? e?.response?.data?.message : e?.message,
          {
            toastId: "customId",
          }
        );
      });
  };

  const getAllGamesRules = async() => {
  await  DataService.get(Api.ADMIN_GAME_RULES).then((res) => {
      const data = res?.data?.data.find((e) => e?.gameId?._id === row?._id);
      setInitialGameRule({
        // gameName:data?.gameId?.gameName || "",
        description: data?.gameRules || "",
      });
    });
  };
  //   const getAllGamesRules = () => {
  //     DataService.get(Api.ADMIN_GAME_RULES).then((res) => {
  //       const data = res?.data?.data.find((e) => e._id === row?._id);
  //       console.log(data,row?._id,"23")
  //       setInitialGameRule({
  //         // gameName:data?.gameName,
  //         description: data?.gameRules || "",
  //       });
  //     });
  //   };

  useEffect(() => {
    getAllGamesRules();
  }, []);

  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("ckImage", file);
            dataService
              .post("admin/ckImageEditor", body)
              .then((res) => {
                resolve({
                  default: `http://35.177.56.74:3027/uploads/${res.data.fileName}`,
                });
              })
              .catch((err) => {
                reject(err);
              });
          });
        });
      },
    };
  }
  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }


  return (
    <>
      {" "}
      {/* <Index.Box className="admin-comman-title-right">
        <Index.Typography className="admin-page-title" variant="h5">
        Penality Betting
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
                <Index.Box className="barge-common-box ">
                  <Index.Box className="">
                    <Index.Box className="grid-row cms-page-row">
                      <Index.Box className="grid-main">
                        <Index.Box
                          display="grid"
                          gridTemplateColumns="repeat(12, 1fr)"
                          gap={{ xs: 2, sm: 2, md: 0, lg: 0 }}
                        >
                          <Index.Box
                            gridColumn={{
                              xs: "span 12",
                              sm: "span 12",
                              md: "span 12",
                              lg: "span 10",
                            }}
                            className="grid-column"
                          >
                            <Index.Grid item xs={12} sm={4} md={4} lg={4}>
                              <Index.Typography
                                variant="label"
                                component="label"
                                className="input-label"
                              >
                                Game Name
                              </Index.Typography>
                              <Index.Box className="input-design-div with-border">
                                <Index.TextField
                                  hiddenLabel
                                  id="filled-hidden-label-normal"
                                  placeholder=" Game Name "
                                  variant="filled"
                                  className="admin-input-design input-placeholder"
                                  autoComplete="off"
                                  name="gameName"
                                  type="text"
                                  onBlur={handleBlur}
                                  value={values.gameName}
                                  inputProps={{ readOnly: true }}
                                  // onChange={handleChange}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    const regex = /^[A-Za-z][A-Za-z\s]*$/;

                                    if (regex.test(value) || value === "") {
                                      setFieldValue(
                                        "gameName",
                                        value.slice(0, 35)
                                      );
                                    }
                                  }}
                                  helperText={
                                    touched.gameName && errors.gameName
                                  }
                                  error={Boolean(
                                    errors.gameName && touched.gameName
                                  )}
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
                              </Index.Box>
                            </Index.Grid>

                            <Index.Box className="input-box">
                              <Index.Typography
                                variant="label"
                                component="label"
                                className="input-label input comman-title-content"
                              >
                                Game Rules Description
                              </Index.Typography>
                              <Index.Box className="form-group ck-custom-editor-main">
                                <PageIndex.CKEditor
                                  editor={ClassicEditor}
                                  data={values.description}
                                  name="description"
                                  contenteditable="true"
                                  onReady={(editor) => {
                                    // You can store the "editor" and use when it is needed.
                                    // console.log('Editor is ready to use', editor);
                                  }}
                                  config={{
                                    extraPlugins: [uploadPlugin],
                                  }}
                                  onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setFieldValue("description", data);
                                  }}
                                  // onChange={(event, editor) => {
                                  //   const data = editor.getData();
                                  //   if(data.length <= 9)
                                  //   {
                                  //     setFieldValue("description", data);
                                  //   }
                                  //   // console.log({ event, editor, data });
                                  // }}
                                />
                                <Index.FormHelperText error>
                                     {errors.description}
                        </Index.FormHelperText>
                              </Index.Box>
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                    <Index.Box className="save-btn-main border-btn-main add-game-button">
                      <Index.Box className="add-submit-btn">
                        <Index.Button
                          className="save-user-btn border-btn"
                          type="submit"
                          onClick={() => navigate("/admin/game-management")}
                        >
                          <img
                            src={PageIndex.Png.back}
                            className="back-btn-spacing"
                          />
                          Back
                        </Index.Button>
                      </Index.Box>
                      <Index.Box className="add-submit-btn">
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
                </Index.Box>
              </Index.Stack>
            </>
          )}
        </PageIndex.Formik>
      </Index.Box>
    </>
  );
};

export default Rules;
