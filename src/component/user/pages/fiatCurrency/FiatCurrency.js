import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import Index from "../../../Index";
import PagesIndex from "../../../PageIndex";
import { manualPaymentMethodSchema } from "../../../../validation/Validation";
import { Api } from "../../../../config/Api";
import DataService, { REACT_APP_IMG } from "../../../../config/DataService";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import PageIndex from "../../../PageIndex";

const depositAmounts = [1000, 3000, 8000, 12000, 24000, 42000];

const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
// const rupeesSign = "₹";
const rupeesSign = "";
const FiatCurrency = ({ openDeposit, handleCloseDeposit }) => {
  const [step, setStep] = useState(0);
  const [transaction, setTransaction] = useState();
  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isCopied, setIsCopied] = useState({ Amount: false, UpiID: false });
  const [isCopiedAccount, setIsCopiedAccount] = useState({
    name: false,
    accNo: false,
    ifsc: false,
  });
  const userAmounts = useSelector((state) => state?.UserReducer?.userAmounts);
  const userDetail = useSelector((state) => state?.UserReducer?.userData);
  const totalCoins = useSelector((state) => state?.UserReducer?.totalCoins);

  const [paymentTo, setPaymentTo] = useState("");
  const [bankDetail, setBankDetails] = useState([]);
  const [paymentMode, setPaymentMode] = useState("");
  const [showFull, setShowFull] = useState({
    name: false,
    accNo: false,
    ifsc: false,
  });

  // const paymentMethods = [
  //   {
  //     name: "PhonePe",
  //     icon: PagesIndex.Png.phonepe,
  //     id: "paymentmethod1",
  //   },
  //   {
  //     name: "Paytm",
  //     icon: PagesIndex.Png.paytm,
  //     id: "paymentmethod2",
  //   },
  //   {
  //     name: "GPay",
  //     icon: PagesIndex.Png.googlepay,
  //     id: "paymentmethod3",
  //   },
  //   {
  //     name: "UPI Apps",
  //     icon: PagesIndex.Png.upiapps,
  //     id: "paymentmethod4",
  //   },
  //   {
  //     name: "IMPS",
  //     icon: PagesIndex.Png.imps,
  //     id: "paymentmethod5",
  //   },
  // ];

  let initialValues = {
    amount: "",
    UPIMethod: "",
    UTRId: "",
    mobileNumber: "",
    transactionScreenShort: "",
  };
  const handleManualTransation = async (values) => {
    // api call
    console.log({ values });
    let formdata = new FormData();
    formdata.append("amount", values.amount);
    formdata.append("UPIMethod", transaction.methodName || "IMPS");
    formdata.append("UTRId", values.UTRId);
    formdata.append("mobileNumber", values.mobileNumber);
    formdata.append("transactionScreenShort", values.transactionScreenShort);
    formdata.append("depositedTo", JSON.stringify(transaction))
    DataService.post(Api.User.ADD_FIAT_CURRENCY, formdata)
      .then((res) => {
        console.log(res, 34);
        if (res?.data?.status === 201) {
          toast.success(res?.data?.message);
          handleCloseDeposit();
        }
      })
      .catch((e) => {
        toast.error(
          e.response?.data?.message ? e.response?.data?.message : e.message
        );
      });
  };
  // const goToPreviousStep = (e) => {
  //   setStep((prev) => prev - 1);
  // };
  const getQrCodeDetails = async () => {
    setLoading(true);
    await DataService.get(Api.ADMIN_GET_PAYMENT_DETAILS)
      .then((res) => {
        setTransaction(res?.data?.data[0]);
        setTransactionId(generateRandomId(12));
        setStep(2);
        // setTimeout(() => {
        //   setLoading(false);
        // }, 1000);
      })
      .catch((e) => {
        toast.error(
          e.res?.data?.message ? e.res?.data?.message : e.message
          // navigate("/admin/login")
        );
      });
    setLoading(false);
  };
  function generateRandomId(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomId = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomId += characters.charAt(randomIndex);
    }

    return randomId;
  }
  function copyField(field, value) {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        // toast.success(`${field} Copied!`, {
        //   toastId: "customId",
        // });
        setIsCopiedAccount((prev) => ({ ...prev, [field]: true }));
        setTimeout(() => {
          setIsCopiedAccount((prev) => ({ ...prev, [field]: false }));
        }, 1000);
      })
      .catch((error) => {
        toast.error(`Failed to copy to clipboard!`, {
          toastId: "customId",
        });
      });
  }
  const getAllUpiPaymentList = async () => {
    setLoading(true);
    await DataService.get(Api.User.GET_UPI_PAYMENT_LIST)
      .then((res) => {
        // setTransaction(res?.data?.data[0]);
        setPaymentMethods(res?.data?.data);
        setTransactionId(generateRandomId(12));
        // setTimeout(() => {
        //   setLoading(false);
        // }, 1000);
      })
      .catch((e) => {
        toast.error(
          e.res?.data?.message ? e.res?.data?.message : e.message
          // navigate("/admin/login")
        );
      });
    setLoading(false);
  };

  const getBankDetails = async () => {
    setLoading(true);
    await DataService.get(Api.User.GET_DEPOSIT_BANK_DETAILS)
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

  useEffect(() => {
    if (paymentTo) {
      if (bankDetail.length && bankDetail[0]._id === paymentTo) {
        setTransaction(bankDetail[0]);
        setPaymentMode("Bank Account");
      } else {
        setTransaction(
          paymentMethods.find((method) => method._id === paymentTo)
        );
        setPaymentMode("UPI");
      }
    }
  }, [paymentTo]);
  const handleMouseUp = (field) => {
    setShowFull((prev) => ({ ...prev, [field]: false }));
  };
  const handleMouseDown = (field) => {
    setShowFull((prev) => ({ ...prev, [field]: true }));
  };
  const handleShowDetails = (field) => {
    setShowFull((prev) => ({ ...prev, [field]: !prev[field] }));
  };
  const renderPartialValue = (field, value) => {
    const lastFourChars = value.toString().slice(-4);
    const maskedValue = "*".repeat(value.toString().length - 4) + lastFourChars;
    return showFull[field] ? value : maskedValue;
  };
  console.log("202", showFull);
  return (
    <>
      <Formik
        // enableReinitialize
        initialValues={initialValues}
        validationSchema={manualPaymentMethodSchema}
        onSubmit={handleManualTransation}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          touched,
          errors,
          setFieldValue,
          setFieldTouched,
          setErrors,
        }) => (
          <>
            <Index.Box padding={2} color="#fff">
              {step == 1 && (
                <Index.Box display="flex" justifyContent="space-between">
                  <Index.Box>Recharge Amount</Index.Box>
                  <Index.Box>
                    {userDetail?.currency} {values.amount}
                  </Index.Box>
                </Index.Box>
              )}
              {step == 2 && (
                <Index.Box>
                  <Index.Box
                    display="flex"
                    fontSize={"12px"}
                    justifyContent="space-between"
                  >
                    {/* <Index.Box> */}
                    {paymentMode === "UPI" ? (
                      <Index.Box>
                        <Index.Box pb={1}>
                          Transaction Id: {transactionId}
                        </Index.Box>
                        <Index.Box pb={1}>
                          Payment mode: {transaction?.methodName}
                        </Index.Box>
                        <Index.Box pb={1}>VPA: {transaction?.UPIId}</Index.Box>
                      </Index.Box>
                    ) : (
                      <Index.Box width="100%">
                        <Index.Box
                          className="bankdetail-box"
                          onClick={(e) => {
                            handleShowDetails("name");
                          }}
                        >
                          <Index.Box>
                            {renderPartialValue(
                              "name",
                              transaction?.accountHolder
                            )}
                          </Index.Box>
                          <Index.Box
                            className="copy-box"
                            onClick={(e) => {
                              e.stopPropagation();
                              copyField("name", transaction?.accountHolder);
                            }}
                          >
                            {!isCopiedAccount.name ? (
                              <Index.Avatar
                                src={PageIndex.Svg.copyicon}
                                className="copy-avatar"
                                variant="rounded"
                              />
                            ) : (
                              <Index.Box className="copy-acc-text">Copied</Index.Box>
                            )}
                          </Index.Box>
                        </Index.Box>
                        <Index.Box
                          className="bankdetail-box"
                          onClick={(e) => {
                            handleShowDetails("accNo");
                          }}
                        >
                          <Index.Box>
                            {renderPartialValue(
                              "accNo",
                              transaction?.accountNumber
                            )}
                          </Index.Box>
                          <Index.Box
                            className="copy-box"
                            onClick={(e) => {
                              e.stopPropagation();
                              copyField("accNo", transaction?.accountNumber);
                            }}
                          >
                            {!isCopiedAccount.accNo ? (
                              <Index.Avatar
                                src={PageIndex.Svg.copyicon}
                                className="copy-avatar"
                                variant="rounded"
                              />
                            ) : (
                              <Index.Box className="copy-acc-text">Copied</Index.Box>
                            )}
                          </Index.Box>
                        </Index.Box>
                        <Index.Box
                          className="bankdetail-box"
                          onClick={(e) => {
                            handleShowDetails("ifsc");
                          }}
                        >
                          <Index.Box>
                            {renderPartialValue("ifsc", transaction?.IFSCCode)}
                          </Index.Box>
                          <Index.Box
                            className="copy-box"
                            onClick={(e) => {
                              e.stopPropagation();
                              copyField("ifsc", transaction?.IFSCCode);
                            }}
                          >
                            {!isCopiedAccount.ifsc ? (
                              <Index.Avatar
                                src={PageIndex.Svg.copyicon}
                                className="copy-avatar"
                                variant="rounded"
                              />
                            ) : (
                              <Index.Box className="copy-acc-text">Copied</Index.Box>
                            )}
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    )}
                    {/* </Index.Box> */}
                    {paymentMode === "UPI" && (
                      <Index.Box>
                        <Index.Box>
                          <Index.Avatar
                            variant="rounded"
                            sx={{
                              width: "70px",
                              height: "70px",
                              bgcolor: "white",
                            }}
                            src={
                              transaction?.QRCode &&
                              // REACT_APP_IMG + transaction?.qrCode
                              process.env.REACT_APP_IMG + transaction?.QRCode
                            }
                            alt="QR-code"
                          />
                        </Index.Box>
                      </Index.Box>
                    )}
                  </Index.Box>
                  {/* <Index.Box
                    display="flex"
                    gap={1}
                    justifyContent="end"
                    marginTop={2}
                  >
                    <Index.Box className="blue-btn-main">
                      <Index.Button
                        className="blue-btn-content"
                        type="button"
                        onClick={(e) => {
                          copyField("Amount", values.amount);
                        }}
                      >
                        {isCopied.Amount ? "Copied" : "Copy Amt"}
                      </Index.Button>
                    </Index.Box>
                    {paymentMode === "UPI" && (
                      <Index.Box className="blue-btn-main">
                        <Index.Button
                          className="blue-btn-content"
                          type="button"
                          onClick={(e) => {
                            copyField("UpiID", transaction.UPIId);
                          }}
                        >
                          {isCopied.UpiID ? "Copied" : "Copy UPI"}
                        </Index.Button>
                      </Index.Box>
                    )}
                  </Index.Box> */}
                </Index.Box>
              )}
            </Index.Box>
            <form onSubmit={handleSubmit}>
              {step == 0 ? (
                <Index.Box className="deposit-main-content">
                  <Index.Box className="deposit-flex-content">
                    <Index.Box className="deposit-content-qr-content">
                      <Index.Box className="box-deposit-details-content">
                        <Index.Box textAlign="center" color="white">
                          <Index.Box>Balance</Index.Box>
                          <Index.Box>
                            {userDetail?.currency}{" "}
                            {totalCoins?.coinDollarValue
                              ? Number(totalCoins?.coinDollarValue)?.toFixed(2)
                              : "0"}
                          </Index.Box>
                        </Index.Box>
                        <Index.Box className="form-group-main deposit-form-content mb-15px-form">
                          <Index.FormHelperText className="title-label-comman-user">
                            Amount
                          </Index.FormHelperText>
                          <Index.Box className="form-control-details-auth">
                            <Index.Box className="icon-position-rel">
                              <Index.TextField
                                className="form-control custom-auth-user-control "
                                name="amount"
                                placeholder="Enter amount"
                                onBlur={handleBlur}
                                value={values.amount}
                                onChange={(e) => {
                                  if (!isNaN(e.target.value)) handleChange(e);
                                }}
                              />
                            </Index.Box>
                            {errors.amount && touched.amount && (
                              <Index.FormHelperText error>
                                {errors.amount}
                              </Index.FormHelperText>
                            )}
                          </Index.Box>
                          <Index.Box sx={{ flexGrow: 1 }} marginTop={2}>
                            <Index.Grid
                              container
                              spacing={{ xs: 1 }}
                              columns={{ xs: 12 }}
                            >
                              {depositAmounts.map((amt, index) => (
                                <Index.Grid item xs={4} key={`dempost-${amt}`}>
                                  <Index.Button
                                    variant="contained"
                                    fullWidth
                                    onClick={(e) => {
                                      setFieldValue("amount", amt);
                                    }}
                                  >
                                    {rupeesSign}
                                    {amt}
                                  </Index.Button>
                                </Index.Grid>
                              ))}
                            </Index.Grid>
                          </Index.Box>
                        </Index.Box>
                        <Index.Box className="form-btn-verify-details">
                          <Index.Box className="betting-card-btn-comman">
                            <Index.Box className="blue-btn-main">
                              <Index.Button
                                className="blue-btn-content"
                                type="button"
                                onClick={async () => {
                                  if (
                                    Object.keys(errors).length &&
                                    !errors.amount
                                  ) {
                                    await getAllUpiPaymentList();
                                    await getBankDetails();
                                    setStep(1);
                                  } else {
                                    setFieldTouched("amount", true);
                                  }
                                }}
                              >
                                Deposit
                              </Index.Button>
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              ) : step == 1 ? (
                <Index.Box className="deposit-main-content">
                  <Index.Box className="deposit-flex-content">
                    <Index.Box className="deposit-content-qr-content">
                      <Index.Box className="box-deposit-details-content">
                        <Index.Box className="form-group-main deposit-form-content mb-15px-form">
                          <Index.FormHelperText className="title-label-comman-user">
                            Select Payment Method
                          </Index.FormHelperText>
                          <Index.Box className="payment-method-container">
                            <Index.FormControl fullWidth className="nirmal">
                              <Index.RadioGroup
                                // row
                                aria-label="UPIMethod"
                                className="nirmal"
                                name="UPIMethod"
                                value={values.UPIMethod}
                                onChange={(e) => {
                                  setPaymentTo(e.target.value);
                                  handleChange(e);
                                }}
                                onBlur={handleBlur}
                              >
                                {paymentMethods.map((method) => (
                                  <Index.FormControlLabel
                                    className="payemnt-method-label"
                                    sx={{
                                      color: "white",
                                      justifyContent: "space-between",
                                    }}
                                    key={method._id}
                                    // value={method.toLowerCase()}
                                    value={method._id}
                                    control={<Index.Radio />}
                                    // label={method.name}
                                    label={
                                      <Index.Box className="payment-label">
                                        <Index.Avatar
                                          src={
                                            process.env.REACT_APP_IMG +
                                            method.logo
                                          }
                                          alt={method.methodName}
                                          className="payment-method-avatar"
                                        />
                                        <Index.Typography className="payment-title">
                                          {method.methodName}
                                        </Index.Typography>
                                      </Index.Box>
                                    }
                                    labelPlacement="start"
                                  />
                                ))}
                                {console.log({ bankDetail })}
                                {bankDetail?.length ? (
                                  <Index.FormControlLabel
                                    className="payemnt-method-label"
                                    sx={{
                                      color: "white",
                                      justifyContent: "space-between",
                                    }}
                                    key={bankDetail[0]._id}
                                    // value={method.toLowerCase()}
                                    value={bankDetail[0]._id}
                                    control={<Index.Radio />}
                                    // label={method.name}
                                    label={
                                      <Index.Box className="payment-label">
                                        <Index.Avatar
                                          src={PagesIndex.Png.imps}
                                          alt={"IMPS"}
                                          className="payment-method-avatar"
                                        />
                                        <Index.Typography className="payment-title">
                                          {"IMPS"}
                                        </Index.Typography>
                                      </Index.Box>
                                    }
                                    labelPlacement="start"
                                  />
                                ) : (
                                  ""
                                )}
                              </Index.RadioGroup>
                            </Index.FormControl>
                          </Index.Box>
                          {errors.UPIMethod && touched.UPIMethod && (
                            <Index.FormHelperText error>
                              {errors.UPIMethod}
                            </Index.FormHelperText>
                          )}
                        </Index.Box>
                        <Index.Box className="form-btn-verify-details">
                          <Index.Box className="betting-card-btn-comman">
                            <Index.Box className="blue-btn-main">
                              <Index.Button
                                className="blue-btn-content"
                                type="button"
                                onClick={async () => {
                                  if (
                                    Object.keys(errors).length &&
                                    !errors.UPIMethod
                                  ) {
                                    setStep(2);
                                  } else {
                                    setFieldTouched("UPIMethod", true);
                                  }
                                }}
                                disabled={loading}
                              >
                                Add Payment Method
                              </Index.Button>
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              ) : step == 2 ? (
                <Index.Box className="deposit-main-content">
                  <Index.Box className="deposit-flex-content">
                    <Index.Box className="deposit-content-qr-content">
                      <Index.Box className="box-deposit-details-content">
                        <Index.Box className="">
                          <Index.Box className="form-group-main deposit-form-content mb-15px-form">
                            <Index.FormHelperText className="title-label-comman-user">
                              Payment Reference Number
                            </Index.FormHelperText>
                            <Index.Box className="form-control-details-auth">
                              <Index.Box className="icon-position-rel">
                                <Index.TextField
                                  className="form-control custom-auth-user-control "
                                  name="UTRId"
                                  placeholder="Enter Payment Reference Number"
                                  value={values.UTRId}
                                  // onChange={(e) => {
                                  //   if (
                                  //     !isNaN(e.target.value) &&
                                  //     e.target.value?.toString().length <= 12
                                  //   )
                                  //     handleChange(e);
                                  // }}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </Index.Box>
                              {errors.UTRId && touched.UTRId && (
                                <Index.FormHelperText error>
                                  {errors.UTRId}
                                </Index.FormHelperText>
                              )}
                            </Index.Box>
                            <Index.FormHelperText className="smallText">
                              *copy reference number from your transaction and
                              paste here
                            </Index.FormHelperText>
                          </Index.Box>
                          <Index.Box className="form-group-main deposit-form-content mb-15px-form">
                            <Index.FormHelperText className="title-label-comman-user">
                              Deposit Amount
                            </Index.FormHelperText>
                            <Index.Box className="form-control-details-auth">
                              <Index.Box className="icon-position-rel">
                                <Index.TextField
                                  className="form-control custom-auth-user-control "
                                  name="depositAmount"
                                  placeholder="Enter Amount"
                                  value={values.amount}
                                  disabled
                                />
                              </Index.Box>
                              {/* {errors.value && touched.value && (
                            <Index.FormHelperText error>
                              {errors.value}
                            </Index.FormHelperText>
                          )} */}
                            </Index.Box>
                          </Index.Box>
                          <Index.Box className="form-group-main deposit-form-content mb-15px-form">
                            <Index.FormHelperText className="title-label-comman-user">
                              Registered Phone Number
                            </Index.FormHelperText>
                            <Index.Box className="form-control-details-auth">
                              <Index.Box className="icon-position-rel">
                                <Index.TextField
                                  className="form-control custom-auth-user-control "
                                  name="mobileNumber"
                                  placeholder="Enter Registered Phone Number"
                                  value={values.mobileNumber}
                                  onChange={(e) => {
                                    if (
                                      !isNaN(e.target.value) &&
                                      e.target.value?.toString().length <= 10
                                    )
                                      handleChange(e);
                                  }}
                                  onBlur={handleBlur}
                                />
                              </Index.Box>
                              {errors.mobileNumber && touched.mobileNumber && (
                                <Index.FormHelperText error>
                                  {errors.mobileNumber}
                                </Index.FormHelperText>
                              )}
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>
                        <Index.Box className="form-group-main deposit-form-content mb-15px-form">
                          {/* <Index.FormHelperText className="title-label-comman-user">
                        Registered Phone Number / use ID
                      </Index.FormHelperText> */}
                          <Index.Box className="form-control-details-auth">
                            <Index.FormHelperText className="title-label-comman-user">
                              If you have paid, please upload a screenshot
                            </Index.FormHelperText>
                            <Index.Box className="icon-position-rel">
                              <Index.TextField
                                className="form-control custom-auth-user-control deposit-file-input"
                                name="transactionScreenShort"
                                type="file"
                                onBlur={handleBlur}
                                onChange={(e) => {
                                  if (e.target.files.length !== 0) {
                                    let file = e.target.files[0];
                                    // if (allowedTypes.includes(file.type)) {
                                    setFieldValue(
                                      "transactionScreenShort",
                                      file
                                    );
                                    // } else {
                                    //   setErrors({
                                    //     ...errors,
                                    //     transactionScreenShort: "Allow only jpg,jpeg,png transactionScreenShort",
                                    //   });
                                    // }
                                  } else {
                                    setFieldValue("transactionScreenShort", {});
                                    setErrors({
                                      ...errors,
                                      transactionScreenShort:
                                        "Screenshot is required",
                                    });
                                  }
                                }}
                              />
                            </Index.Box>
                            {errors.transactionScreenShort &&
                              touched.transactionScreenShort && (
                                <Index.FormHelperText error>
                                  {errors.transactionScreenShort}
                                </Index.FormHelperText>
                              )}
                          </Index.Box>
                        </Index.Box>
                        <Index.Box className="form-btn-verify-details">
                          <Index.Box className="betting-card-btn-comman">
                            <Index.Box className="blue-btn-main">
                              <Index.Button
                                className="blue-btn-content"
                                type="submit"
                              >
                                Submit
                              </Index.Button>
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              ) : (
                ""
              )}
            </form>
          </>
        )}
      </Formik>
    </>
  );
};

export default FiatCurrency;
