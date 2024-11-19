import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import "../banner/AddBanner.css";

import PageIndex from "../../../pageIndex";
import { toast } from "react-toastify";
import DataService from "../../../../config/DataService";
import { Api } from "../../../../config/Api";
import { ErrorMessage, Form } from "formik";
import { useLocation } from "react-router-dom";

const AddCurrency = () => {
  const navigate = Index.useNavigate();
  const location = useLocation();
  const [disable, setDisable] = useState(false);
  const [imageBanner, setImageBanner] = useState("");
  // const [userCurrencyValue, setUserCurrencyValue] = useState();
  // const [userCoinValue, setUserCoinValue] = useState();
  const [loading, setLoading] = useState(false);

  const row = location?.state?.selectedData;

  // Initital values
  let initialValues = {
    coin: row?.coin ? row?.coin : "",
    currencyValue: row?.currencyName ? row?.currencyName : "",
  };

  const handleFormSubmit = async (values) => {
    setLoading(true);
    const data = {
      coin: values?.coin,
      currencyName: values?.currencyValue,
      currencyCoinId: row?._id ? row?._id : "",
    };
    DataService.post(Api.Add_edit_currency, data)
      .then((res) => {
        setLoading(false);
        toast.success(res.data.message);
        navigate("/admin/currency", {
          state: { id: res.data.data._id },
        });
      })
      .catch((e) => {
        toast.error(
          e.response.data.message ? e.response.data.message : e.message,
          {
            toastId: "customId",
          }
        );
        setLoading(false);
      });
  };

  // const userCurrency = async () => {
  //   await DataService.get(Api.User.USER_CURRENCY)
  //     .then((res) => {
  //       setUserCurrencyValue(res?.data?.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const userCoin = async () => {
  //   await DataService.get(Api.User.USER_COIN)
  //     .then((res) => {
  //       setUserCoinValue(res?.data?.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // useEffect(() => {
  //   userCurrency();
  //   userCoin();
  // }, []);

  return (
    <>
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
                  {row?._id ? "Edit Currency" : "Add Currency"}
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
            validationSchema={PageIndex.validationSchemaCurrency}
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
                    {/* <Index.Grid item xs={12} sm={6} md={5} lg={3}>
                      <Index.Typography
                        variant="label"
                        component="label"
                        className="input-label"
                      >
                        Currency*
                      </Index.Typography>

                      <Index.Box className=" signin-drop-details admin-dropdown-details">
                        <Index.FormControl className="formcontrol_login sign-in-inner-form">
                          <Index.Select
                            onChange={handleChange}
                            value={values.currencyValue}
                            name="currencyValue"
                            className="currency-select-drop"
                            displayEmpty
                            renderValue={
                              values?.currencyValue !== ""
                                ? undefined
                                : () => "Select your currency"
                            }
                          >
                            {userCurrencyValue?.map((ele) => {
                              return (
                                <Index.MenuItem
                                  key={ele?._id}
                                  value={ele?.currencyName}
                                  className="currency-select-menu"
                                >
                                  {ele?.currencyName}
                                </Index.MenuItem>
                              );
                            })}
                          </Index.Select>
                        </Index.FormControl>
                        {errors.currencyValue && touched.currencyValue && (
                          <Index.FormHelperText error>
                            {errors.currencyValue}
                          </Index.FormHelperText>
                        )}
                      </Index.Box>
                    </Index.Grid> */}
                    <Index.Grid item xs={12} sm={6} md={5} lg={6}>
                      <Index.Typography
                        variant="label"
                        component="label"
                        className="input-label"
                      >
                        Currency*
                      </Index.Typography>
                      <Index.Box className="input-design-div with-border">
                        <Index.TextField
                          hiddenLabel
                          id="filled-hidden-label-normal"
                          placeholder="Currency"
                          variant="filled"
                          className="admin-input-design input-placeholder"
                          autoComplete="off"
                          name="currencyValue"
                          type="text"
                          onBlur={handleBlur}
                          value={values.currencyValue}
                          onChange={handleChange}
                          helperText={
                            touched.currencyValue && errors.currencyValue
                          }
                          error={Boolean(
                            errors.currencyValue && touched.currencyValue
                          )}
                          sx={{ mb: 3 }}
                        />
                      </Index.Box>
                    </Index.Grid>

                    <Index.Grid item xs={12} sm={6} md={5} lg={3}>
                      <Index.Typography
                        variant="label"
                        component="label"
                        className="input-label"
                      >
                        Coin*
                      </Index.Typography>
                      <Index.Box className="input-design-div with-border">
                        <Index.TextField
                          hiddenLabel
                          id="filled-hidden-label-normal"
                          placeholder="Coin"
                          variant="filled"
                          className="admin-input-design input-placeholder"
                          autoComplete="off"
                          name="coin"
                          type="text"
                          onBlur={handleBlur}
                          value={values.coin}
                          onChange={(e) => {
                            // Use a regular expression to allow only numbers
                            const coinValue = e.target.value
                              .replace(/[^0-9]/g, "")
                              .slice(0, 5);
                            setFieldValue("coin", coinValue);
                          }}
                          helperText={touched.coin && errors.coin}
                          error={Boolean(errors.coin && touched.coin)}
                          sx={{ mb: 3 }}
                        />
                      </Index.Box>
                    </Index.Grid>
                  </Index.Grid>
                </Index.Box>
                <Index.Box className="add-game-button">
                  <Index.Box className="common-button blue-button flex-start save-btn add-submit-btn">
                    <Index.Button
                      variant="contained"
                      onClick={() => navigate("/admin/currency")}
                    >
                      <img
                        src={PageIndex.Png.back}
                        className="back-btn-spacing"
                      />
                      Back
                    </Index.Button>
                  </Index.Box>
                  <Index.Box className="common-button blue-button flex-start save-btn add-submit-btn">
                    <Index.Button
                      variant="contained"
                      type="submit"
                      disabled={loading}
                    >
                      {/* {row?._id ? "Update" : "Submit"} */}
                      {loading ? (
                        <Index.CircularProgress color="secondary" size={20} />
                      ) : row?._id ? (
                        "Update"
                      ) : (
                        "Submit"
                      )}
                    </Index.Button>
                  </Index.Box>
                </Index.Box>
              </Index.Stack>
            )}
          </PageIndex.Formik>
        </Index.Box>
      </Index.Box>
    </>
  );
};
export default AddCurrency;
