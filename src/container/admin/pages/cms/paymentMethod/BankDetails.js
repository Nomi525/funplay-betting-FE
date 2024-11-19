import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DataService from "../../../../../config/DataService";
import { Api } from "../../../../../config/Api";
import Index from "../../../../Index";
import PageIndex from "../../../../pageIndex";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { userBankDetails } from "../../../../../validation/Validation";
import { useSelector } from "react-redux";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const BankDetails = () => {
  const [bankDetails, setBankDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const permission = useSelector((state) => state.AdminReducer.adminRoleData);

  let initialValues = {
    bankName: bankDetails?.[0]?.bankName || "",
    branch: bankDetails?.[0]?.branch || "",
    accountHolder: bankDetails?.[0]?.accountHolder || "",
    accountNumber: bankDetails?.[0]?.accountNumber || "",
    IFSCCode: bankDetails?.[0]?.IFSCCode || "",
  };
  const handleBankDetails = (values) => {
    const data = {
      bankName: values.bankName,
      branch: values.branch,
      accountHolder: values.accountHolder,
      accountNumber: parseInt(values.accountNumber),
      IFSCCode: values.IFSCCode,
    };
    if (bankDetails.length) {
      data.id = bankDetails[0]._id;
    }
    DataService.post(Api.ADMIN_ADD_EDIT_BANK_DETAILS, data)
      .then((res) => {
        console.log(res, 248);
        toast.success(res?.data?.message, {
          toastId: "customId",
        });
        // navigate("/user/setting", {
        //   state: { tab: userDetail?.password ? 2 : 1 },
        // });
        // navigate("/user/setting", {
        //   state: { value: 2 },
        // });
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message, {
          toastId: "customId",
        });
      });
  };

  const getBankDetails = async () => {
    setLoading(true);
    await DataService.get(Api.ADMIN_GET_BANK_DETAILS)
      .then((res) => {
        console.log(res?.data?.data, "res55");
        setBankDetails(res?.data?.data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((e) => {
        toast.error(
          e.res?.data?.message ? e.res?.data?.message : e.message
          // navigate("/admin/login")
        );
        setLoading(false);
      });
  };
  console.log({ bankDetails });

  useEffect(() => {
    getBankDetails();
  }, []);
  return (
    <PageIndex.Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={userBankDetails}
      onSubmit={handleBankDetails}
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
          {console.log(values, 646)}
          <Index.Box className="tab-main-card-content">
            <Index.Box className="tab-main-pd-content">
              <Index.Box sx={{ width: 1 }} className="grid-main">
                <Index.Box
                  display="grid"
                  gridTemplateColumns="repeat(12, 1fr)"
                  gap={{ xs: 2, sm: 2, md: 0, lg: 0 }}
                  className="grid-row-details"
                >
                  <Index.Box
                    gridColumn={{
                      xs: "span 12",
                      sm: "span 6",
                      md: "span 4",
                      lg: "span 6",
                    }}
                    className="grid-column grid-user-col"
                  >
                    <Item className="grid-item">
                      <Index.Box className="form-group-main deposit-form-content setting-pass-main mb-30px-form">
                        <Index.FormHelperText className="title-label-comman-user">
                          Bank Name
                        </Index.FormHelperText>
                        <Index.Box className="input-design-div admin-design-div input-design-div-set-back setting-password">
                          <Index.Box className="input-details-main">
                            <Index.Box className="input-box cm-search-box">
                              <Index.Box className="form-group">
                                <Index.Box className="form-group pass_group_main">
                                  <Index.TextField
                                    variant="filled"
                                    className="admin-input-design input-placeholder"
                                    placeholder="Bank Name"
                                    type="text"
                                    name="bankName"
                                    onBlur={handleBlur}
                                    value={values.bankName}
                                    // onChange={handleChange}
                                    onChange={(e) => {
                                      let value = e?.target?.value;
                                      if (value?.length <= 40) {
                                        setFieldValue("bankName", value);
                                      }
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
                                  {errors.bankName && touched.bankName && (
                                    <Index.FormHelperText error>
                                      {errors.bankName}
                                    </Index.FormHelperText>
                                  )}
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Item>
                  </Index.Box>
                  <Index.Box
                    gridColumn={{
                      xs: "span 12",
                      sm: "span 6",
                      md: "span 4",
                      lg: "span 6",
                    }}
                    className="grid-column grid-user-col"
                  >
                    <Item className="grid-item">
                      <Index.Box className="form-group-main deposit-form-content setting-pass-main mb-30px-form">
                        <Index.FormHelperText className="title-label-comman-user">
                          Branch
                        </Index.FormHelperText>
                        <Index.Box className="input-design-div admin-design-div input-design-div-set-back setting-password">
                          <Index.Box className="input-details-main">
                            <Index.Box className="input-box cm-search-box">
                              <Index.Box className="form-group">
                                <Index.Box className="form-group pass_group_main">
                                  <Index.TextField
                                    variant="filled"
                                    className="admin-input-design input-placeholder"
                                    type="text"
                                    name="branch"
                                    placeholder="Branch"
                                    onBlur={handleBlur}
                                    value={values.branch}
                                    // onChange={handleChange}
                                    onChange={(e) => {
                                      let value = e?.target?.value;
                                      if (value?.length <= 100) {
                                        setFieldValue("branch", value);
                                      }
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
                                  {errors.branch && touched.branch && (
                                    <Index.FormHelperText error>
                                      {errors.branch}
                                    </Index.FormHelperText>
                                  )}
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Item>
                  </Index.Box>
                  <Index.Box
                    gridColumn={{
                      xs: "span 12",
                      sm: "span 6",
                      md: "span 4",
                      lg: "span 6",
                    }}
                    className="grid-column grid-user-col"
                  >
                    <Item className="grid-item">
                      <Index.Box className="form-group-main deposit-form-content setting-pass-main mb-30px-form">
                        <Index.FormHelperText className="title-label-comman-user">
                          Account Holder Name
                        </Index.FormHelperText>
                        <Index.Box className="input-design-div admin-design-div input-design-div-set-back setting-password">
                          <Index.Box className="input-details-main">
                            <Index.Box className="input-box cm-search-box">
                              <Index.Box className="form-group">
                                <Index.Box className="form-group pass_group_main">
                                  <Index.TextField
                                    variant="filled"
                                    className="admin-input-design input-placeholder"
                                    type="text"
                                    name="accountHolder"
                                    placeholder="Account Holder Name"
                                    onBlur={handleBlur}
                                    value={values.accountHolder}
                                    // onChange={handleChange}
                                    onChange={(e) => {
                                      let value = e?.target?.value;
                                      if (value?.length <= 40) {
                                        setFieldValue("accountHolder", value);
                                      }
                                    }}
                                    // inputProps={{
                                    //   maxLength: 17,
                                    // }}
                                    onKeyDown={(e) => {
                                      if (
                                        e.key === " " &&
                                        e.target.value.trim() === ""
                                      ) {
                                        e.preventDefault();
                                      }
                                    }}
                                  />
                                  {errors.accountHolder &&
                                    touched.accountHolder && (
                                      <Index.FormHelperText error>
                                        {errors.accountHolder}
                                      </Index.FormHelperText>
                                    )}
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Item>
                  </Index.Box>
                  <Index.Box
                    gridColumn={{
                      xs: "span 12",
                      sm: "span 6",
                      md: "span 4",
                      lg: "span 6",
                    }}
                    className="grid-column grid-user-col"
                  >
                    <Item className="grid-item">
                      <Index.Box className="form-group-main deposit-form-content setting-pass-main mb-30px-form">
                        <Index.FormHelperText className="title-label-comman-user">
                          Account Number
                        </Index.FormHelperText>
                        <Index.Box className="input-design-div admin-design-div input-design-div-set-back setting-password">
                          <Index.Box className="input-details-main">
                            <Index.Box className="input-box cm-search-box">
                              <Index.Box className="form-group">
                                <Index.Box className="form-group pass_group_main">
                                  <Index.TextField
                                    variant="filled"
                                    className="admin-input-design input-placeholder"
                                    type="number"
                                    onWheel={(event) => event.target.blur()}
                                    name="accountNumber"
                                    placeholder="Account Number"
                                    onBlur={handleBlur}
                                    value={values.accountNumber}
                                    // onChange={handleChange}
                                    // inputProps={{
                                    //   maxLength: 17,
                                    // }}
                                    onChange={(e) => {
                                      let value = e?.target?.value;
                                      if (value?.length <= 14) {
                                        setFieldValue("accountNumber", value);
                                      }
                                    }}
                                    onKeyPress={(e) => {
                                      if (e.key === "e") {
                                        e.preventDefault();
                                      }
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
                                  {errors.accountNumber &&
                                    touched.accountNumber && (
                                      <Index.FormHelperText error>
                                        {errors.accountNumber}
                                      </Index.FormHelperText>
                                    )}
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Item>
                  </Index.Box>
                  <Index.Box
                    gridColumn={{
                      xs: "span 12",
                      sm: "span 6",
                      md: "span 4",
                      lg: "span 6",
                    }}
                    className="grid-column grid-user-col"
                  >
                    <Item className="grid-item">
                      <Index.Box className="form-group-main deposit-form-content setting-pass-main mb-30px-form">
                        <Index.FormHelperText className="title-label-comman-user">
                          IFSC Code
                        </Index.FormHelperText>
                        <Index.Box className="input-design-div admin-design-div input-design-div-set-back setting-password">
                          <Index.Box className="input-details-main">
                            <Index.Box className="input-box cm-search-box">
                              <Index.Box className="form-group">
                                <Index.Box className="form-group pass_group_main">
                                  <Index.TextField
                                    variant="filled"
                                    className="admin-input-design input-placeholder"
                                    type="nmber"
                                    name="IFSCCode"
                                    placeholder="IFSC Code"
                                    onBlur={handleBlur}
                                    value={values.IFSCCode}
                                    onChange={handleChange}
                                    inputProps={{
                                      maxLength: 11,
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
                                  {errors.IFSCCode && touched.IFSCCode && (
                                    <Index.FormHelperText error>
                                      {errors.IFSCCode}
                                    </Index.FormHelperText>
                                  )}
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Item>
                  </Index.Box>
                  <Index.Box
                    gridColumn={{
                      xs: "span 12",
                      sm: "span 12",
                      md: "span 12",
                      lg: "span 12",
                    }}
                    className="grid-column grid-user-col"
                  >
                    {permission.isAdmin == true ||
                    (permission.role?.CMS?.PaymentMethod?.update == true &&
                      permission.isAdmin == false) ? (
                      <>
                        <Index.Box className="betting-card-btn-comman max-betting-card">
                          <PageIndex.BlueButton
                            btnLabel="Submit"
                            className="blue-btn-content"
                            type="submit"
                            // onClick={() =>
                            //   handleBankDetails(values, errors)
                            // }
                          />
                        </Index.Box>
                      </>
                    ) : (
                      ""
                    )}
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.Box>
          </Index.Box>
        </form>
      )}
    </PageIndex.Formik>
  );
};

export default BankDetails;
