import React, { useEffect, useState } from "react";
import Index from "../../../../component/Index";
import "./setting.css";
import "../../../../assets/style/global.css";
import { Api } from "../../../../config/Api";
import DataService from "../../../../config/DataService";
import { toast } from "react-toastify";
import PageIndex from "../../../pageIndex";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../../../../component/comman/loader/Loader";

const Setting = () => {
  const permission = useSelector((state) => state.AdminReducer.adminRoleData);
  const [settingData, setSettingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();

  const [initialSettingData, setInitialSettingData] = useState({
    withdrawalAmount: "",
    minimumBalance: "",
    rewardsPoints: "",
    walletAddress: "",
    joiningBonus: "",
    bettingPenalty: "",
    currency: "",
    coin: "",
    currencyValue: "",
  });

  const handleFormSubmit = async (values, action) => {
    setBtnLoading(true);
    const urlencoded = new URLSearchParams();
    urlencoded.append("withdrawalAmount", values.withdrawalAmount);
    urlencoded.append("minimumBalance", values.minimumBalance);
    urlencoded.append("rewardsPoints", values.rewardsPoints);
    urlencoded.append("walletAddress", values.walletAddress);
    urlencoded.append("joiningBonus", values.joiningBonus);
    urlencoded.append("bettingPenalty", values.bettingPenalty);
    urlencoded.append("currency", values.currency);
    urlencoded.append("coin", values.coin);
    urlencoded.append("currencyValue", values.currencyValue);

    DataService.post(Api.ADMIN_SETTING_ADD, urlencoded)
      .then((res) => {
        action.resetForm();
        toast.success(res.data.message, {
          toastId: "customId",
        });
        getAllSettingData();
        setBtnLoading(false);
      })
      .catch((e) => {
        toast.error(
          e.response.data.message ? e.response.data.message : e.message,
          {
            toastId: "customId",
          }
        );
        setBtnLoading(false);
      });
  };

  const getAllSettingData = async () => {
    await DataService.get(Api.ADMIN_SETTING_GET)
      .then((res) => {
        setLoading(false);
        const data = res.data.data;
        setInitialSettingData({
          withdrawalAmount: data?.withdrawalAmount || "",
          minimumBalance: data?.minimumBalance || "",
          rewardsPoints: data?.rewardsPoints || "",
          walletAddress: data?.walletAddress || "",
          joiningBonus: data?.joiningBonus || "",
          bettingPenalty: data?.bettingPenalty || "",
          currency: data?.currency || "",
          coin: data?.coin || "",
          currencyValue: data?.currencyValue || "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllSettingData();
  }, []);

  if (
    permission?.isAdmin == true ||
    (permission?.role?.Setting?.View == true && permission?.isAdmin == false)
  ) {
    return (
      <>
        {loading ? (
          <Loader />
        ) : (
          <>
            {" "}
            <Index.Box className="page-content-box">
              <Index.Box className="barge-common-box">
                <Index.Box className="title-header">
                  <Index.Box className="title-header-flex res-title-header-flex mb-30-setting">
                    <Index.Box className="title-main">
                      <Index.Typography
                        variant="p"
                        component="p"
                        className="page-title "
                      >
                        Setting
                      </Index.Typography>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
                <Index.Box className="input-design-div admin-design-div login-input-design-div">
                  <PageIndex.Formik
                    enableReinitialize
                    onSubmit={handleFormSubmit}
                    initialValues={initialSettingData}
                    validationSchema={PageIndex.validationSchemaUserSetting}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                    }) => (
                      <>
                        <Index.Stack
                          component="form"
                          noValidate
                          autoComplete="off"
                          onSubmit={handleSubmit}
                        >
                          <Index.Box
                            className="game-setting-input-box"
                            spacing={2}
                          >
                            <Index.Grid
                              container
                              className="game-row-setting"
                              columnSpacing={{ xs: 1, sm: 1, md: 2 }}
                            >
                              <Index.Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                                className="game-cols-setting"
                              >
                                <Index.Box className="game-setting-form">
                                  <Index.FormHelperText
                                    variant="label"
                                    component="label"
                                    className="input-label"
                                  >
                                    Withdrawal Amount Limit
                                  </Index.FormHelperText>
                                  <Index.Box className="input-design-div with-border">
                                    <Index.TextField
                                      hiddenLabel
                                      id="filled-hidden-label-normal"
                                      placeholder="Withdrawal Amount Limit"
                                      variant="filled"
                                      className="admin-input-design input-placeholder"
                                      autoComplete="off"
                                      defaultValue={
                                        settingData?.withdrawalAmount
                                      }
                                      name="withdrawalAmount"
                                      type="number"
                                      onWheel={(event) => event.target.blur()}
                                      onBlur={handleBlur}
                                      onFocus={() => setLoading(false)}
                                      value={values.withdrawalAmount}
                                      onChange={handleChange}
                                      helperText={
                                        touched.withdrawalAmount &&
                                        errors.withdrawalAmount
                                      }
                                      error={Boolean(
                                        errors.withdrawalAmount &&
                                          touched.withdrawalAmount
                                      )}
                                      sx={{ mb: 3 }}
                                    />
                                  </Index.Box>
                                </Index.Box>
                              </Index.Grid>
                              <Index.Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                                className="game-cols-setting"
                              >
                                <Index.Box className="game-setting-form">
                                  <Index.FormHelperText
                                    variant="label"
                                    component="label"
                                    className="input-label"
                                  >
                                    Minimum Balance In Wallet
                                  </Index.FormHelperText>
                                  <Index.Box className="input-design-div with-border">
                                    <Index.TextField
                                      hiddenLabel
                                      id="filled-hidden-label-normal"
                                      placeholder="Minimum Balance in Wallet"
                                      variant="filled"
                                      className="admin-input-design input-placeholder"
                                      autoComplete="off"
                                      name="minimumBalance"
                                      defaultValue={settingData?.minimumBalance}
                                      type="number"
                                      onWheel={(event) => event.target.blur()}
                                      onBlur={handleBlur}
                                      onFocus={() => setLoading(false)}
                                      value={values.minimumBalance}
                                      onChange={handleChange}
                                      helperText={
                                        touched.minimumBalance &&
                                        errors.minimumBalance
                                      }
                                      error={Boolean(
                                        errors.minimumBalance &&
                                          touched.minimumBalance
                                      )}
                                      sx={{ mb: 3 }}
                                    />
                                  </Index.Box>
                                </Index.Box>
                              </Index.Grid>
                              <Index.Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                                className="game-cols-setting"
                              >
                                <Index.Box className="game-setting-form">
                                  <Index.FormHelperText
                                    variant="label"
                                    component="label"
                                    className="input-label"
                                  >
                                    Referral Rewards
                                  </Index.FormHelperText>
                                  <Index.Box className="input-design-div with-border">
                                    <Index.TextField
                                      hiddenLabel
                                      id="filled-hidden-label-normal"
                                      placeholder="Referral Rewards"
                                      variant="filled"
                                      className="admin-input-design input-placeholder"
                                      autoComplete="off"
                                      name="rewardsPoints"
                                      defaultValue={settingData?.rewardsPoints}
                                      type="number"
                                      onWheel={(event) => event.target.blur()}
                                      onBlur={handleBlur}
                                      onFocus={() => setLoading(false)}
                                      value={values.rewardsPoints}
                                      onChange={handleChange}
                                      helperText={
                                        touched.rewardsPoints &&
                                        errors.rewardsPoints
                                      }
                                      error={Boolean(
                                        errors.rewardsPoints &&
                                          touched.rewardsPoints
                                      )}
                                      sx={{ mb: 3 }}
                                    />
                                  </Index.Box>
                                </Index.Box>
                              </Index.Grid>
                              <Index.Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                                className="game-cols-setting"
                              >
                                <Index.Box className="game-setting-form">
                                  <Index.FormHelperText
                                    variant="label"
                                    component="label"
                                    className="input-label"
                                  >
                                    Wallet Address
                                  </Index.FormHelperText>
                                  <Index.Box className="input-design-div with-border">
                                    <Index.TextField
                                      hiddenLabel
                                      id="filled-hidden-label-normal"
                                      placeholder="Wallet Address"
                                      variant="filled"
                                      className="admin-input-design input-placeholder"
                                      autoComplete="off"
                                      name="walletAddress"
                                      defaultValue={settingData?.walletAddress}
                                      type="number"
                                      onWheel={(event) => event.target.blur()}
                                      onBlur={handleBlur}
                                      onFocus={() => setLoading(false)}
                                      value={values.walletAddress}
                                      onChange={handleChange}
                                      helperText={
                                        touched.walletAddress &&
                                        errors.walletAddress
                                      }
                                      error={Boolean(
                                        errors.walletAddress &&
                                          touched.walletAddress
                                      )}
                                      sx={{ mb: 3 }}
                                    />
                                  </Index.Box>
                                </Index.Box>
                              </Index.Grid>
                              <Index.Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                                className="game-cols-setting"
                              >
                                <Index.Box className="game-setting-form">
                                  <Index.FormHelperText
                                    variant="label"
                                    component="label"
                                    className="input-label"
                                  >
                                    Joining Bonus
                                  </Index.FormHelperText>
                                  <Index.Box className="input-design-div with-border">
                                    <Index.TextField
                                      hiddenLabel
                                      id="filled-hidden-label-normal"
                                      placeholder="Joining Bonus"
                                      variant="filled"
                                      className="admin-input-design input-placeholder"
                                      autoComplete="off"
                                      name="joiningBonus"
                                      defaultValue={settingData?.joiningBonus}
                                      type="number"
                                      onWheel={(event) => event.target.blur()}
                                      onBlur={handleBlur}
                                      onFocus={() => setLoading(false)}
                                      value={values.joiningBonus}
                                      onChange={handleChange}
                                      helperText={
                                        touched.joiningBonus &&
                                        errors.joiningBonus
                                      }
                                      error={Boolean(
                                        errors.joiningBonus &&
                                          touched.joiningBonus
                                      )}
                                      sx={{ mb: 3 }}
                                    />
                                  </Index.Box>
                                </Index.Box>
                              </Index.Grid>
                              <Index.Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                                className="game-cols-setting"
                              >
                                <Index.Box className="game-setting-form">
                                  <Index.FormHelperText
                                    variant="label"
                                    component="label"
                                    className="input-label"
                                  >
                                    Betting Penalty
                                  </Index.FormHelperText>
                                  <Index.Box className="input-design-div with-border">
                                    <Index.TextField
                                      hiddenLabel
                                      id="filled-hidden-label-normal"
                                      placeholder="Betting Penalty"
                                      variant="filled"
                                      className="admin-input-design input-placeholder"
                                      autoComplete="off"
                                      name="bettingPenalty"
                                      defaultValue={settingData?.bettingPenalty}
                                      type="number"
                                      onWheel={(event) => event.target.blur()}
                                      onBlur={handleBlur}
                                      onFocus={() => setLoading(false)}
                                      value={values.bettingPenalty}
                                      onChange={handleChange}
                                      helperText={
                                        touched.bettingPenalty &&
                                        errors.bettingPenalty
                                      }
                                      error={Boolean(
                                        errors.bettingPenalty &&
                                          touched.bettingPenalty
                                      )}
                                      sx={{ mb: 3 }}
                                    />
                                  </Index.Box>
                                </Index.Box>
                              </Index.Grid>
                              {/* <Index.Grid item xs={12} sm={6} md={4} lg={3} className="game-cols-setting">
                        <Index.Box className="game-setting-form">
                          <Index.FormHelperText variant="label"
                            component="label"
                            className="input-label">
                            Currency
                          </Index.FormHelperText>
                          <Index.Box className="input-design-div with-border">
                            <Index.TextField
                              hiddenLabel
                              id="filled-hidden-label-normal"
                              placeholder="Currency"
                              variant="filled"
                              className="admin-input-design input-placeholder"
                              autoComplete="off"
                              name="currency"
                              defaultValue={settingData?.currency}
                              type="number"
                              onBlur={handleBlur}
                              onFocus={() => setLoading(false)}
                              value={values.currency}
                              onChange={handleChange}
                              helperText={touched.currency && errors.currency}
                              error={Boolean(
                                errors.currency && touched.currency
                              )}
                              sx={{ mb: 3 }}
                            />
                          </Index.Box>
                        </Index.Box>
                      </Index.Grid> */}
                              {/* <Index.Grid item xs={12} sm={6} md={4} lg={3} className="game-cols-setting">
                        <Index.Box className="game-setting-form">
                          <Index.FormHelperText variant="label"
                            component="label"
                            className="input-label">
                            Coin
                          </Index.FormHelperText>
                          <Index.Box className="input-design-div with-border">
                            <Index.TextField
                              hiddenLabel
                              id="filled-hidden-label-normal"
                              placeholder="Coin"
                              variant="filled"
                              className="admin-input-design input-placeholder"
                              autoComplete="off"
                              name="coin"
                              defaultValue={settingData?.coin}
                              type="number"
                              onBlur={handleBlur}
                              onFocus={() => setLoading(false)}
                              value={values.coin}
                              onChange={handleChange}
                              helperText={touched.coin && errors.coin}
                              error={Boolean(
                                errors.coin && touched.coin
                              )}
                              sx={{ mb: 3 }}
                            />
                          </Index.Box>
                        </Index.Box>
                      </Index.Grid> */}
                              <Index.Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                                className="game-cols-setting"
                              >
                                <Index.Box className="game-setting-form">
                                  <Index.FormHelperText
                                    variant="label"
                                    component="label"
                                    className="input-label"
                                  >
                                    Currency Value
                                  </Index.FormHelperText>
                                  <Index.Box className="input-design-div with-border">
                                    <Index.TextField
                                      hiddenLabel
                                      id="filled-hidden-label-normal"
                                      placeholder="Currency Value"
                                      variant="filled"
                                      className="admin-input-design input-placeholder"
                                      autoComplete="off"
                                      name="currencyValue"
                                      defaultValue={settingData?.currencyValue}
                                      type="number"
                                      onWheel={(event) => event.target.blur()}
                                      onBlur={handleBlur}
                                      onFocus={() => setLoading(false)}
                                      value={values.currencyValue}
                                      onChange={handleChange}
                                      helperText={
                                        touched.currencyValue &&
                                        errors.currencyValue
                                      }
                                      error={Boolean(
                                        errors.currencyValue &&
                                          touched.currencyValue
                                      )}
                                      sx={{ mb: 3 }}
                                    />
                                  </Index.Box>
                                </Index.Box>
                              </Index.Grid>
                            </Index.Grid>
                          </Index.Box>
                          {permission?.isAdmin == true ||
                          (permission?.role?.Setting?.update == true &&
                            permission?.isAdmin == false) ? (
                            <Index.Box
                              className="common-button blue-button flex-start save-btn"
                              mt={3}
                            >
                              <Index.Button
                                variant="contained"
                                type="submit"
                                disabled={btnLoading}
                              >
                                {/* Submit */}
                                {btnLoading ? (
                                  <Index.CircularProgress
                                    color="secondary"
                                    size={20}
                                  />
                                ) : (
                                  "Submit"
                                )}
                              </Index.Button>
                            </Index.Box>
                          ) : (
                            ""
                          )}
                        </Index.Stack>
                      </>
                    )}
                  </PageIndex.Formik>
                </Index.Box>
              </Index.Box>
            </Index.Box>
          </>
        )}
      </>
    );
  } else {
    navigate("/admin");
  }
};

export default Setting;
