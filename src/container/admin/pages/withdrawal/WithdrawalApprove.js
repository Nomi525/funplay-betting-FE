import React, { useState } from "react";
import { toast } from "react-toastify";
import { useOutletContext } from "react-router-dom";
import PageIndex from "../../../pageIndex";
import DataService from "../../../../config/DataService";
import { Api } from "../../../../config/Api";
import Index from "../../../../component/Index";
import Loader from "../../../../component/comman/loader/Loader";

export default function WithdrawalApprove(props) {
  const { handleClose, approvedId, getWithdrawalRequest } = props;
  const { notifyUser, setNotifyUser, notifyUserId, setNotifyUserId } =
    useOutletContext();

  // state
  const [loading, setLoading] = useState(false);

  // initialValues
  let initialValues = {
    withdrawalApproveImg: "",
  };

  const handleFormSubmit = async (values) => {
    console.log(values, 60);
    const data = new FormData();
    data.append("id", approvedId);
    data.append("status", "Approved");
    data.append("withdrawalApproveImg", values?.withdrawalApproveImg);
    // DataService.post(Api.ADMIN_WITHDRAWAL_REQUEST_APPROVED_REJECTED, data)
    DataService.post(
      Api.ADMIN_WITHDRAWAL_REQUEST_APPROVED_REJECTED + `/${approvedId}`,
      data
    )
      .then((res) => {
        toast.success(res?.data?.message);
        setNotifyUser(!notifyUser);
        handleClose();
        getWithdrawalRequest();
      })
      .catch((e) => {
        toast.error(e.message ? e.message : e.message);
      });
  };
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
                    {/* {[]?._id ? "Edit Banner" : "Payment Method"} */}
                    {/* {[]?._id ? "Edit Manual Deposit" : "Manual Deposit"} */}
                    Attach Screen Shot
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
              validationSchema={PageIndex.validationSchemaWithdrwalApproveReq}
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
                  {console.log(values, "213")}
                  <Index.Box className="">
                    <Index.Grid item xs={12} sm={12} md={12}>
                      <Index.Box className="input-design-div with-border">
                        <Index.Box className="input-design-div with-border position-relative">
                          <Index.Typography
                            variant="label"
                            component="label"
                            className="input-label width"
                          >
                            Upload File<span className="red-star">*</span>
                          </Index.Typography>
                          <Index.Box className="input-design-div with-border">
                            <Index.TextField
                              fullWidth
                              type="file"
                              name="withdrawalApproveImg"
                              accept="image/*"
                              id="filled-hidden-label-normal"
                              variant="filled"
                              className="admin-input-design input-placeholder"
                              onChange={(event) => {
                                setFieldValue(
                                  "withdrawalApproveImg",
                                  event.target.files[0]
                                );
                              }}
                              helperText={
                                touched.withdrawalApproveImg
                                  ? errors.withdrawalApproveImg
                                  : undefined
                              }
                              error={Boolean(
                                errors.withdrawalApproveImg
                                  ? touched.withdrawalApproveImg
                                  : undefined
                              )}
                            />
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Index.Grid>

                    <Index.Box className="add-game-button">
                      <Index.Box className="common-button blue-button flex-start save-btn add-submit-btn">
                        <Index.Button variant="contained" type="submit">
                          Submit
                        </Index.Button>
                        <Index.Button
                          variant="contained"
                          onClick={handleClose}
                          sx={{ marginLeft: "5px" }}
                        >
                          Cancel
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
}
