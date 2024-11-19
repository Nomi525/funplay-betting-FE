import React, { useState } from "react";
import Index from "../../../Index";
import PageIndex from "../../../pageIndex";
import { Api } from "../../../../config/Api";
import DataService from "../../../../config/DataService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { userQuerySchema } from "../../../../validation/Validation";

export default function UserQuery() {
  const [formData, setFormData] = useState("");
  let navigate = useNavigate();

  let initialValues = {
    name: "",
    email: "",
    Description: "",
    phoneNumber: "",
    file: "",
  };

  const handleFormSubmit = (values) => {
    const formData = new FormData();
    formData.append("userName", values?.name);
    formData.append("email", values?.email);
    formData.append("mobileNumber", values?.phoneNumber);
    formData.append("description", values?.Description);
    formData.append("queryDocument", values?.file);
    DataService.post(Api.User.ADD_EDIT_QUERY, formData)
      .then((res) => {
        if (res.data.status === 200 || res.data.status === 201) {
          toast.success(res?.data?.message, {
            toastId: "customId",
          });
          setFormData(res?.data?.data);
          navigate("/user");
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message, {
          toastId: "customId",
        });
      });
  };

  return (
    <Index.Box className="query-form-details-content">
      <Index.Box className="query-details-title">
        <Index.Typography
          className="query-main-title"
          variant="h5"
          component="h5"
        >
          Query
        </Index.Typography>
      </Index.Box>
      <Index.Box className="query-card-main-content">
        <PageIndex.Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={userQuerySchema}
          onSubmit={handleFormSubmit}
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
              <Index.Box className="query-card-pd-details">
                <Index.Box className="query-form-details">
                  <Index.Grid container className="grid-query-row">
                    <Index.Grid
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      className="grid-query-col"
                    >
                      <Index.Box className="form-group-main deposit-form-content mb-30px-form">
                        <Index.FormHelperText className="title-label-comman-user">
                          Name
                        </Index.FormHelperText>
                        <Index.Box className="form-control-details-auth">
                          <Index.Box className="icon-position-rel">
                            <Index.TextField
                              className="form-control custom-auth-user-control "
                              type="text"
                              name="name"
                              placeholder="Enter Name"
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
                          {errors.name && touched.name && (
                            <Index.FormHelperText error>
                              {errors.name}
                            </Index.FormHelperText>
                          )}
                        </Index.Box>
                      </Index.Box>
                    </Index.Grid>
                    <Index.Grid
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      className="grid-query-col"
                    >
                      <Index.Box className="form-group-main deposit-form-content mb-30px-form">
                        <Index.FormHelperText className="title-label-comman-user">
                          Email
                        </Index.FormHelperText>
                        <Index.Box className="form-control-details-auth">
                          <Index.Box className="icon-position-rel">
                            <Index.TextField
                              className="form-control custom-auth-user-control "
                              type="email"
                              name="email"
                              placeholder="Enter Email"
                              onBlur={handleBlur}
                              value={values.email}
                              onChange={handleChange}
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
                          {errors.email && touched.email && (
                            <Index.FormHelperText error>
                              {errors.email}
                            </Index.FormHelperText>
                          )}
                        </Index.Box>
                      </Index.Box>
                    </Index.Grid>

                    <Index.Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      className="grid-query-col"
                    >
                      <Index.Box className="form-group-main deposit-form-content mb-30px-form">
                        <Index.FormHelperText className="title-label-comman-user">
                          Description
                        </Index.FormHelperText>
                        <Index.Box className="form-control-details-auth main-content-textarea">
                          <Index.Box className="icon-position-rel">
                            <Index.TextareaAutosize
                              className="form-control custom-auth-user-control textarea-content-comman"
                              // type="text"
                              // name="Description"
                              // placeholder="Enter Description"
                              // onBlur={handleBlur}
                              // value={values?.Description}
                              // onChange={handleChange}
                              // onKeyDown={(e) => {
                              //   if (

                              //     (e.key === " " &&
                              //       e.target.value.trim() === "")
                              //   ) {
                              //     e.preventDefault();
                              //   }
                              // }}
                              // inputProps={{
                              //   maxLength: 10
                              // }}

                              type="text"
                              name="Description"
                              placeholder="Enter Description"
                              onBlur={handleBlur}
                              value={values?.Description}
                              onChange={(e) => {
                                const value = e.target.value;
                                const regex = /^[A-Za-z][A-Za-z\s]*$/;

                                if (regex.test(value) || value === "") {
                                  setFieldValue(
                                    "Description",
                                    value.slice(0, 50)
                                  );
                                }
                              }}
                              inputProps={{
                                maxLength: 50,
                              }}
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
                          {errors.Description && touched.Description && (
                            <Index.FormHelperText error>
                              {errors.Description}
                            </Index.FormHelperText>
                          )}
                        </Index.Box>
                      </Index.Box>
                    </Index.Grid>

                    <Index.Grid
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      className="grid-query-col"
                    >
                      <Index.Box className="form-group-main deposit-form-content mb-30px-form">
                        <Index.FormHelperText className="title-label-comman-user">
                          Phone Number
                        </Index.FormHelperText>
                        <Index.Box className="form-control-details-auth">
                          <Index.Box className="icon-position-rel">
                            <Index.TextField
                              className="form-control custom-auth-user-control "
                              // type="number"
                              name="phoneNumber"
                              placeholder="Phone Number"
                              onBlur={handleBlur}
                              value={values.phoneNumber}
                              onKeyDown={(e) => {
                                if (
                                  e.key === " " &&
                                  e.target.value.trim() === ""
                                ) {
                                  e.preventDefault();
                                }
                              }}
                              onChange={(e) => {
                                !isNaN(e.target.value) && handleChange(e);
                              }}
                              inputProps={{
                                maxLength: 10,
                              }}
                            />
                          </Index.Box>
                          {errors.phoneNumber && touched.phoneNumber && (
                            <Index.FormHelperText error>
                              {errors.phoneNumber}
                            </Index.FormHelperText>
                          )}
                        </Index.Box>
                      </Index.Box>
                    </Index.Grid>
                    <Index.Grid
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      className="grid-query-col"
                    >
                      <Index.Box className="form-group-main deposit-form-content mb-30px-form">
                        <Index.FormHelperText className="title-label-comman-user">
                          Document Upload
                        </Index.FormHelperText>
                        <Index.Box className="title-name-upload">
                          <Index.Button
                            variant="contained"
                            component="label"
                            className="upload-sign-btn custom-file-upload"
                            disableRipple
                          >
                            {values?.file?.name
                              ? values?.file?.name
                              : "Select Document"}
                            <input
                              hidden
                              accept="image/*"
                              type="file"
                              className="inputfile-upload "
                              name="file"
                              onBlur={handleBlur}
                              onChange={(event) => {
                                setFieldValue("file", event.target.files[0]);
                              }}
                            />
                          </Index.Button>
                          {errors.file && touched.file && (
                            <Index.FormHelperText error>
                              {errors.file}
                            </Index.FormHelperText>
                          )}
                        </Index.Box>
                      </Index.Box>
                    </Index.Grid>
                  </Index.Grid>
                </Index.Box>
                <Index.Box className="right-btn-query">
                  <Index.Box className="betting-card-btn-comman">
                    <PageIndex.BlueButton
                      btnLabel="Submit"
                      className="blue-btn-content"
                      type="submit"
                    />
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </form>
          )}
        </PageIndex.Formik>
      </Index.Box>
    </Index.Box>
  );
}
