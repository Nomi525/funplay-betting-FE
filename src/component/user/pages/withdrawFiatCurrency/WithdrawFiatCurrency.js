import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import Index from "../../../Index";
import PagesIndex from "../../../PageIndex";
import { withdrawFiatCurrencySchema } from "../../../../validation/Validation";
import { Api } from "../../../../config/Api";
import DataService, { REACT_APP_IMG } from "../../../../config/DataService";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { getTotalCoins } from "../../../../redux/user/userReducer";
import { useNavigate } from "react-router-dom";

const WithdrawFiatCurrency = ({ openWithdraw, handleCloseWithdraw }) => {
  const [step, setStep] = useState(0);
  const [transaction, setTransaction] = useState();
  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCopied, setIsCopied] = useState({ Amount: false, UpiID: false });
  const userAmounts = useSelector((state) => state?.UserReducer?.userAmounts);
  const userDetail = useSelector((state) => state?.UserReducer?.userData);
  const totalCoins = useSelector((state) => state?.UserReducer?.totalCoins);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [withdrawalAmountError, setWithdrawalAmountError] = useState("");
  console.log({ totalCoins });
  let initialValues = {
    withdrawalAmount: "",
    bankAccountId: "",
    paymentMethod: "",
    upiId: "",
  };
  const handleManualTransation = async (values) => {
    // api call
    console.log({values: values.bankAccount})
    let selectedBankAccount = userDetail?.bankDetails?.find(
      (bankDetails) => values.bankAccountId === bankDetails._id
    );
    if (withdrawalAmountError) {
      return;
    }
    values.type = "Fiat Currency";
    values.currency = userDetail.currency;
    values.bankAccount = selectedBankAccount;
    // let formdata = new FormData();
    // formdata.append("amount", values.amount);
    // formdata.append("UPIMethod", values.UPIMethod);
    // formdata.append("UTRId", values.UTRId);
    // formdata.append("mobileNumber", values.mobileNumber);
    // formdata.append("transactionScreenShort", values.transactionScreenShort);
    DataService.post(Api.User.MANUAL_WITHDRAWL_REQUEST, values)
      .then((res) => {
        if (res?.data?.status === 201) {
          toast.success(res?.data?.message);
          dispatch(getTotalCoins());
          handleCloseWithdraw();
          navigate("/user");
        }
      })
      .catch((e) => {
        toast.error(
          e.response?.data?.message ? e.response?.data?.message : e.message
        );
      });
  };
  function copyField(field, value) {
    console.log({ field, value });
    navigator.clipboard
      .writeText(value)
      .then(() => {
        // toast.success(`${field} Copied!`, {
        //   toastId: "customId",
        // });
        setIsCopied((prev) => ({ ...prev, [field]: true }));
        setTimeout(() => {
          setIsCopied((prev) => ({ ...prev, [field]: false }));
        }, 1000);
      })
      .catch((error) => {
        toast.error(`Failed to copy to clipboard!`, {
          toastId: "customId",
        });
      });
  }

  function getNumTillTwoDecimals(num) {
    let [n, decimalPart] = num?.toString().split(".");
    let res = n + "." + decimalPart.substring(0, 2);
    return Number(res);
  }
  return (
    <>
      <Index.Box>
        <Index.Box
          textAlign="center"
          color="white"
          pt={2}
          className="mb-30px-form"
        >
          <Index.Box>Balance</Index.Box>
          <Index.Box>
            {userDetail?.currency}{" "}
            {totalCoins?.coinDollarValue
              ? // ? Number(totalCoins?.coinDollarValue)?.toFixed(2)
                totalCoins?.coinDollarValue % 1 == 0
                ? totalCoins?.coinDollarValue
                : getNumTillTwoDecimals(totalCoins?.coinDollarValue)
              : "0"}
          </Index.Box>
        </Index.Box>
        <Formik
          // enableReinitialize
          initialValues={initialValues}
          validationSchema={withdrawFiatCurrencySchema}
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
            setFieldError,
          }) => (
            <>
              <form onSubmit={handleSubmit}>
                <Index.Box className="deposit-main-content">
                  <Index.Box className="deposit-flex-content">
                    <Index.Box className="deposit-content-qr-content">
                      <Index.Box className="box-deposit-details-content">
                        <Index.Box className="">
                          <Index.Box className="form-group-main deposit-form-content mb-15px-form">
                            <Index.FormHelperText className="title-label-comman-user">
                              Withdraw Amount ({userDetail.currency})
                            </Index.FormHelperText>
                            <Index.Box className="form-control-details-auth">
                              <Index.Box className="icon-position-rel">
                                <Index.TextField
                                  className="form-control custom-auth-user-control "
                                  name="withdrawalAmount"
                                  placeholder="Enter withdrawal amount"
                                  value={values.withdrawalAmount}
                                  onChange={(e) => {
                                    if (!isNaN(e.target.value)) {
                                      handleChange(e);
                                      if (
                                        totalCoins == undefined ||
                                        totalCoins == "" ||
                                        Number(e.target.value) >
                                          Number(totalCoins?.coinDollarValue)
                                      ) {
                                        setWithdrawalAmountError(
                                          "Insufficiant balance"
                                        );
                                      } else {
                                        setWithdrawalAmountError("");
                                      }
                                    }
                                  }}
                                  onBlur={handleBlur}
                                  // InputProps={{
                                  //   startAdornment: (
                                  //     <Index.InputAdornment position="start">
                                  //       {userDetail.currency}
                                  //     </Index.InputAdornment>
                                  //   ),
                                  // }}
                                />
                              </Index.Box>
                              {console.log({ errors })}
                              {((errors.withdrawalAmount &&
                                touched.withdrawalAmount) ||
                                withdrawalAmountError) && (
                                <Index.FormHelperText error>
                                  {errors.withdrawalAmount ||
                                    withdrawalAmountError}
                                </Index.FormHelperText>
                              )}
                            </Index.Box>
                          </Index.Box>

                          <Index.Box className="form-group-main deposit-form-content mb-15px-form">
                            <Index.FormHelperText className="title-label-comman-user">
                              Select Payment Method
                            </Index.FormHelperText>
                            <Index.Box className="form-control-details-auth">
                              <Index.FormControl>
                                <Index.RadioGroup
                                  row
                                  aria-labelledby="demo-row-radio-buttons-group-label"
                                  name="paymentMethod"
                                  className="payment-method"
                                  onChange={(e) => {
                                    setFieldValue("bankAccountId", "");
                                    setFieldValue("upiId", "");
                                    handleChange(e);
                                  }}
                                  onBlur={handleBlur}
                                >
                                  <Index.FormControlLabel
                                    value="Bank Account"
                                    control={<Index.Radio />}
                                    label="Bank Account"
                                  />
                                  <Index.FormControlLabel
                                    value="UPI"
                                    control={<Index.Radio />}
                                    label="UPI"
                                  />
                                </Index.RadioGroup>
                              </Index.FormControl>
                            </Index.Box>
                            {errors.paymentMethod && touched.paymentMethod && (
                              <Index.FormHelperText error>
                                {errors.paymentMethod}
                              </Index.FormHelperText>
                            )}
                          </Index.Box>

                          {/* select bank account */}
                          {values.paymentMethod === "Bank Account" && (
                            <Index.Box className="form-group-main deposit-form-content mb-15px-form">
                              <Index.FormHelperText className="title-label-comman-user">
                                Select bank account
                              </Index.FormHelperText>
                              {/* <Index.Box className="form-control-details-auth">
                            <Index.Box className="icon-position-rel">
                              <Index.TextField
                                className="form-control custom-auth-user-control "
                                name="bankDetails"
                                // placeholder="Enter Registered Phone Number"
                                value={values.bankDetails}
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
                            {errors.bankDetails && touched.bankDetails && (
                              <Index.FormHelperText error>
                                {errors.bankDetails}
                              </Index.FormHelperText>
                            )}
                          </Index.Box> */}
                              <Index.Box
                                className={`form-control-details-auth mb-15px-form`}
                                // ${
                                //   !errors.currencyValue || !touched.currencyValue
                                //     ? "mb-30px-form"
                                //     : "mb-12px-form"
                                // }
                              >
                                <Index.Box className=" signin-drop-details">
                                  <Index.FormControl className="formcontrol_login sign-in-inner-form">
                                    <Index.Select
                                      onChange={handleChange}
                                      value={values.bankAccountId}
                                      name="bankAccountId"
                                      className="currency-select-drop"
                                      displayEmpty
                                      renderValue={
                                        values?.bankAccountId !== ""
                                          ? undefined
                                          : () => "Select bank account"
                                      }
                                      onBlur={handleBlur}
                                    >
                                      {userDetail?.bankDetails?.map((ele) => {
                                        return (
                                          <Index.MenuItem
                                            key={ele?._id}
                                            value={ele?._id}
                                            className="currency-select-menu"
                                          >
                                            {ele?.bankName}
                                          </Index.MenuItem>
                                        );
                                      })}
                                    </Index.Select>
                                  </Index.FormControl>
                                  {errors.bankAccount &&
                                    touched.bankAccount && (
                                      <Index.FormHelperText error>
                                        {errors.bankAccount}
                                      </Index.FormHelperText>
                                    )}
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                          )}
                          {values.paymentMethod === "UPI" && (
                            <Index.Box className="form-group-main deposit-form-content mb-15px-form">
                              <Index.FormHelperText className="title-label-comman-user">
                                Enter Upi ID
                              </Index.FormHelperText>
                              <Index.Box className="form-control-details-auth">
                                <Index.Box className="icon-position-rel">
                                  <Index.TextField
                                    className="form-control custom-auth-user-control "
                                    name="upiId"
                                    placeholder="Enter Upi ID"
                                    value={values.upiId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                </Index.Box>
                                {errors.upiId && touched.upiId && (
                                  <Index.FormHelperText error>
                                    {errors.upiId}
                                  </Index.FormHelperText>
                                )}
                              </Index.Box>
                            </Index.Box>
                          )}
                          {/* <Index.Box className="form-group-main deposit-form-content mb-15px-form">
                          <Index.FormHelperText className="title-label-comman-user">
                            Select bank account
                          </Index.FormHelperText>
                          <Index.Box className="form-control-details-auth">
                            <Index.Box className="icon-position-rel">
                              <Index.TextField
                                className="form-control custom-auth-user-control "
                                name="bankAccount"
                                // placeholder="Enter Payment Reference Number"
                                value={values.bankAccount}
                                onChange={(e) => {
                                  if (
                                    !isNaN(e.target.value) &&
                                    e.target.value?.toString().length <= 12
                                  )
                                    handleChange(e);
                                }}
                                onBlur={handleBlur}
                              />
                            </Index.Box>
                            {errors.bankAccount && touched.bankAccount && (
                              <Index.FormHelperText error>
                                {errors.bankAccount}
                              </Index.FormHelperText>
                            )}
                          </Index.Box>
                        </Index.Box> */}
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
              </form>
            </>
          )}
        </Formik>
      </Index.Box>
    </>
  );
};

export default WithdrawFiatCurrency;
