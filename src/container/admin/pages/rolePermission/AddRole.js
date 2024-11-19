import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import Loader from "../../../../component/comman/loader/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import PageIndex from "../../../../component/PageIndex";
import { Formik } from "formik";
import { roleValidationSchema } from "../../../../validation/Validation";

import { Api } from "../../../../config/Api";
import { toast } from "react-toastify";
import DataService from "../../../../config/DataService";

export default function AddRole() {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location?.state?.row?._id;
  const data = location?.state?.row;

  const [loading, setLoading] = useState(false);

  const initialValues = {
    Role_type: data ? data?.Role_type : "",
    UserManagement: {
      all: data ? data?.UserManagement?.all : false,
      create: data ? data?.UserManagement?.create : false,
      update: data ? data?.UserManagement?.update : false,
      View: data ? data?.UserManagement?.View : false,
      delete: data ? data?.UserManagement?.delete : false,
    },
    // Transaction: {
    //   all: data ? data?.Transaction?.all : false,
    //   create: data ? data?.Transaction?.create : false,
    //   update: data ? data?.Transaction?.update : false,
    //   View: data ? data?.Transaction?.View : false,
    //   delete: data ? data?.Transaction?.delete : false,
    // },
    WithdrawlRequest: {
      all: data ? data?.WithdrawlRequest?.all : false,
      create: data ? data?.WithdrawlRequest?.create : false,
      update: data ? data?.WithdrawlRequest?.update : false,
      View: data ? data?.WithdrawlRequest?.View : false,
      delete: data ? data?.WithdrawlRequest?.delete : false,
    },
    DepositRequest: {
      all: data ? data?.DepositRequest?.all : false,
      create: data ? data?.DepositRequest?.create : false,
      update: data ? data?.DepositRequest?.update : false,
      View: data ? data?.DepositRequest?.View : false,
      delete: data ? data?.DepositRequest?.delete : false,
    },
    BannerManagement: {
      all: data ? data?.BannerManagement?.all : false,
      create: data ? data?.BannerManagement?.create : false,
      update: data ? data?.BannerManagement?.update : false,
      View: data ? data?.BannerManagement?.View : false,
      delete: data ? data?.BannerManagement?.delete : false,
    },
    CurrencyManagement: {
      all: data ? data?.CurrencyManagement?.all : false,
      create: data ? data?.CurrencyManagement?.create : false,
      update: data ? data?.CurrencyManagement?.update : false,
      View: data ? data?.CurrencyManagement?.View : false,
      delete: data ? data?.CurrencyManagement?.delete : false,
    },
    GameManagement: {
      all: data ? data?.GameManagement?.all : false,
      create: data ? data?.GameManagement?.create : false,
      update: data ? data?.GameManagement?.update : false,
      View: data ? data?.GameManagement?.View : false,
      delete: data ? data?.GameManagement?.delete : false,
    },
    BettingRecords: {
      all: data ? data?.BettingRecords?.all : false,
      create: data ? data?.BettingRecords?.create : false,
      update: data ? data?.BettingRecords?.update : false,
      View: data ? data?.BettingRecords?.View : false,
      delete: data ? data?.BettingRecords?.delete : false,
    },
    WinnerDeclaration: {
      all: data ? data?.WinnerDeclaration?.all : false,
      create: data ? data?.WinnerDeclaration?.create : false,
      update: data ? data?.WinnerDeclaration?.update : false,
      View: data ? data?.WinnerDeclaration?.View : false,
      delete: data ? data?.WinnerDeclaration?.delete : false,
    },
    Periods: {
      all: data ? data?.Periods?.all : false,
      create: data ? data?.Periods?.create : false,
      update: data ? data?.Periods?.update : false,
      View: data ? data?.Periods?.View : false,
      delete: data ? data?.Periods?.delete : false,
    },
    Query: {
      all: data ? data?.Query?.all : false,
      create: data ? data?.Query?.create : false,
      update: data ? data?.Query?.update : false,
      View: data ? data?.Query?.View : false,
      delete: data ? data?.Query?.delete : false,
    },
    Setting: {
      all: data ? data?.Setting?.all : false,
      create: data ? data?.Setting?.create : false,
      update: data ? data?.Setting?.update : false,
      View: data ? data?.Setting?.View : false,
      delete: data ? data?.Setting?.delete : false,
    },

    CMS: {
      PaymentMethod: {
        all: data ? data?.CMS?.PaymentMethod?.all : false,
        create: data ? data?.CMS?.PaymentMethod?.create : false,
        update: data ? data?.CMS?.PaymentMethod?.update : false,
        View: data ? data?.CMS?.PaymentMethod?.View : false,
        delete: data ? data?.CMS?.PaymentMethod?.delete : false,
      },
      TermsAndCondition: {
        all: data ? data?.CMS?.TermsAndCondition?.all : false,
        create: data ? data?.CMS?.TermsAndCondition?.create : false,
        update: data ? data?.CMS?.TermsAndCondition?.update : false,
        View: data ? data?.CMS?.TermsAndCondition?.View : false,
        delete: data ? data?.CMS?.TermsAndCondition?.delete : false,
      },
      PrivacyPolicy: {
        all: data ? data?.CMS?.PrivacyPolicy?.all : false,
        create: data ? data?.CMS?.PrivacyPolicy?.create : false,
        update: data ? data?.CMS?.PrivacyPolicy?.update : false,
        View: data ? data?.CMS?.PrivacyPolicy?.View : false,
        delete: data ? data?.CMS?.PrivacyPolicy?.delete : false,
      },
    },
  };

  const handelAllCheck = (e, tag, setFieldValue) => {
    if (e.target.checked) {
      setFieldValue(`${tag}.View`, true);
      setFieldValue(`${tag}.create`, true);
      setFieldValue(`${tag}.update`, true);
      setFieldValue(`${tag}.delete`, true);
      setFieldValue(`${tag}.all`, true);
    } else {
      setFieldValue(`${tag}.View`, false);
      setFieldValue(`${tag}.create`, false);
      setFieldValue(`${tag}.update`, false);
      setFieldValue(`${tag}.delete`, false);
      setFieldValue(`${tag}.all`, false);
    }
  };

  const handelAllRead = (e, tag, setFieldValue) => {
    if (e.target.checked) {
      setFieldValue(`${tag}.View`, true);
    } else {
      setFieldValue(`${tag}.View`, false);
      setFieldValue(`${tag}.create`, false);
      setFieldValue(`${tag}.update`, false);
      setFieldValue(`${tag}.delete`, false);
      setFieldValue(`${tag}.all`, false);
    }
  };

  const addRole = (values) => {
    let data;
    if (id) {
      data = {
        ...values,
        id: id,
      };
    } else {
      data = values;
    }

    DataService.post(Api.ADD_ROLE_PERMISSION, data)
      .then((res) => {
        toast.success(res?.data?.message);
        navigate("/admin/role-list");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Index.Box className="dashboard-content add-genres-containt">
          <Index.Typography
            className=" add-role-title"
            component="h2"
            variant="h2"
          >
            {id ? "Edit Role" : "Add Role"}
          </Index.Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={roleValidationSchema}
            enableReinitialize
            onSubmit={addRole}
          >
            {({
              handleSubmit,
              handleBlur,
              values,
              handleChange,
              touched,
              setFieldValue,
              errors,
            }) => (
              <Index.Stack
                component="form"
                spacing={2}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
              >
                <Index.Box sx={{ width: 1 }} className="grid-main add-role-row">
                  <Index.Box
                    display="grid"
                    className="display-row-add-user"
                    gridTemplateColumns="repeat(12, 1fr)"
                    gap={{ xs: 2, sm: 2, md: 2, lg: 2 }}
                  >
                    <Index.Box
                      gridColumn={{
                        xs: "span 12",
                        sm: "span 12",
                        md: "span 12",
                        lg: "span 12",
                        xl: "span 12",
                      }}
                      className="grid-column"
                    >
                      <Index.Box className="input-box add-user-input">
                        <Index.FormHelperText className="form-lable">
                          Role Name
                        </Index.FormHelperText>
                        <Index.Box className="form-group">
                          <Index.TextField
                            fullWidth
                            id="fullWidth"
                            type="text"
                            className="form-control"
                            name="Role_type"
                            placeholder="Role Name"
                            value={values.Role_type}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={
                              touched.Role_type ? errors.Role_type : undefined
                            }
                            error={Boolean(
                              errors.Role_type ? touched.Role_type : undefined
                            )}
                          />
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
                <Index.Box sx={{ width: 1 }} className="grid-main add-role-row">
                  <Index.Box
                    display="grid"
                    className="display-row-add-user"
                    gridTemplateColumns="repeat(12, 1fr)"
                    gap={{ xs: 2, sm: 2, md: 2, lg: 2 }}
                  >
                    <Index.Box
                      gridColumn={{
                        xs: "span 12",
                        sm: "span 12",
                        md: "span 12",
                        lg: "span 12",
                        xl: "span 12",
                      }}
                      className="grid-column"
                    >
                      <Index.Box className="role-card-main">
                        <Index.Box className="role-card-inner-flex">
                          <Index.Box className="role-titles-main">
                            <Index.Typography className="role-titles">
                              User Management
                            </Index.Typography>
                          </Index.Box>
                          <Index.Box className="roles-data-main-flex">
                            <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="UserManagement.all"
                                  className="check-box-role"
                                  checked={values.UserManagement.all}
                                  onChange={(e) =>
                                    handelAllCheck(
                                      e,
                                      "UserManagement",
                                      setFieldValue
                                    )
                                  }
                                />
                                <Index.Box className="role-data-title">
                                  All
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                            <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="UserManagement.View"
                                  className="check-box-role"
                                  checked={values?.UserManagement?.View}
                                  onChange={(e) => {
                                    handelAllRead(
                                      e,
                                      "UserManagement",
                                      setFieldValue
                                    );
                                    if (
                                      e.target.checked &&
                                      values?.UserManagement?.update
                                    ) {
                                      setFieldValue(`UserManagement.all`, true);
                                    } else {
                                      setFieldValue(
                                        `UserManagement.all`,
                                        false
                                      );
                                    }
                                  }}
                                />

                                <Index.Box className="role-data-title">
                                  Read
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                            {/* <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="UserManagement.create"
                                  className="check-box-role"
                                  onChange={(e) => {
                                    setFieldValue(
                                      "UserManagement.create",
                                      e.target.checked
                                    );
                                    if (e.target.checked) {
                                      setFieldValue(
                                        "UserManagement.View",
                                        e.target.checked
                                      );
                                    }

                                    if (
                                      values?.UserManagement?.View &&
                                      e.target.checked &&
                                      values?.UserManagement?.update &&
                                      values?.UserManagement?.delete
                                    ) {
                                      setFieldValue(`UserManagement.all`, true);
                                    } else {
                                      setFieldValue(
                                        `UserManagement.all`,
                                        false
                                      );
                                    }
                                  }}
                                  checked={values?.UserManagement?.create}
                                />
                                <Index.Box className="role-data-title">
                                  Create
                                </Index.Box>
                              </Index.Box>
                            </Index.Box> */}
                            <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="UserManagement.update"
                                  className="check-box-role"
                                  checked={values.UserManagement.update}
                                  onChange={(e) => {
                                    setFieldValue(
                                      "UserManagement.update",
                                      e.target.checked
                                    );
                                    if (e.target.checked) {
                                      setFieldValue(
                                        `UserManagement.View`,
                                        e.target.checked
                                      );
                                      setFieldValue(
                                        `UserManagement.all`,
                                        e.target.checked
                                      );
                                    } else {
                                      setFieldValue(
                                        `UserManagement.all`,
                                        false
                                      );
                                    }
                                  }}
                                />
                                <Index.Box className="role-data-title">
                                  Update
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                    <Index.Box
                      gridColumn={{
                        xs: "span 12",
                        sm: "span 12",
                        md: "span 12",
                        lg: "span 12",
                        xl: "span 12",
                      }}
                      className="grid-column"
                    >
                      <Index.Box className="role-card-main">
                        <Index.Box className="role-card-inner-flex">
                          <Index.Box className="role-titles-main">
                            <Index.Typography className="role-titles">
                              Withdrawal Request
                            </Index.Typography>
                          </Index.Box>
                          <Index.Box className="roles-data-main-flex">
                            <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="WithdrawlRequest.all"
                                  className="check-box-role"
                                  checked={values.WithdrawlRequest.all}
                                  onChange={(e) =>
                                    handelAllCheck(
                                      e,
                                      "WithdrawlRequest",
                                      setFieldValue
                                    )
                                  }
                                />
                                <Index.Box className="role-data-title">
                                  All
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                            <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="WithdrawlRequest.View"
                                  className="check-box-role"
                                  checked={values?.WithdrawlRequest?.View}
                                  onChange={(e) => {
                                    handelAllRead(
                                      e,
                                      "WithdrawlRequest",
                                      setFieldValue
                                    );
                                    if (
                                      e.target.checked &&
                                      values?.WithdrawlRequest?.update
                                      // values?.WithdrawlRequest?.create &&
                                      // values?.WithdrawlRequest?.update &&
                                      // values?.WithdrawlRequest?.delete
                                    ) {
                                      setFieldValue(
                                        `WithdrawlRequest.all`,
                                        true
                                      );
                                    } else {
                                      setFieldValue(
                                        `WithdrawlRequest.all`,
                                        false
                                      );
                                    }
                                  }}
                                />
                                <Index.Box className="role-data-title">
                                  Read
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                            {/* <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="WithdrawlRequest.create"
                                  className="check-box-role"
                                  onChange={(e) => {
                                    setFieldValue(
                                      "WithdrawlRequest.create",
                                      e.target.checked
                                    );
                                    if (e.target.checked) {
                                      setFieldValue(
                                        "WithdrawlRequest.View",
                                        e.target.checked
                                      );
                                    }

                                    if (
                                      values?.WithdrawlRequest?.View &&
                                      e.target.checked &&
                                      values?.WithdrawlRequest?.update &&
                                      values?.WithdrawlRequest?.delete
                                    ) {
                                      setFieldValue(
                                        `WithdrawlRequest.all`,
                                        true
                                      );
                                    } else {
                                      setFieldValue(
                                        `WithdrawlRequest.all`,
                                        false
                                      );
                                    }
                                  }}
                                  checked={values?.WithdrawlRequest?.create}
                                />
                                <Index.Box className="role-data-title">
                                  Create
                                </Index.Box>
                              </Index.Box>
                            </Index.Box> */}
                            <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="WithdrawlRequest.update"
                                  className="check-box-role"
                                  checked={values.WithdrawlRequest.update}
                                  onChange={(e) => {
                                    setFieldValue(
                                      "WithdrawlRequest.update",
                                      e.target.checked
                                    );
                                    if (e.target.checked) {
                                      setFieldValue(
                                        "WithdrawlRequest.View",
                                        e.target.checked
                                      );
                                      setFieldValue(
                                        `WithdrawlRequest.all`,
                                        e.target.checked
                                      );
                                      //   setFieldValue(
                                      //     `WithdrawlRequest.all`,
                                      //     true
                                      //   );
                                    }
                                    // if (
                                    //   values?.WithdrawlRequest?.View &&
                                    //   values?.WithdrawlRequest?.create &&
                                    //   e.target.checked &&
                                    //   values?.WithdrawlRequest?.delete
                                    // ) {
                                    //   setFieldValue(
                                    //     `WithdrawlRequest.all`,
                                    //     true
                                    //   );
                                    // }
                                    else {
                                      setFieldValue(
                                        `WithdrawlRequest.all`,
                                        false
                                      );
                                    }
                                  }}
                                />
                                <Index.Box className="role-data-title">
                                  Update
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                            {/* <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="WithdrawlRequest.delete"
                                  className="check-box-role"
                                  checked={values.WithdrawlRequest.delete}
                                  onChange={(e) => {
                                    setFieldValue(
                                      "WithdrawlRequest.delete",
                                      e.target.checked
                                    );
                                    if (e.target.checked) {
                                      setFieldValue(
                                        "WithdrawlRequest.View",
                                        e.target.checked
                                      );
                                    }
                                    if (
                                      values?.WithdrawlRequest?.View &&
                                      values?.WithdrawlRequest?.create &&
                                      values?.WithdrawlRequest?.update &&
                                      e.target.checked
                                    ) {
                                      setFieldValue(
                                        `WithdrawlRequest.all`,
                                        true
                                      );
                                    } else {
                                      setFieldValue(
                                        `WithdrawlRequest.all`,
                                        false
                                      );
                                    }
                                  }}
                                />
                                <Index.Box className="role-data-title">
                                  Delete
                                </Index.Box>
                              </Index.Box>
                            </Index.Box> */}
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                    {/* deposit request */}
                    <Index.Box
                      gridColumn={{
                        xs: "span 12",
                        sm: "span 12",
                        md: "span 12",
                        lg: "span 12",
                        xl: "span 12",
                      }}
                      className="grid-column"
                    >
                      <Index.Box className="role-card-main">
                        <Index.Box className="role-card-inner-flex">
                          <Index.Box className="role-titles-main">
                            <Index.Typography className="role-titles">
                              Deposit Request
                            </Index.Typography>
                          </Index.Box>
                          <Index.Box className="roles-data-main-flex">
                            <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="DepositRequest.all"
                                  className="check-box-role"
                                  checked={values.DepositRequest.all}
                                  onChange={(e) =>
                                    handelAllCheck(
                                      e,
                                      "DepositRequest",
                                      setFieldValue
                                    )
                                  }
                                />
                                <Index.Box className="role-data-title">
                                  All
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                            <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="DepositRequest.View"
                                  className="check-box-role"
                                  checked={values?.DepositRequest?.View}
                                  onChange={(e) => {
                                    handelAllRead(
                                      e,
                                      "DepositRequest",
                                      setFieldValue
                                    );
                                    if (
                                      e.target.checked &&
                                      values?.DepositRequest?.update
                                      // values?.WithdrawlRequest?.create &&
                                      // values?.WithdrawlRequest?.update &&
                                      // values?.WithdrawlRequest?.delete
                                    ) {
                                      setFieldValue(`DepositRequest.all`, true);
                                    } else {
                                      setFieldValue(
                                        `DepositRequest.all`,
                                        false
                                      );
                                    }
                                  }}
                                />
                                <Index.Box className="role-data-title">
                                  Read
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                            <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="DepositRequest.update"
                                  className="check-box-role"
                                  checked={values.DepositRequest.update}
                                  onChange={(e) => {
                                    setFieldValue(
                                      "DepositRequest.update",
                                      e.target.checked
                                    );
                                    if (e.target.checked) {
                                      setFieldValue(
                                        "DepositRequest.View",
                                        e.target.checked
                                      );
                                      setFieldValue(
                                        `DepositRequest.all`,
                                        e.target.checked
                                      );
                                    } else {
                                      setFieldValue(
                                        `DepositRequest.all`,
                                        false
                                      );
                                    }
                                  }}
                                />
                                <Index.Box className="role-data-title">
                                  Update
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                            {/* <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="WithdrawlRequest.create"
                                  className="check-box-role"
                                  onChange={(e) => {
                                    setFieldValue(
                                      "WithdrawlRequest.create",
                                      e.target.checked
                                    );
                                    if (e.target.checked) {
                                      setFieldValue(
                                        "WithdrawlRequest.View",
                                        e.target.checked
                                      );
                                    }

                                    if (
                                      values?.WithdrawlRequest?.View &&
                                      e.target.checked &&
                                      values?.WithdrawlRequest?.update &&
                                      values?.WithdrawlRequest?.delete
                                    ) {
                                      setFieldValue(
                                        `WithdrawlRequest.all`,
                                        true
                                      );
                                    } else {
                                      setFieldValue(
                                        `WithdrawlRequest.all`,
                                        false
                                      );
                                    }
                                  }}
                                  checked={values?.WithdrawlRequest?.create}
                                />
                                <Index.Box className="role-data-title">
                                  Create
                                </Index.Box>
                              </Index.Box>
                            </Index.Box> */}
                            {/* <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="WithdrawlRequest.update"
                                  className="check-box-role"
                                  checked={values.WithdrawlRequest.update}
                                  onChange={(e) => {
                                    setFieldValue(
                                      "WithdrawlRequest.update",
                                      e.target.checked
                                    );
                                    if (e.target.checked) {
                                      setFieldValue(
                                        "WithdrawlRequest.View",
                                        e.target.checked
                                      );
                                    }
                                    if (
                                      values?.WithdrawlRequest?.View &&
                                      values?.WithdrawlRequest?.create &&
                                      e.target.checked &&
                                      values?.WithdrawlRequest?.delete
                                    ) {
                                      setFieldValue(
                                        `WithdrawlRequest.all`,
                                        true
                                      );
                                    } else {
                                      setFieldValue(
                                        `WithdrawlRequest.all`,
                                        false
                                      );
                                    }
                                  }}
                                />
                                <Index.Box className="role-data-title">
                                  Update
                                </Index.Box>
                              </Index.Box>
                            </Index.Box> */}
                            {/* <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="WithdrawlRequest.delete"
                                  className="check-box-role"
                                  checked={values.WithdrawlRequest.delete}
                                  onChange={(e) => {
                                    setFieldValue(
                                      "WithdrawlRequest.delete",
                                      e.target.checked
                                    );
                                    if (e.target.checked) {
                                      setFieldValue(
                                        "WithdrawlRequest.View",
                                        e.target.checked
                                      );
                                    }
                                    if (
                                      values?.WithdrawlRequest?.View &&
                                      values?.WithdrawlRequest?.create &&
                                      values?.WithdrawlRequest?.update &&
                                      e.target.checked
                                    ) {
                                      setFieldValue(
                                        `WithdrawlRequest.all`,
                                        true
                                      );
                                    } else {
                                      setFieldValue(
                                        `WithdrawlRequest.all`,
                                        false
                                      );
                                    }
                                  }}
                                />
                                <Index.Box className="role-data-title">
                                  Delete
                                </Index.Box>
                              </Index.Box>
                            </Index.Box> */}
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                    <Index.Box
                      gridColumn={{
                        xs: "span 12",
                        sm: "span 12",
                        md: "span 12",
                        lg: "span 12",
                        xl: "span 12",
                      }}
                      className="grid-column"
                    >
                      <Index.Box className="role-card-main">
                        <Index.Box className="role-card-inner-flex">
                          <Index.Box className="role-titles-main">
                            <Index.Typography className="role-titles">
                              Banner Management
                            </Index.Typography>
                          </Index.Box>
                          <Index.Box className="roles-data-main-flex">
                            <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="BannerManagement.all"
                                  className="check-box-role"
                                  checked={values.BannerManagement.all}
                                  onChange={(e) =>
                                    handelAllCheck(
                                      e,
                                      "BannerManagement",
                                      setFieldValue
                                    )
                                  }
                                />
                                <Index.Box className="role-data-title">
                                  All
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                            <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="BannerManagement.View"
                                  className="check-box-role"
                                  checked={values?.BannerManagement?.View}
                                  onChange={(e) => {
                                    handelAllRead(
                                      e,
                                      "BannerManagement",
                                      setFieldValue
                                    );
                                    if (
                                      e.target.checked &&
                                      values?.BannerManagement?.create &&
                                      values?.BannerManagement?.update &&
                                      values?.BannerManagement?.delete
                                    ) {
                                      setFieldValue(
                                        `BannerManagement.all`,
                                        true
                                      );
                                    } else {
                                      setFieldValue(
                                        `BannerManagement.all`,
                                        false
                                      );
                                    }
                                  }}
                                />
                                <Index.Box className="role-data-title">
                                  Read
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                            <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="BannerManagement.create"
                                  className="check-box-role"
                                  onChange={(e) => {
                                    setFieldValue(
                                      "BannerManagement.create",
                                      e.target.checked
                                    );
                                    if (e.target.checked) {
                                      setFieldValue(
                                        "BannerManagement.View",
                                        e.target.checked
                                      );
                                    }

                                    if (
                                      values?.BannerManagement?.View &&
                                      e.target.checked &&
                                      values?.BannerManagement?.update &&
                                      values?.BannerManagement?.delete
                                    ) {
                                      setFieldValue(
                                        `BannerManagement.all`,
                                        true
                                      );
                                    } else {
                                      setFieldValue(
                                        `BannerManagement.all`,
                                        false
                                      );
                                    }
                                  }}
                                  checked={values?.BannerManagement?.create}
                                />
                                <Index.Box className="role-data-title">
                                  Create
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                            <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="BannerManagement.update"
                                  className="check-box-role"
                                  checked={values.BannerManagement.update}
                                  onChange={(e) => {
                                    setFieldValue(
                                      "BannerManagement.update",
                                      e.target.checked
                                    );
                                    if (e.target.checked) {
                                      setFieldValue(
                                        "BannerManagement.View",
                                        e.target.checked
                                      );
                                    }
                                    if (
                                      values?.BannerManagement?.View &&
                                      values?.BannerManagement?.create &&
                                      e.target.checked &&
                                      values?.BannerManagement?.delete
                                    ) {
                                      setFieldValue(
                                        `BannerManagement.all`,
                                        true
                                      );
                                    } else {
                                      setFieldValue(
                                        `BannerManagement.all`,
                                        false
                                      );
                                    }
                                  }}
                                />
                                <Index.Box className="role-data-title">
                                  Update
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                            <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="BannerManagement.delete"
                                  className="check-box-role"
                                  checked={values.BannerManagement.delete}
                                  onChange={(e) => {
                                    setFieldValue(
                                      "BannerManagement.delete",
                                      e.target.checked
                                    );
                                    if (e.target.checked) {
                                      setFieldValue(
                                        "BannerManagement.View",
                                        e.target.checked
                                      );
                                    }
                                    if (
                                      values?.BannerManagement?.View &&
                                      values?.BannerManagement?.create &&
                                      values?.BannerManagement?.update &&
                                      e.target.checked
                                    ) {
                                      setFieldValue(
                                        `BannerManagement.all`,
                                        true
                                      );
                                    } else {
                                      setFieldValue(
                                        `BannerManagement.all`,
                                        false
                                      );
                                    }
                                  }}
                                />
                                <Index.Box className="role-data-title">
                                  Delete
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                    <Index.Box
                      gridColumn={{
                        xs: "span 12",
                        sm: "span 12",
                        md: "span 12",
                        lg: "span 12",
                        xl: "span 12",
                      }}
                      className="grid-column"
                    >
                      <Index.Box className="role-card-main">
                        <Index.Box className="role-card-inner-flex">
                          <Index.Box className="role-titles-main">
                            <Index.Typography className="role-titles">
                              Currency Management
                            </Index.Typography>
                          </Index.Box>
                          <Index.Box className="roles-data-main-flex">
                            <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="CurrencyManagement.all"
                                  className="check-box-role"
                                  checked={values.CurrencyManagement.all}
                                  onChange={(e) =>
                                    handelAllCheck(
                                      e,
                                      "CurrencyManagement",
                                      setFieldValue
                                    )
                                  }
                                />
                                <Index.Box className="role-data-title">
                                  All
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                            <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="CurrencyManagement.View"
                                  className="check-box-role"
                                  checked={values?.CurrencyManagement?.View}
                                  onChange={(e) => {
                                    handelAllRead(
                                      e,
                                      "CurrencyManagement",
                                      setFieldValue
                                    );
                                    if (
                                      e.target.checked &&
                                      values?.CurrencyManagement?.create &&
                                      values?.CurrencyManagement?.update
                                    ) {
                                      setFieldValue(
                                        `CurrencyManagement.all`,
                                        true
                                      );
                                    } else {
                                      setFieldValue(
                                        `CurrencyManagement.all`,
                                        false
                                      );
                                    }
                                  }}
                                />

                                <Index.Box className="role-data-title">
                                  Read
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                            <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="CurrencyManagement.create"
                                  className="check-box-role"
                                  onChange={(e) => {
                                    setFieldValue(
                                      "CurrencyManagement.create",
                                      e.target.checked
                                    );
                                    if (e.target.checked) {
                                      setFieldValue(
                                        "CurrencyManagement.View",
                                        e.target.checked
                                      );
                                    }

                                    if (
                                      values?.CurrencyManagement?.View &&
                                      e.target.checked &&
                                      values?.CurrencyManagement?.update
                                    ) {
                                      setFieldValue(
                                        `CurrencyManagement.all`,
                                        true
                                      );
                                    } else {
                                      setFieldValue(
                                        `CurrencyManagement.all`,
                                        false
                                      );
                                    }
                                  }}
                                  checked={values?.CurrencyManagement?.create}
                                />
                                <Index.Box className="role-data-title">
                                  Create
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                            <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="CurrencyManagement.update"
                                  className="check-box-role"
                                  checked={values.CurrencyManagement.update}
                                  onChange={(e) => {
                                    setFieldValue(
                                      "CurrencyManagement.update",
                                      e.target.checked
                                    );
                                    if (e.target.checked) {
                                      setFieldValue(
                                        "CurrencyManagement.View",
                                        e.target.checked
                                      );
                                    }
                                    if (
                                      values?.CurrencyManagement?.View &&
                                      values?.CurrencyManagement?.create &&
                                      e.target.checked
                                    ) {
                                      setFieldValue(
                                        `CurrencyManagement.all`,
                                        true
                                      );
                                    } else {
                                      setFieldValue(
                                        `CurrencyManagement.all`,
                                        false
                                      );
                                    }
                                  }}
                                />
                                <Index.Box className="role-data-title">
                                  Update
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                            {/* <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="CurrencyManagement.delete"
                                  className="check-box-role"
                                  checked={values.CurrencyManagement.delete}
                                  onChange={(e) => {
                                    setFieldValue(
                                      "CurrencyManagement.delete",
                                      e.target.checked
                                    );
                                    if (e.target.checked) {
                                      setFieldValue(
                                        "CurrencyManagement.View",
                                        e.target.checked
                                      );
                                    }
                                    if (
                                      values?.CurrencyManagement?.View &&
                                      values?.CurrencyManagement?.create &&
                                      values?.CurrencyManagement?.update &&
                                      e.target.checked
                                    ) {
                                      setFieldValue(
                                        `CurrencyManagement.all`,
                                        true
                                      );
                                    } else {
                                      setFieldValue(
                                        `CurrencyManagement.all`,
                                        false
                                      );
                                    }
                                  }}
                                />
                                <Index.Box className="role-data-title">
                                  Delete
                                </Index.Box>
                              </Index.Box>
                            </Index.Box> */}
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                    <Index.Box
                      gridColumn={{
                        xs: "span 12",
                        sm: "span 12",
                        md: "span 12",
                        lg: "span 12",
                        xl: "span 12",
                      }}
                      className="grid-column"
                    >
                      <Index.Box className="role-card-main">
                        <Index.Box className="role-card-inner-flex">
                          <Index.Box className="role-titles-main">
                            <Index.Typography className="role-titles">
                              Game Management
                            </Index.Typography>
                          </Index.Box>
                          <Index.Box className="roles-data-main-flex">
                            <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="GameManagement.all"
                                  className="check-box-role"
                                  checked={values.GameManagement.all}
                                  onChange={(e) =>
                                    handelAllCheck(
                                      e,
                                      "GameManagement",
                                      setFieldValue
                                    )
                                  }
                                />
                                <Index.Box className="role-data-title">
                                  All
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                            <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="GameManagement.View"
                                  className="check-box-role"
                                  checked={values?.GameManagement?.View}
                                  onChange={(e) => {
                                    handelAllRead(
                                      e,
                                      "GameManagement",
                                      setFieldValue
                                    );
                                    if (
                                      e.target.checked &&
                                      values?.GameManagement?.update
                                    ) {
                                      setFieldValue(`GameManagement.all`, true);
                                    } else {
                                      setFieldValue(
                                        `GameManagement.all`,
                                        false
                                      );
                                    }
                                  }}
                                />

                                <Index.Box className="role-data-title">
                                  Read
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                            {/* <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="GameManagement.create"
                                  className="check-box-role"
                                  onChange={(e) => {
                                    setFieldValue(
                                      "GameManagement.create",
                                      e.target.checked
                                    );
                                    if (e.target.checked) {
                                      setFieldValue(
                                        "GameManagement.View",
                                        e.target.checked
                                      );
                                    }

                                    if (
                                      values?.GameManagement?.View &&
                                      e.target.checked &&
                                      values?.GameManagement?.update &&
                                      values?.GameManagement?.delete
                                    ) {
                                      setFieldValue(`GameManagement.all`, true);
                                    } else {
                                      setFieldValue(
                                        `GameManagement.all`,
                                        false
                                      );
                                    }
                                  }}
                                  checked={values?.GameManagement?.create}
                                />
                                <Index.Box className="role-data-title">
                                  Create
                                </Index.Box>
                              </Index.Box>
                            </Index.Box> */}
                            <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="GameManagement.update"
                                  className="check-box-role"
                                  checked={values.GameManagement.update}
                                  onChange={(e) => {
                                    setFieldValue(
                                      "GameManagement.update",
                                      e.target.checked
                                    );
                                    if (e.target.checked) {
                                      setFieldValue(
                                        "GameManagement.View",
                                        e.target.checked
                                      );
                                    }
                                    if (
                                      values?.GameManagement?.View &&
                                      e.target.checked
                                    ) {
                                      setFieldValue(`GameManagement.all`, true);
                                    } else {
                                      setFieldValue(
                                        `GameManagement.all`,
                                        false
                                      );
                                    }
                                  }}
                                />
                                <Index.Box className="role-data-title">
                                  Update
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                    {/* betting records */}
                    <Index.Box
                      gridColumn={{
                        xs: "span 12",
                        sm: "span 12",
                        md: "span 12",
                        lg: "span 12",
                        xl: "span 12",
                      }}
                      className="grid-column"
                    >
                      <Index.Box className="role-card-main">
                        <Index.Box className="role-card-inner-flex">
                          <Index.Box className="role-titles-main">
                            <Index.Typography className="role-titles">
                              Betting Records
                            </Index.Typography>
                          </Index.Box>
                          <Index.Box className="roles-data-main-flex">
                            <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="BettingRecords.all"
                                  className="check-box-role"
                                  checked={values.BettingRecords.all}
                                  onChange={(e) =>
                                    handelAllCheck(
                                      e,
                                      "BettingRecords",
                                      setFieldValue
                                    )
                                  }
                                />
                                <Index.Box className="role-data-title">
                                  All
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                            <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="BettingRecords.View"
                                  className="check-box-role"
                                  checked={values?.BettingRecords?.View}
                                  onChange={(e) => {
                                    handelAllRead(
                                      e,
                                      "BettingRecords",
                                      setFieldValue
                                    );
                                    if (
                                      e.target.checked
                                      // values?.WithdrawlRequest?.create &&
                                      // values?.WithdrawlRequest?.update &&
                                      // values?.WithdrawlRequest?.delete
                                    ) {
                                      setFieldValue(`BettingRecords.all`, true);
                                    } else {
                                      setFieldValue(
                                        `BettingRecords.all`,
                                        false
                                      );
                                    }
                                  }}
                                />
                                <Index.Box className="role-data-title">
                                  Read
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                            {/* <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="WithdrawlRequest.create"
                                  className="check-box-role"
                                  onChange={(e) => {
                                    setFieldValue(
                                      "WithdrawlRequest.create",
                                      e.target.checked
                                    );
                                    if (e.target.checked) {
                                      setFieldValue(
                                        "WithdrawlRequest.View",
                                        e.target.checked
                                      );
                                    }

                                    if (
                                      values?.WithdrawlRequest?.View &&
                                      e.target.checked &&
                                      values?.WithdrawlRequest?.update &&
                                      values?.WithdrawlRequest?.delete
                                    ) {
                                      setFieldValue(
                                        `WithdrawlRequest.all`,
                                        true
                                      );
                                    } else {
                                      setFieldValue(
                                        `WithdrawlRequest.all`,
                                        false
                                      );
                                    }
                                  }}
                                  checked={values?.WithdrawlRequest?.create}
                                />
                                <Index.Box className="role-data-title">
                                  Create
                                </Index.Box>
                              </Index.Box>
                            </Index.Box> */}
                            {/* <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="WithdrawlRequest.update"
                                  className="check-box-role"
                                  checked={values.WithdrawlRequest.update}
                                  onChange={(e) => {
                                    setFieldValue(
                                      "WithdrawlRequest.update",
                                      e.target.checked
                                    );
                                    if (e.target.checked) {
                                      setFieldValue(
                                        "WithdrawlRequest.View",
                                        e.target.checked
                                      );
                                    }
                                    if (
                                      values?.WithdrawlRequest?.View &&
                                      values?.WithdrawlRequest?.create &&
                                      e.target.checked &&
                                      values?.WithdrawlRequest?.delete
                                    ) {
                                      setFieldValue(
                                        `WithdrawlRequest.all`,
                                        true
                                      );
                                    } else {
                                      setFieldValue(
                                        `WithdrawlRequest.all`,
                                        false
                                      );
                                    }
                                  }}
                                />
                                <Index.Box className="role-data-title">
                                  Update
                                </Index.Box>
                              </Index.Box>
                            </Index.Box> */}
                            {/* <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="WithdrawlRequest.delete"
                                  className="check-box-role"
                                  checked={values.WithdrawlRequest.delete}
                                  onChange={(e) => {
                                    setFieldValue(
                                      "WithdrawlRequest.delete",
                                      e.target.checked
                                    );
                                    if (e.target.checked) {
                                      setFieldValue(
                                        "WithdrawlRequest.View",
                                        e.target.checked
                                      );
                                    }
                                    if (
                                      values?.WithdrawlRequest?.View &&
                                      values?.WithdrawlRequest?.create &&
                                      values?.WithdrawlRequest?.update &&
                                      e.target.checked
                                    ) {
                                      setFieldValue(
                                        `WithdrawlRequest.all`,
                                        true
                                      );
                                    } else {
                                      setFieldValue(
                                        `WithdrawlRequest.all`,
                                        false
                                      );
                                    }
                                  }}
                                />
                                <Index.Box className="role-data-title">
                                  Delete
                                </Index.Box>
                              </Index.Box>
                            </Index.Box> */}
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                    <Index.Box
                      gridColumn={{
                        xs: "span 12",
                        sm: "span 12",
                        md: "span 12",
                        lg: "span 12",
                        xl: "span 12",
                      }}
                      className="grid-column"
                    >
                      <Index.Box className="role-card-main">
                        <Index.Box className="role-card-inner-flex">
                          <Index.Box className="role-titles-main">
                            <Index.Typography className="role-titles">
                              Winner Declaration
                            </Index.Typography>
                          </Index.Box>
                          <Index.Box className="roles-data-main-flex">
                            <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="WinnerDeclaration.all"
                                  className="check-box-role"
                                  checked={values.WinnerDeclaration.all}
                                  onChange={(e) =>
                                    handelAllCheck(
                                      e,
                                      "WinnerDeclaration",
                                      setFieldValue
                                    )
                                  }
                                />
                                <Index.Box className="role-data-title">
                                  All
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                            <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="WinnerDeclaration.View"
                                  className="check-box-role"
                                  checked={values?.WinnerDeclaration?.View}
                                  onChange={(e) => {
                                    handelAllRead(
                                      e,
                                      "WinnerDeclaration",
                                      setFieldValue
                                    );
                                    if (
                                      e.target.checked &&
                                      values?.WinnerDeclaration?.update
                                    ) {
                                      setFieldValue(
                                        `WinnerDeclaration.all`,
                                        true
                                      );
                                    } else {
                                      setFieldValue(
                                        `WinnerDeclaration.all`,
                                        false
                                      );
                                    }
                                  }}
                                />

                                <Index.Box className="role-data-title">
                                  Read
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                            {/* <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="WinnerDeclaration.create"
                                  className="check-box-role"
                                  onChange={(e) => {
                                    setFieldValue(
                                      "WinnerDeclaration.create",
                                      e.target.checked
                                    );
                                    if (e.target.checked) {
                                      setFieldValue(
                                        "WinnerDeclaration.View",
                                        e.target.checked
                                      );
                                    }

                                    if (
                                      values?.WinnerDeclaration?.View &&
                                      e.target.checked &&
                                      values?.WinnerDeclaration?.update &&
                                      values?.WinnerDeclaration?.delete
                                    ) {
                                      setFieldValue(
                                        `WinnerDeclaration.all`,
                                        true
                                      );
                                    } else {
                                      setFieldValue(
                                        `WinnerDeclaration.all`,
                                        false
                                      );
                                    }
                                  }}
                                  checked={values?.WinnerDeclaration?.create}
                                />
                                <Index.Box className="role-data-title">
                                  Create
                                </Index.Box>
                              </Index.Box>
                            </Index.Box> */}
                            <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="WinnerDeclaration.update"
                                  className="check-box-role"
                                  checked={values.WinnerDeclaration.update}
                                  onChange={(e) => {
                                    setFieldValue(
                                      "WinnerDeclaration.update",
                                      e.target.checked
                                    );
                                    if (e.target.checked) {
                                      setFieldValue(
                                        `WinnerDeclaration.View`,
                                        e.target.checked
                                      );
                                      setFieldValue(
                                        `WinnerDeclaration.all`,
                                        e.target.checked
                                      );
                                    } else {
                                      setFieldValue(
                                        `WinnerDeclaration.all`,
                                        false
                                      );
                                    }
                                  }}
                                />
                                <Index.Box className="role-data-title">
                                  Update
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                            {/* <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="WinnerDeclaration.delete"
                                  className="check-box-role"
                                  checked={values.WinnerDeclaration.delete}
                                  onChange={(e) => {
                                    setFieldValue(
                                      "WinnerDeclaration.delete",
                                      e.target.checked
                                    );
                                    if (e.target.checked) {
                                      setFieldValue(
                                        "WinnerDeclaration.View",
                                        e.target.checked
                                      );
                                    }
                                    if (
                                      values?.WinnerDeclaration?.View &&
                                      values?.WinnerDeclaration?.create &&
                                      values?.WinnerDeclaration?.update &&
                                      e.target.checked
                                    ) {
                                      setFieldValue(
                                        `WinnerDeclaration.all`,
                                        true
                                      );
                                    } else {
                                      setFieldValue(
                                        `WinnerDeclaration.all`,
                                        false
                                      );
                                    }
                                  }}
                                />
                                <Index.Box className="role-data-title">
                                  Delete
                                </Index.Box>
                              </Index.Box>
                            </Index.Box> */}
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                    <Index.Box
                      gridColumn={{
                        xs: "span 12",
                        sm: "span 12",
                        md: "span 12",
                        lg: "span 12",
                        xl: "span 12",
                      }}
                      className="grid-column"
                    >
                      <Index.Box className="role-card-main">
                        <Index.Box className="role-card-inner-flex">
                          <Index.Box className="role-titles-main">
                            <Index.Typography className="role-titles">
                              Periods
                            </Index.Typography>
                          </Index.Box>
                          <Index.Box className="roles-data-main-flex">
                            <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="Periods.all"
                                  className="check-box-role"
                                  checked={values.Periods.all}
                                  onChange={(e) =>
                                    handelAllCheck(e, "Periods", setFieldValue)
                                  }
                                />
                                <Index.Box className="role-data-title">
                                  All
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                            <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="Periods.View"
                                  className="check-box-role"
                                  checked={values?.Periods?.View}
                                  onChange={(e) => {
                                    handelAllRead(e, "Periods", setFieldValue);
                                    if (
                                      e.target.checked
                                      // values?.Periods?.create &&
                                      // values?.Periods?.update &&
                                      // values?.Periods?.delete
                                    ) {
                                      setFieldValue(`Periods.all`, true);
                                    } else {
                                      setFieldValue(`Periods.all`, false);
                                    }
                                  }}
                                />

                                <Index.Box className="role-data-title">
                                  Read
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                            {/* <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="Periods.create"
                                  className="check-box-role"
                                  onChange={(e) => {
                                    setFieldValue(
                                      "Periods.create",
                                      e.target.checked
                                    );
                                    if (e.target.checked) {
                                      setFieldValue(
                                        "Periods.View",
                                        e.target.checked
                                      );
                                    }

                                    if (
                                      values?.Periods?.View &&
                                      e.target.checked &&
                                      values?.Periods?.update &&
                                      values?.Periods?.delete
                                    ) {
                                      setFieldValue(`Periods.all`, true);
                                    } else {
                                      setFieldValue(`Periods.all`, false);
                                    }
                                  }}
                                  checked={values?.Periods?.create}
                                />
                                <Index.Box className="role-data-title">
                                  Create
                                </Index.Box>
                              </Index.Box>
                            </Index.Box> */}
                            {/* <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="Periods.update"
                                  className="check-box-role"
                                  checked={values.Periods.update}
                                  onChange={(e) => {
                                    setFieldValue(
                                      "Periods.update",
                                      e.target.checked
                                    );
                                    if (e.target.checked) {
                                      setFieldValue(
                                        "Periods.View",
                                        e.target.checked
                                      );
                                    }
                                    if (
                                      values?.Periods?.View &&
                                      values?.Periods?.create &&
                                      e.target.checked &&
                                      values?.Periods?.delete
                                    ) {
                                      setFieldValue(`Periods.all`, true);
                                    } else {
                                      setFieldValue(`Periods.all`, false);
                                    }
                                  }}
                                />
                                <Index.Box className="role-data-title">
                                  Update
                                </Index.Box>
                              </Index.Box>
                            </Index.Box> */}
                            {/* <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="Periods.delete"
                                  className="check-box-role"
                                  checked={values.Periods.delete}
                                  onChange={(e) => {
                                    setFieldValue(
                                      "Periods.delete",
                                      e.target.checked
                                    );
                                    if (e.target.checked) {
                                      setFieldValue(
                                        "Periods.View",
                                        e.target.checked
                                      );
                                    }
                                    if (
                                      values?.Periods?.View &&
                                      values?.Periods?.create &&
                                      values?.Periods?.update &&
                                      e.target.checked
                                    ) {
                                      setFieldValue(`Periods.all`, true);
                                    } else {
                                      setFieldValue(`Periods.all`, false);
                                    }
                                  }}
                                />
                                <Index.Box className="role-data-title">
                                  Delete
                                </Index.Box>
                              </Index.Box>
                            </Index.Box> */}
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                    <Index.Box
                      gridColumn={{
                        xs: "span 12",
                        sm: "span 12",
                        md: "span 12",
                        lg: "span 12",
                        xl: "span 12",
                      }}
                      className="grid-column"
                    >
                      <Index.Box className="role-card-main">
                        <Index.Box className="role-card-inner-flex">
                          <Index.Box className="role-titles-main">
                            <Index.Typography className="role-titles">
                              Query
                            </Index.Typography>
                          </Index.Box>
                          <Index.Box className="roles-data-main-flex">
                            <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="Query.all"
                                  className="check-box-role"
                                  checked={values.Query.all}
                                  onChange={(e) =>
                                    handelAllCheck(e, "Query", setFieldValue)
                                  }
                                />
                                <Index.Box className="role-data-title">
                                  All
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                            <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="Query.View"
                                  className="check-box-role"
                                  checked={values?.Query?.View}
                                  onChange={(e) => {
                                    handelAllRead(e, "Query", setFieldValue);
                                    if (e.target.checked) {
                                      setFieldValue(`Query.all`, true);
                                    } else {
                                      setFieldValue(`Query.all`, false);
                                    }
                                  }}
                                />

                                <Index.Box className="role-data-title">
                                  Read
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                            {/* <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="Query.create"
                                  className="check-box-role"
                                  onChange={(e) => {
                                    setFieldValue(
                                      "Query.create",
                                      e.target.checked
                                    );
                                    if (e.target.checked) {
                                      setFieldValue(
                                        "Query.View",
                                        e.target.checked
                                      );
                                    }

                                    if (
                                      values?.Query?.View &&
                                      e.target.checked &&
                                      values?.Query?.update &&
                                      values?.Query?.delete
                                    ) {
                                      setFieldValue(`Query.all`, true);
                                    } else {
                                      setFieldValue(`Query.all`, false);
                                    }
                                  }}
                                  checked={values?.Query?.create}
                                />
                                <Index.Box className="role-data-title">
                                  Create
                                </Index.Box>
                              </Index.Box>
                            </Index.Box> */}
                            {/* <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="Query.update"
                                  className="check-box-role"
                                  checked={values.Query.update}
                                  onChange={(e) => {
                                    setFieldValue(
                                      "Query.update",
                                      e.target.checked
                                    );
                                    if (e.target.checked) {
                                      setFieldValue(
                                        "Query.View",
                                        e.target.checked
                                      );
                                    }
                                    if (
                                      values?.Query?.View &&
                                      values?.Query?.create &&
                                      e.target.checked &&
                                      values?.Query?.delete
                                    ) {
                                      setFieldValue(`Query.all`, true);
                                    } else {
                                      setFieldValue(`Query.all`, false);
                                    }
                                  }}
                                />
                                <Index.Box className="role-data-title">
                                  Update
                                </Index.Box>
                              </Index.Box>
                            </Index.Box> */}
                            {/* <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="Query.delete"
                                  className="check-box-role"
                                  checked={values.Query.delete}
                                  onChange={(e) => {
                                    setFieldValue(
                                      "Query.delete",
                                      e.target.checked
                                    );
                                    if (e.target.checked) {
                                      setFieldValue(
                                        "Query.View",
                                        e.target.checked
                                      );
                                    }
                                    if (
                                      values?.Query?.View &&
                                      values?.Query?.create &&
                                      values?.Query?.update &&
                                      e.target.checked
                                    ) {
                                      setFieldValue(`Query.all`, true);
                                    } else {
                                      setFieldValue(`Query.all`, false);
                                    }
                                  }}
                                />
                                <Index.Box className="role-data-title">
                                  Delete
                                </Index.Box>
                              </Index.Box>
                            </Index.Box> */}
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                    <Index.Box
                      gridColumn={{
                        xs: "span 12",
                        sm: "span 12",
                        md: "span 12",
                        lg: "span 12",
                        xl: "span 12",
                      }}
                      className="grid-column"
                    >
                      <Index.Box className="role-card-main">
                        <Index.Box className="role-card-inner-flex">
                          <Index.Box className="role-titles-main">
                            <Index.Typography className="role-titles">
                              Setting
                            </Index.Typography>
                          </Index.Box>
                          <Index.Box className="roles-data-main-flex">
                            <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="Setting.all"
                                  className="check-box-role"
                                  checked={values.Setting.all}
                                  onChange={(e) =>
                                    handelAllCheck(e, "Setting", setFieldValue)
                                  }
                                />
                                <Index.Box className="role-data-title">
                                  All
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                            <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="Setting.View"
                                  className="check-box-role"
                                  checked={values?.Setting?.View}
                                  onChange={(e) => {
                                    handelAllRead(e, "Setting", setFieldValue);
                                    if (
                                      e.target.checked &&
                                      values?.Setting?.update
                                    ) {
                                      setFieldValue(`Setting.all`, true);
                                    } else {
                                      setFieldValue(`Setting.all`, false);
                                    }
                                  }}
                                />

                                <Index.Box className="role-data-title">
                                  Read
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                            {/* <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="Setting.create"
                                  className="check-box-role"
                                  onChange={(e) => {
                                    setFieldValue(
                                      "Setting.create",
                                      e.target.checked
                                    );
                                    if (e.target.checked) {
                                      setFieldValue(
                                        "Setting.View",
                                        e.target.checked
                                      );
                                    }

                                    if (
                                      values?.Setting?.View &&
                                      e.target.checked &&
                                      values?.Setting?.update &&
                                      values?.Setting?.delete
                                    ) {
                                      setFieldValue(`Setting.all`, true);
                                    } else {
                                      setFieldValue(`Setting.all`, false);
                                    }
                                  }}
                                  checked={values?.Setting?.create}
                                />
                                <Index.Box className="role-data-title">
                                  Create
                                </Index.Box>
                              </Index.Box>
                            </Index.Box> */}
                            <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="Setting.update"
                                  className="check-box-role"
                                  checked={values.Setting.update}
                                  onChange={(e) => {
                                    setFieldValue(
                                      "Setting.update",
                                      e.target.checked
                                    );
                                    if (e.target.checked) {
                                      setFieldValue(
                                        `Setting.View`,
                                        e.target.checked
                                      );
                                      setFieldValue(
                                        `Setting.all`,
                                        e.target.checked
                                      );
                                    } else {
                                      setFieldValue(`Setting.all`, false);
                                    }
                                    // if (
                                    //   values?.CMS.SocialLinks?.View &&
                                    //   // values?.CMS.SocialLinks?.create &&
                                    //   e.target.checked
                                    //   // values?.CMS.SocialLinks?.delete
                                    // ) {
                                    //   setFieldValue(
                                    //     `CMS.SocialLinks.all`,
                                    //     true
                                    //   );
                                    // } else {
                                    //   setFieldValue(
                                    //     `CMS.SocialLinks.all`,
                                    //     false
                                    //   );
                                    // }
                                  }}
                                />
                                <Index.Box className="role-data-title">
                                  Update
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                            {/* <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="Setting.delete"
                                  className="check-box-role"
                                  checked={values.Setting.delete}
                                  onChange={(e) => {
                                    setFieldValue(
                                      "Setting.delete",
                                      e.target.checked
                                    );
                                    if (e.target.checked) {
                                      setFieldValue(
                                        "Setting.View",
                                        e.target.checked
                                      );
                                    }
                                    if (
                                      values?.Setting?.View &&
                                      values?.Setting?.create &&
                                      values?.Setting?.update &&
                                      e.target.checked
                                    ) {
                                      setFieldValue(`Setting.all`, true);
                                    } else {
                                      setFieldValue(`Setting.all`, false);
                                    }
                                  }}
                                />
                                <Index.Box className="role-data-title">
                                  Delete
                                </Index.Box>
                              </Index.Box>
                            </Index.Box> */}
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                    {/* PaymentMethod */}

                    <Index.Box
                      gridColumn={{
                        xs: "span 12",
                        sm: "span 12",
                        md: "span 12",
                        lg: "span 12",
                        xl: "span 12",
                      }}
                      className="grid-column"
                    >
                      <Index.Box className="role-card-main">
                        <Index.Box className="role-card-inner-flex">
                          <Index.Box className="role-titles-main">
                            <Index.Typography className="role-titles">
                              Payment Method
                            </Index.Typography>
                          </Index.Box>
                          <Index.Box className="roles-data-main-flex">
                            <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="CMS.PaymentMethod.all"
                                  className="check-box-role"
                                  checked={values.CMS.PaymentMethod.all}
                                  onChange={(e) =>
                                    handelAllCheck(
                                      e,
                                      "CMS.PaymentMethod",
                                      setFieldValue
                                    )
                                  }
                                />
                                <Index.Box className="role-data-title">
                                  All
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                            <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="CMS.PaymentMethod.View"
                                  className="check-box-role"
                                  onChange={(e) => {
                                    handelAllRead(
                                      e,
                                      "CMS.PaymentMethod",
                                      setFieldValue
                                    );
                                    if (
                                      e.target.checked &&
                                      values?.CMS?.PaymentMethod?.update
                                    ) {
                                      setFieldValue(
                                        `CMS.PaymentMethod.all`,
                                        true
                                      );
                                    } else {
                                      setFieldValue(
                                        `CMS.PaymentMethod.all`,
                                        false
                                      );
                                    }
                                  }}
                                  checked={values?.CMS?.PaymentMethod?.View}
                                />

                                <Index.Box className="role-data-title">
                                  Read
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>

                            <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="CMS.PaymentMethod.create"
                                  className="check-box-role"
                                  onChange={(e) => {
                                    setFieldValue(
                                      "CMS.PaymentMethod.create",
                                      e.target.checked
                                    );
                                    if (e.target.checked) {
                                      setFieldValue(
                                        "CMS.PaymentMethod.View",
                                        e.target.checked
                                      );
                                    }

                                    if (
                                      values?.CMS.PaymentMethod?.View &&
                                      e.target.checked &&
                                      values?.CMS.PaymentMethod?.update &&
                                      values?.CMS.PaymentMethod?.delete
                                    ) {
                                      setFieldValue(
                                        `CMS.PaymentMethod.all`,
                                        true
                                      );
                                    } else {
                                      setFieldValue(
                                        `CMS.PaymentMethod.all`,
                                        false
                                      );
                                    }
                                  }}
                                  checked={values?.CMS.PaymentMethod?.create}
                                />
                                <Index.Box className="role-data-title">
                                  Create
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>

                            <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="CMS.PaymentMethod.update"
                                  className="check-box-role"
                                  checked={values.CMS.PaymentMethod?.update}
                                  onChange={(e) => {
                                    setFieldValue(
                                      "CMS.PaymentMethod.update",
                                      e.target.checked
                                    );
                                    if (e.target.checked) {
                                      setFieldValue(
                                        "CMS.PaymentMethod.View",
                                        e.target.checked
                                      );
                                    }
                                    if (
                                      values?.CMS.PaymentMethod?.View &&
                                      values?.CMS.PaymentMethod?.create &&
                                      e.target.checked &&
                                      values?.CMS.PaymentMethod?.delete
                                    ) {
                                      setFieldValue(
                                        `CMS.PaymentMethod.all`,
                                        true
                                      );
                                    } else {
                                      setFieldValue(
                                        `CMS.PaymentMethod.all`,
                                        false
                                      );
                                    }
                                  }}
                                />
                                <Index.Box className="role-data-title">
                                  Update
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>

                            <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="CMS.PaymentMethod.delete"
                                  className="check-box-role"
                                  checked={values.CMS.PaymentMethod?.delete}
                                  onChange={(e) => {
                                    setFieldValue(
                                      "CMS.PaymentMethod.delete",
                                      e.target.checked
                                    );
                                    if (e.target.checked) {
                                      setFieldValue(
                                        "CMS.PaymentMethod.View",
                                        e.target.checked
                                      );
                                    }
                                    if (
                                      values?.CMS.PaymentMethod?.View &&
                                      values?.CMS.PaymentMethod?.create &&
                                      values?.CMS.PaymentMethod?.update &&
                                      e.target.checked
                                    ) {
                                      setFieldValue(
                                        `CMS.PaymentMethod.all`,
                                        true
                                      );
                                    } else {
                                      setFieldValue(
                                        `CMS.PaymentMethod.all`,
                                        false
                                      );
                                    }
                                  }}
                                />
                                <Index.Box className="role-data-title">
                                  Delete
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                            <Index.Box className="roles-data-box"></Index.Box>
                            <Index.Box className="roles-data-box"></Index.Box>
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                    <Index.Box
                      gridColumn={{
                        xs: "span 12",
                        sm: "span 12",
                        md: "span 12",
                        lg: "span 12",
                        xl: "span 12",
                      }}
                      className="grid-column"
                    >
                      <Index.Box className="role-card-main">
                        <Index.Box className="role-card-inner-flex">
                          <Index.Box className="role-titles-main">
                            <Index.Typography className="role-titles">
                              Terms And Condition
                            </Index.Typography>
                          </Index.Box>
                          <Index.Box className="roles-data-main-flex">
                            <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="CMS.TermsAndCondition.all"
                                  className="check-box-role"
                                  checked={values.CMS.TermsAndCondition.all}
                                  onChange={(e) =>
                                    handelAllCheck(
                                      e,
                                      "CMS.TermsAndCondition",
                                      setFieldValue
                                    )
                                  }
                                />
                                <Index.Box className="role-data-title">
                                  All
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                            <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="CMS.TermsAndCondition.View"
                                  className="check-box-role"
                                  onChange={(e) => {
                                    handelAllRead(
                                      e,
                                      "CMS.TermsAndCondition",
                                      setFieldValue
                                    );
                                    if (
                                      e.target.checked &&
                                      values?.CMS?.TermsAndCondition?.update
                                    ) {
                                      setFieldValue(
                                        `CMS.TermsAndCondition.all`,
                                        true
                                      );
                                    } else {
                                      setFieldValue(
                                        `CMS.TermsAndCondition.all`,
                                        false
                                      );
                                    }
                                  }}
                                  checked={values?.CMS?.TermsAndCondition?.View}
                                />

                                <Index.Box className="role-data-title">
                                  Read
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                            <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="CMS.TermsAndCondition.update"
                                  className="check-box-role"
                                  onChange={(e) => {
                                    setFieldValue(
                                      "CMS.TermsAndCondition.update",
                                      e.target.checked
                                    );
                                    if (e.target.checked) {
                                      setFieldValue(
                                        "CMS.TermsAndCondition.View",
                                        e.target.checked
                                      );
                                      setFieldValue(
                                        `CMS.TermsAndCondition.all`,
                                        e.target.checked
                                      );
                                    } else {
                                      setFieldValue(
                                        `CMS.TermsAndCondition.all`,
                                        false
                                      );
                                    }
                                  }}
                                  checked={
                                    values?.CMS?.TermsAndCondition?.update
                                  }
                                />
                                <Index.Box className="role-data-title">
                                  Update
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                            <Index.Box className="roles-data-box"></Index.Box>
                            <Index.Box className="roles-data-box"></Index.Box>
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                    <Index.Box
                      gridColumn={{
                        xs: "span 12",
                        sm: "span 12",
                        md: "span 12",
                        lg: "span 12",
                        xl: "span 12",
                      }}
                      className="grid-column"
                    >
                      <Index.Box className="role-card-main">
                        <Index.Box className="role-card-inner-flex">
                          <Index.Box className="role-titles-main">
                            <Index.Typography className="role-titles">
                              Privacy Policy
                            </Index.Typography>
                          </Index.Box>
                          <Index.Box className="roles-data-main-flex">
                            <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="CMS.PrivacyPolicy.all"
                                  className="check-box-role"
                                  checked={values.CMS.PrivacyPolicy.all}
                                  onChange={(e) =>
                                    handelAllCheck(
                                      e,
                                      "CMS.PrivacyPolicy",
                                      setFieldValue
                                    )
                                  }
                                />
                                <Index.Box className="role-data-title">
                                  All
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                            <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="CMS.PrivacyPolicy.View"
                                  className="check-box-role"
                                  onChange={(e) => {
                                    handelAllRead(
                                      e,
                                      "CMS.PrivacyPolicy",
                                      setFieldValue
                                    );
                                    if (
                                      e.target.checked &&
                                      // values?.CMS.PrivacyPolicy?.create &&
                                      values?.CMS?.PrivacyPolicy?.update
                                      // values?.CMS.PrivacyPolicy?.delete
                                    ) {
                                      setFieldValue(
                                        `CMS.PrivacyPolicy.all`,
                                        true
                                      );
                                    } else {
                                      setFieldValue(
                                        `CMS.PrivacyPolicy.all`,
                                        false
                                      );
                                    }
                                  }}
                                  checked={values?.CMS?.PrivacyPolicy?.View}
                                />

                                <Index.Box className="role-data-title">
                                  Read
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                            <Index.Box className="roles-data-box">
                              <Index.Box className="add-role-flex">
                                <Index.Checkbox
                                  name="CMS.PrivacyPolicy.update"
                                  className="check-box-role"
                                  onChange={(e) => {
                                    setFieldValue(
                                      "CMS.PrivacyPolicy.update",
                                      e.target.checked
                                    );
                                    if (e.target.checked) {
                                      setFieldValue(
                                        "CMS.PrivacyPolicy.View",
                                        e.target.checked
                                      );
                                      setFieldValue(
                                        `CMS.PrivacyPolicy.all`,
                                        e.target.checked
                                      );
                                    } else {
                                      setFieldValue(
                                        `CMS.PrivacyPolicy.all`,
                                        false
                                      );
                                    }
                                  }}
                                  checked={values?.CMS?.PrivacyPolicy?.update}
                                />
                                <Index.Box className="role-data-title">
                                  Update
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                            <Index.Box className="roles-data-box"></Index.Box>
                            <Index.Box className="roles-data-box"></Index.Box>
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                  <Index.Box className="add-game-button">
                    <Index.Box className="common-button blue-button flex-start save-btn add-submit-btn">
                      <Index.Button
                        variant="contained"
                        onClick={() => navigate("/admin/role-list")}
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
                        {id ? "Update" : "Save"}
                      </Index.Button>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              </Index.Stack>
            )}
          </Formik>
        </Index.Box>
      )}
    </>
  );
}
