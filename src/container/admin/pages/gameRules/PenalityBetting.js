import React, { useEffect, useState } from "react";
import Index from "../../../../component/Index";
import PageIndex from "../../../pageIndex";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { toast } from "react-toastify";
import DataService from "../../../../config/DataService";
import { Api } from "../../../../config/Api";
import { useLocation, useNavigate } from "react-router-dom";

const PenalityBetting = ({ tabId }) => {
  const navigate= useNavigate();
  const location = useLocation();
  const row = location?.state?.selectedData;
  const [initialGameRule, setInitialGameRule] = useState({
    description:""
  });

  const handleFormSubmit = async (values, action) => {
    const urlencoded = new URLSearchParams();
    urlencoded.append("gameRules", values.description);
    urlencoded.append("gameId", tabId);
   
    DataService.post(Api.ADMIN_GAME_RULES_ADD, urlencoded)
      .then((res) => {
        action.resetForm();
        toast.success(res?.data?.message,{
          toastId:"customId"
        });
        navigate('/admin/game-management')
        // getAllGamesRules();
      })
      .catch((e) => {
        toast.error(
          e?.response?.data?.message ? e?.response?.data?.message : e?.message,{
            toastId:"customId"
          }
        );
      });
  };

  const getAllGamesRules = async() => {
await DataService.get(Api.ADMIN_GAME_RULES).then((res) => {
      const data = res?.data?.data.find((e) => e._id === row?._id);
      console.log(data,row?._id,"23")
      setInitialGameRule({
        gameName:data?.gameName,
        description: data?.gameRules || "",
      });
    });
  };


  useEffect(() => {
    getAllGamesRules();
  }, [row?._id]);

  return (
    <>
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
                                  onReady={(editor) => {
                                  }}
                                  onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setFieldValue("description", data);
                                  }}
                                />
                                {touched.description && errors.description && (
                                  <Index.FormHelperText error>
                                    {errors.description}
                                  </Index.FormHelperText>
                                )}
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

export default PenalityBetting;
