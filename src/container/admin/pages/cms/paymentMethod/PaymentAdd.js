import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ErrorMessage, Form } from "formik";
import { useLocation } from "react-router-dom";
import Index from "../../../../Index";
import PageIndex from "../../../../pageIndex";
import DataService from "../../../../../config/DataService";
import { Api } from "../../../../../config/Api";
import Loader from "../../../../../component/comman/loader/Loader";
import PropTypes from "prop-types";
import UpiList from "./UpiList";
import BankDetails from "./BankDetails";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Index.Box className="tab-details-content-top">
          <Index.Typography className="tab-details-inner">
            {children}
          </Index.Typography>
        </Index.Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const PaymentAdd = () => {
  const navigate = Index.useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [paymentMethodTab, setPaymentMethodTab] = useState(0);
  console.log(paymentDetails, 16);

  const [qrCode, setQrCode] = useState("");
  //   const row = location?.state?.selectedData;
  console.log(qrCode, 20);

  // Initital values
  let initialValues = {
    UpiID: paymentDetails?.[0]?.UpiID ? paymentDetails?.[0]?.UpiID : "",
    qrCode: paymentDetails?.[0]?.qrCode ? paymentDetails?.[0]?.qrCode : "",
  };

  const handleFormSubmit = async (values) => {
    const formdata = new FormData();
    formdata.append("UpiID", values?.UpiID);
    formdata.append("qrCode", values?.qrCode);
    DataService.post(Api.ADMIN_PAYMENT_ADD, formdata)
      .then((res) => {
        console.log(res?.data?.status, 36);
        if (res?.data?.status === 200) {
          toast.success(res?.data?.message);
          getPaymentList();
        }
      })
      .catch((e) => {
        toast.error(
          e.response?.data?.message ? e.response?.data?.message : e.message
        );
      });
  };

  // get payment details
  const getPaymentList = async () => {
    setLoading(true);
    await DataService.get(Api.ADMIN_GET_PAYMENT_DETAILS)
      .then((res) => {
        console.log(res?.data?.data, "res55");
        setPaymentDetails(res?.data?.data);
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

  const handleChangePaymentMethodTab = (event, newValue) => {
    setPaymentMethodTab(newValue);
  };

  useEffect(() => {
    getPaymentList();
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
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
                    {/* {paymentDetails?._id ? "Edit Banner" : "Payment Method"} */}
                    {paymentDetails?._id
                      ? "Edit Payment Method"
                      : "Payment Method"}

                    {/* {params?.gameId? "Edit Game" : "Add Game"} */}
                    {/* {location?.state?.values ? "Add Game" : "Edit Game "}  */}
                  </Index.Typography>
                </Index.Box>
              </Index.Box>
            </Index.Box>
            <Index.Box className="tab-details-setting">
              <Index.Box sx={{ width: "100%" }} className="tab-account-user">
                <Index.Box
                  sx={{ borderBottom: 1, borderColor: "divider" }}
                  className="tab-border-user"
                >
                  <Index.Tabs
                    value={paymentMethodTab}
                    onChange={handleChangePaymentMethodTab}
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                    aria-label="scrollable force tabs example"
                    className="tab-content-user"
                  >
                    <Index.Tab
                      label="UPI"
                      {...a11yProps(0)}
                      className="tab-btn-details"
                    />
                    <Index.Tab
                      label="Bank Account"
                      {...a11yProps(1)}
                      className="tab-btn-details"
                    />
                  </Index.Tabs>
                </Index.Box>
                {/* update profile */}
                <CustomTabPanel
                  value={paymentMethodTab}
                  index={0}
                  className="tabpanel-user-details"
                >
                  <UpiList />
                </CustomTabPanel>
                <CustomTabPanel
                  value={paymentMethodTab}
                  index={1}
                  className="tabpanel-user-details"
                >
                  <BankDetails />
                </CustomTabPanel>
              </Index.Box>
            </Index.Box>
            {/* <PageIndex.Formik
              enableReinitialize
              onSubmit={handleFormSubmit}
              initialValues={initialValues}
              validationSchema={PageIndex.validationSchemaPayment}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                setErrors,
              }) => (
                <Index.Stack
                  component="form"
                  spacing={2}
                  noValidate
                  autoComplete="off"
                  onSubmit={handleSubmit}
                >
                  {console.log(values, "name")}
                  <Index.Box className="">
                    <Index.Grid item xs={12} sm={12} md={12}>
                      <Index.Button>
                        <Index.Box className="input-design-div with-border">
                          <label
                            htmlFor="upload-photo"
                            className="upload-banner-details"
                          >
                            <input
                              style={{ display: "none" }}
                              id="upload-photo"
                              name="qrCode"
                              type="file"
                              accept="image/*"
                              className="upload-banner-input"
                              onChange={(e) => {
                                if (e.target.files.length !== 0) {
                                  let file = e.target.files[0];
                                  const allowedTypes = [
                                    "image/jpeg",
                                    "image/jpg",
                                    "image/png",
                                  ];

                                  if (allowedTypes.includes(file.type)) {
                                    setFieldValue("qrCode", e.target.files[0]);
                                    setQrCode(e.target.files[0]);
                                  } else {
                                    setErrors({
                                      ...errors,
                                      qrCode: "Allow only jpg,jpeg,png file",
                                    });
                                    // setFieldValue("qrCode", "");
                                    //setImageBanner("");
                                  }
                                } else {
                                  setQrCode("");
                                }
                              }}
                            />

                            <Index.Box className="upload-banner-content">
                              {qrCode ? (
                                <>
                                  <Index.Avatar
                                    // alt="Remy Sharp"
                                    className="add-game-img"
                                    // src={qrCode && URL.createObjectURL(qrCode)}
                                    src={
                                      // values?.qrCode
                                      //   ? process.env.REACT_APP_IMG +
                                      //     values?.qrCode
                                      //   : URL.createObjectURL(qrCode)
                                      URL.createObjectURL(qrCode)
                                    }
                                  />
                                </>
                              ) : (
                                <>
                                  <Index.Avatar
                                    // alt="Remy Sharp"
                                    className="add-game-img"
                                    src={
                                      paymentDetails?.[0]?.qrCode &&
                                      process.env.REACT_APP_IMG +
                                        paymentDetails?.[0]?.qrCode
                                    }
                                  />
                                </>
                              )}
                              {errors.qrCode && (
                                <Index.FormHelperText error>
                                  {errors.qrCode}
                                </Index.FormHelperText>
                              )}
                            </Index.Box>
                          </label>
                        </Index.Box>
                      </Index.Button>
                    </Index.Grid>
                    <Index.Grid item xs={12} sm={12} md={6}>
                      <Index.Typography
                        variant="label"
                        component="label"
                        className="input-label"
                      >
                        Upi Id<span className="red-star">*</span>
                      </Index.Typography>
                      <Index.Box className="input-design-div with-border">
                        <Index.TextField
                          hiddenLabel
                          id="filled-hidden-label-normal"
                          placeholder="Upi Id"
                          variant="filled"
                          className="admin-input-design input-placeholder"
                          autoComplete="off"
                          name="UpiID"
                          type="text"
                          onBlur={handleBlur}
                          value={values.UpiID}
                          onChange={handleChange}
                          // onChange={(e) => {
                          //   const value = e.target.value;
                          //   const regex = /^[A-Za-z][A-Za-z\s]*$/;

                          //   if (regex.test(value) || value === "") {
                          //     setFieldValue("bannerName", value.slice(0, 50))
                          //   }
                          // }}
                          InputProps={{
                            inputProps: {
                              maxLength: 50,
                            },
                          }}
                          helperText={touched.UpiID && errors.UpiID}
                          error={Boolean(errors.UpiID && touched.UpiID)}
                          onKeyDown={(e) => {
                            if (e.key === " " && e.target.value.trim() === "") {
                              e.preventDefault();
                            }
                          }}
                        />
                      </Index.Box>
                    </Index.Grid>
                    <Index.Box className="add-game-button">
                      <Index.Box className="common-button blue-button flex-start save-btn add-submit-btn">
                        <Index.Button variant="contained" type="submit">
                          {paymentDetails?._id ? "Update" : "Submit"}
                        </Index.Button>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                </Index.Stack>
              )}
            </PageIndex.Formik> */}
          </Index.Box>
        </Index.Box>
      )}
    </>
  );
};
export default PaymentAdd;
