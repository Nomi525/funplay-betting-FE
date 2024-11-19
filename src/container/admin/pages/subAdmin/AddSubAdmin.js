import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import { useLocation, useNavigate } from "react-router-dom";
import PageIndex from "../../../pageIndex";
import {
  EditSubAdminSchema,
  SubAdminSchema,
} from "../../../../validation/Validation";
import DataService from "../../../../config/DataService";
import { Api } from "../../../../config/Api";
import { toast } from "react-toastify";

const AddSubAdmin = () => {
  const location = useLocation();
  const data = location?.state?.row;
  const id = location?.state?.row?._id;
  const navigate = useNavigate();
  const [roleList, setRoleList] = useState([]);

  const initialValues = {
    firstName: data ? data?.firstName : "",
    lastName: data ? data?.lastName : "",
    email: data ? data?.email : "",
    password: "",
    role: data ? data?.role?._id : "",
  };

  const handleFormSubmit = (values) => {
    let data;
    if (id) {
      data = {
        ...values,
        id: id,
      };
    } else {
      data = values;
    }

    DataService.post(Api.ADD_SUBADMIN, data)
      .then((res) => {
        console.log(res, 41);
        toast.success(res?.data?.message);
        navigate("/admin/subAdmin-list");
      })
      .catch((error) => {
        console.error(error, 466);

        toast.error(error?.response?.data?.message);
      });
  };

  const getRoles = async () => {
    await DataService.get(Api.GET_ROLE_PERMISSION)
      .then((res) => {
        setRoleList(res?.data?.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getRoles();
  }, []);

  return (
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
                {id ? "Edit SubAdmin" : "Add SubAdmin"}
              </Index.Typography>
            </Index.Box>
          </Index.Box>
        </Index.Box>
        <PageIndex.Formik
          enableReinitialize
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={id ? EditSubAdminSchema : SubAdminSchema}
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
                <Index.Grid container spacing={3}>
                  <Index.Grid item xs={12} sm={6} md={5} lg={3}>
                    <Index.Typography
                      variant="label"
                      component="label"
                      className="input-label"
                    >
                      Firstname*
                    </Index.Typography>
                    <Index.Box className="input-design-div with-border">
                      <Index.TextField
                        hiddenLabel
                        id="filled-hidden-label-normal"
                        placeholder="Firstname"
                        variant="filled"
                        className="admin-input-design input-placeholder"
                        autoComplete="off"
                        name="firstName"
                        type="text"
                        onBlur={handleBlur}
                        value={values.firstName}
                        onChange={handleChange}
                        helperText={touched.firstName && errors.firstName}
                        error={Boolean(errors.firstName && touched.firstName)}
                      />
                    </Index.Box>
                  </Index.Grid>

                  <Index.Grid item xs={12} sm={6} md={5} lg={3}>
                    <Index.Typography
                      variant="label"
                      component="label"
                      className="input-label"
                    >
                      Lastname*
                    </Index.Typography>
                    <Index.Box className="input-design-div with-border">
                      <Index.TextField
                        hiddenLabel
                        id="filled-hidden-label-normal"
                        placeholder="Lastname"
                        variant="filled"
                        className="admin-input-design input-placeholder"
                        autoComplete="off"
                        name="lastName"
                        type="text"
                        onBlur={handleBlur}
                        value={values.lastName}
                        onChange={handleChange}
                        helperText={touched.lastName && errors.lastName}
                        error={Boolean(errors.lastName && touched.lastName)}
                      />
                    </Index.Box>
                  </Index.Grid>

                  <Index.Grid item xs={12} sm={6} md={5} lg={3}>
                    <Index.Typography
                      variant="label"
                      component="label"
                      className="input-label"
                    >
                      Email*
                    </Index.Typography>
                    <Index.Box className="input-design-div with-border">
                      <Index.TextField
                        hiddenLabel
                        id="filled-hidden-label-normal"
                        placeholder="Email"
                        variant="filled"
                        className="admin-input-design input-placeholder"
                        autoComplete="off"
                        name="email"
                        type="text"
                        onBlur={handleBlur}
                        value={values.email}
                        onChange={handleChange}
                        helperText={touched.email && errors.email}
                        error={Boolean(errors.email && touched.email)}
                      />
                    </Index.Box>
                  </Index.Grid>

                  {id ? (
                    " "
                  ) : (
                    <Index.Grid item xs={12} sm={6} md={5} lg={3}>
                      <Index.Typography
                        variant="label"
                        component="label"
                        className="input-label"
                      >
                        Password*
                      </Index.Typography>
                      <Index.Box className="input-design-div with-border">
                        <Index.TextField
                          hiddenLabel
                          id="filled-hidden-label-normal"
                          placeholder="Password"
                          variant="filled"
                          className="admin-input-design input-placeholder"
                          autoComplete="off"
                          name="password"
                          type="text"
                          onBlur={handleBlur}
                          value={values.password}
                          onChange={handleChange}
                          helperText={touched.password && errors.password}
                          error={Boolean(errors.password && touched.password)}
                        />
                      </Index.Box>
                    </Index.Grid>
                  )}

                  <Index.Grid item xs={12} sm={6} md={5} lg={3}>
                    <Index.Typography
                      variant="label"
                      component="label"
                      className="input-label"
                    >
                      Role*
                    </Index.Typography>

                    <Index.Box className=" signin-drop-details admin-dropdown-details">
                      <Index.FormControl className="formcontrol_login sign-in-inner-form">
                        <Index.Select
                          className="currency-select-drop"
                          name="role"
                          id="role"
                          value={values.role}
                          onChange={handleChange}
                          error={errors.role && touched.role ? true : false}
                          onBlur={handleBlur}
                          displayEmpty
                          renderValue={
                            values?.role !== ""
                              ? undefined
                              : () => "Select role"
                          }
                          inputProps={{
                            "aria-label": "Without label",
                          }}
                        >
                          {roleList?.map((val) => {
                            return (
                              <Index.MenuItem
                                value={val._id}
                                // className="menuitem"
                                className="currency-select-menu"
                              >
                                {val.Role_type}
                              </Index.MenuItem>
                            );
                          })}
                        </Index.Select>
                        <Index.FormHelperText error>
                          {errors.role && touched.role ? errors.role : false}
                        </Index.FormHelperText>
                      </Index.FormControl>
                    </Index.Box>
                  </Index.Grid>
                </Index.Grid>
              </Index.Box>
              <Index.Box className="add-game-button">
                <Index.Box className="common-button blue-button flex-start save-btn add-submit-btn">
                  <Index.Button
                    variant="contained"
                    onClick={() => navigate("/admin/subAdmin-list")}
                  >
                    <img
                      src={PageIndex.Png.back}
                      className="back-btn-spacing"
                    />
                    Back
                  </Index.Button>
                </Index.Box>
                <Index.Box className="common-button blue-button flex-start save-btn add-submit-btn">
                  <Index.Button variant="contained" type="submit">
                    {id ? "Update" : "Submit"}
                  </Index.Button>
                </Index.Box>
              </Index.Box>
            </Index.Stack>
          )}
        </PageIndex.Formik>
      </Index.Box>
    </Index.Box>
  );
};

export default AddSubAdmin;
