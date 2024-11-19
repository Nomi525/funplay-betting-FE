import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import PageIndex from "../../../../container/pageIndex";
import "./Cms.css";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Formik } from "formik";
import { toast } from "react-toastify";
import { Api } from "../../../../config/Api";
import DataService from "../../../../config/DataService";
import dataService from "../../../../config/CkService";
import { useSelector } from "react-redux";

const TermsCondition = () => {
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const permission = useSelector((state) => state.AdminReducer.adminRoleData);

  const [termsConditionData, setTermsConditionData] = useState({
    title: "",
    description: "",
  });

  const handleFormSubmit = async (values, action) => {
    setBtnLoading(true);
    const urlencoded = new URLSearchParams();
    urlencoded.append("title", values.title);
    urlencoded.append("description", values.description);
    DataService.post(Api.TERMS_CONDITION, urlencoded)
      .then((res) => {
        action.resetForm();
        toast.success(res.data.message, {
          toastId: "customId",
        });
        getAllTermsConditionData();
        setBtnLoading(false);
      })
      .catch((e) => {
        toast.error(
          e.response.data.message ? e.response.data.message : e.message,
          {
            toastId: "customId",
          }
        );
        setBtnLoading(false);
      });
  };

  const getAllTermsConditionData = async () => {
    await DataService.post(Api.TERMS_CONDITION).then((res) => {
      const data = res.data.data;
      setTermsConditionData({
        title: data[0]?.termsAndCondition?.title || "",
        description: data[0]?.termsAndCondition?.description || "",
      });
    });
  };

  useEffect(() => {
    getAllTermsConditionData();
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
      <Index.Box className="page-content-box">
        <Index.Box className="barge-common-box">
          <Index.Box className="title-header">
            <Index.Box className="title-header-flex res-title-header-flex mb-30-setting">
              <Index.Box className="title-main">
                <Index.Typography
                  variant="p"
                  component="p"
                  className="page-title "
                >
                  Terms and Condition
                </Index.Typography>
              </Index.Box>
            </Index.Box>
          </Index.Box>
          <Index.Box className="input-design-div admin-design-div login-input-design-div">
            <Formik
              enableReinitialize
              onSubmit={handleFormSubmit}
              initialValues={termsConditionData}
              validationSchema={PageIndex.validationSchemaTermsConditions}
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
                  {console.log(values.description, "value")}
                  <Index.Stack
                    component="form"
                    spacing={2}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                  >
                    <Index.Box className="">
                      <Index.Box className="grid-row cms-page-row">
                        <Index.Box className="grid-main">
                          <Index.Box
                            display="grid"
                            gridTemplateColumns="repeat(12, 1fr)"
                            gap={{ xs: 0, sm: 0, md: 0, lg: 0 }}
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
                                    className="cms-form-control form-control form-control-term-title"
                                    placeholder="Enter title"
                                    name="title"
                                    onBlur={handleBlur}
                                    onFocus={() => setLoading(true)}
                                    value={values.title}
                                    onChange={handleChange}
                                    helperText={touched.title && errors.title}
                                    error={Boolean(
                                      errors.title && touched.title
                                    )}
                                    // sx={{ mb: 3 }}
                                    InputProps={{
                                      inputProps: {
                                        maxLength: 30,
                                      },
                                    }}
                                  />
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
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
                                    // content={textEditer}
                                    // events={{
                                    //   change: onDescriptionChange,
                                    // }}
                                    onChange={(event, editor) => {
                                      const data = editor.getData();
                                      setFieldValue("description", data);
                                      // console.log({ event, editor, data });
                                    }}
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

                      {permission?.isAdmin == true ||
                      (permission?.role?.CMS.TermsAndCondition?.update ==
                        true &&
                        permission?.isAdmin == false) ? (
                        <Index.Box className="save-btn-main border-btn-main">
                          <Index.Button
                            className="save-user-btn border-btn"
                            type="submit"
                            disabled={btnLoading}
                          >
                            {/* <img
                            alt="save"
                            src={PageIndex.Png.invoice}
                            className=""
                          />
                          Update */}
                            {btnLoading ? (
                              <Index.CircularProgress
                                color="secondary"
                                size={20}
                              />
                            ) : (
                              <>
                                <img
                                  alt="save"
                                  src={PageIndex.Png.invoice}
                                  className=""
                                />
                                Update
                              </>
                            )}
                          </Index.Button>
                        </Index.Box>
                      ) : (
                        ""
                      )}
                    </Index.Box>
                  </Index.Stack>
                </>
              )}
            </Formik>
          </Index.Box>
        </Index.Box>
      </Index.Box>
    </>
  );
};

export default TermsCondition;
