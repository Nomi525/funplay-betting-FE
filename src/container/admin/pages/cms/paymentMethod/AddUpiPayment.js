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

const AddUpiPayment = () => {
  const navigate = Index.useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({});

  const [qrCode, setQrCode] = useState("");
  const row = location?.state?.selectedData;
  console.log(qrCode, 20);

  // Initital values
  let initialValues = {
    UPIId: row?.UPIId ? row?.UPIId : "",
    QRCode: row?.QRCode ? row?.QRCode : "",
    methodName: row?.methodName ? row?.methodName : "",
    logo: row?.logo ? row?.logo : "",
  };

  const handleFormSubmit = async (values) => {
    const formdata = new FormData();
    if (row?._id) {
      formdata.append("id", row?._id);
    }
    formdata.append("UPIId", values?.UPIId);
    formdata.append("QRCode", values?.QRCode);
    formdata.append("logo", values?.logo);
    formdata.append("methodName", values?.methodName);
    DataService.post(Api.ADD_UPI_PAYMENT, formdata)
      .then((res) => {
        console.log(res?.data?.status, 36);
        if (res?.data?.status === 200 || res?.data?.status === 201) {
          toast.success(res?.data?.message);
          //   getPaymentList();
          navigate(`/admin/payment-method`);
        }
      })
      .catch((e) => {
        toast.error(
          e.response?.data?.message ? e.response?.data?.message : e.message
        );
      });
  };

  // get payment details
  //   const getPaymentList = async () => {
  //     setLoading(true);
  //     await DataService.get(Api.ADMIN_GET_PAYMENT_DETAILS)
  //       .then((res) => {
  //         console.log(res?.data?.data, "res55");
  //         setPaymentDetails(res?.data?.data);
  //         setTimeout(() => {
  //           setLoading(false);
  //         }, 1000);
  //       })
  //       .catch((e) => {
  //         toast.error(
  //           e.res?.data?.message ? e.res?.data?.message : e.message
  //           // navigate("/admin/login")
  //         );
  //         setLoading(false);
  //       });
  //   };

  //   useEffect(() => {
  //     getPaymentList();
  //   }, []);
  console.log("79: ", row)
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
                    {row?._id ? "Edit UPI" : "Add UPI"}

                    {/* {params?.gameId? "Edit Game" : "Add Game"} */}
                    {/* {location?.state?.values ? "Add Game" : "Edit Game "}  */}
                  </Index.Typography>
                </Index.Box>
              </Index.Box>
            </Index.Box>
            <PageIndex.Formik
              enableReinitialize
              onSubmit={handleFormSubmit}
              initialValues={initialValues}
              //   validationSchema={PageIndex.validationSchemaPayment}
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
                              name="logo"
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
                                    setFieldValue("logo", e.target.files[0]);
                                    setQrCode(e.target.files[0]);
                                  } else {
                                    setErrors({
                                      ...errors,
                                      logo: "Allow only jpg,jpeg,png file",
                                    });
                                    // setFieldValue("qrCode", "");
                                    //setImageBanner("");
                                  }
                                } else {
                                  setQrCode("");
                                }
                              }}
                            />
                            <Index.Box className="upload-banner-content upi-logo-input">
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
                                    sx={{objectFit: "contain"}}
                                  />
                                </>
                              ) : (
                                <>
                                  <Index.Avatar
                                    // alt="Remy Sharp"
                                    className="add-game-img"
                                    src={
                                      row?.logo &&
                                      process.env.REACT_APP_IMG +
                                        row?.logo
                                    }
                                  />
                                </>
                              )}
                              {errors.logo && (
                                <Index.FormHelperText error>
                                  {errors.logo}
                                </Index.FormHelperText>
                              )}
                            </Index.Box>
                          </label>
                        </Index.Box>
                      </Index.Button>
                    </Index.Grid>
                    {/* payment name */}
                    <Index.Grid item xs={12} sm={12} md={6}>
                      <Index.Typography
                        variant="label"
                        component="label"
                        className="input-label"
                      >
                        Name<span className="red-star">*</span>
                      </Index.Typography>
                      <Index.Box className="input-design-div with-border">
                        <Index.TextField
                          hiddenLabel
                          id="filled-hidden-label-normal"
                          placeholder="Enter name"
                          variant="filled"
                          className="admin-input-design input-placeholder"
                          autoComplete="off"
                          name="methodName"
                          type="text"
                          onBlur={handleBlur}
                          value={values.methodName}
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
                          helperText={touched.methodName && errors.methodName}
                          error={Boolean(
                            errors.methodName && touched.methodName
                          )}
                          //   onKeyDown={(e) => {
                          //     if (e.key === " " && e.target.value.trim() === "") {
                          //       e.preventDefault();
                          //     }
                          //   }}
                        />
                      </Index.Box>
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
                          name="UPIId"
                          type="text"
                          onBlur={handleBlur}
                          value={values.UPIId}
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
                          helperText={touched.UPIId && errors.UPIId}
                          error={Boolean(errors.UPIId && touched.UPIId)}
                          onKeyDown={(e) => {
                            if (e.key === " " && e.target.value.trim() === "") {
                              e.preventDefault();
                            }
                          }}
                        />
                      </Index.Box>
                    </Index.Grid>
                    <Index.Grid item xs={12} sm={12} md={6}>
                      <Index.Typography
                        variant="label"
                        component="label"
                        className="input-label"
                      >
                        QR Code<span className="red-star">*</span>
                      </Index.Typography>
                      <Index.Box className="input-design-div with-border">
                        {/* <Index.Box className="icon-position-rel"> */}
                        <Index.TextField
                          className="form-control custom-auth-user-control deposit-file-input"
                          name="QRCode"
                          type="file"
                          onBlur={handleBlur}
                          onChange={(e) => {
                            if (e.target.files.length !== 0) {
                              let file = e.target.files[0];
                              // if (allowedTypes.includes(file.type)) {
                              setFieldValue("QRCode", file);
                              // } else {
                              //   setErrors({
                              //     ...errors,
                              //     QRCode: "Allow only jpg,jpeg,png QRCode",
                              //   });
                              // }
                            } else {
                              setFieldValue("QRCode", {});
                              setErrors({
                                ...errors,
                                QRCode: "QR code is required",
                              });
                            }
                          }}
                        />
                        {/* </Index.Box> */}
                        {errors.QRCode && touched.QRCode && (
                          <Index.FormHelperText error>
                            {errors.QRCode}
                          </Index.FormHelperText>
                        )}
                      </Index.Box>
                    </Index.Grid>
                    <Index.Box className="add-game-button">
                    <Index.Box className="common-button blue-button flex-start save-btn add-submit-btn">
                      <Index.Button
                        variant="contained"
                        onClick={() => navigate("/admin/payment-method")}
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
                          {row?._id ? "Update" : "Submit"}
                        </Index.Button>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                </Index.Stack>
              )}
            </PageIndex.Formik>
          </Index.Box>
        </Index.Box>
      )}
    </>
  );
};
export default AddUpiPayment;
