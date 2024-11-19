import React, { useState } from "react";
import PageIndex from "../../../pageIndex";
import { toast } from "react-toastify";
import DataService from "../../../../config/DataService";
import Index from "../../../../component/Index";
import { Api } from "../../../../config/Api";
// import Loader from "../../../../../component/comman/loader/Loader";
import Loader from "../../../../component/comman/loader/Loader";
import { useOutletContext } from "react-router-dom";

export default function WithdrawalReject(props) {
  const { handleClose, rejectedId, getWithdrawalRequest } = props;

  // state
  const [loading, setLoading] = useState(false);
  const { notifyUser, setNotifyUser, notifyUserId, setNotifyUserId } =
    useOutletContext();

  // initialValues
  let initialValues = {
    // rejectScreenShort: "",
    rejectReason: "",
  };

  const handleFormSubmit = async (values) => {
    console.log(values, ":22");

    // const data = new FormData();
    // data.append("id", rejectedId);
    // data.append("status", "Rejected");
    // data.append("rejectScreenShort", values?.rejectScreenShort);
    // data.append("rejectReason", values?.rejectReason);
    values.status = "Rejected";
    DataService.post(
      Api.ADMIN_WITHDRAWAL_REQUEST_APPROVED_REJECTED + `/${rejectedId}`,
      values
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
                    {/* {[]?._id ? "Edit Manual Withdraw" : "Manual Withdraw"} */}
                    Reason of Rejection
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
              validationSchema={PageIndex.validationSchemaWithdrawalReqReject}
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
                  {console.log(errors, "values")}
                  <Index.Box className="">
                    {/* <Index.Grid item xs={12} sm={12} md={12}>
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
                              name="rejectScreenShort"
                              accept="image/*"
                              id="filled-hidden-label-normal"
                              variant="filled"
                              className="admin-input-design input-placeholder"
                              onChange={(event) => {
                                setFieldValue(
                                  "rejectScreenShort",
                                  event.target.files[0]
                                );
                              }}
                              helperText={
                                touched.rejectScreenShort
                                  ? errors.rejectScreenShort
                                  : undefined
                              }
                              error={Boolean(
                                errors.rejectScreenShort
                                  ? touched.rejectScreenShort
                                  : undefined
                              )}
                            />
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Index.Grid> */}
                    <Index.Grid item xs={12} sm={12} md={12}>
                      <Index.Typography
                        variant="label"
                        component="label"
                        className="input-label width"
                      >
                        Reject Reason
                        {/* <span className="red-star">*</span> */}
                      </Index.Typography>
                      <Index.Box className="input-design-div with-border banner-textarea main-content-textarea">
                        <Index.TextareaAutosize
                          type="text"
                          hiddenLabel
                          id="filled-hidden-label-normal"
                          placeholder="Enter reject reason"
                          variant="filled"
                          className="admin-input-design input-placeholder form-control custom-auth-user-control textarea-content-comman"
                          autoComplete="off"
                          name="rejectReason"
                          onBlur={handleBlur}
                          value={values.rejectReason}
                          onChange={(e) => {
                            if (e.target.value?.toString().length <= 200)
                              handleChange(e);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === " " && e.target.value.trim() === "") {
                              e.preventDefault();
                            }
                          }}
                          sx={{ mb: 3 }}
                        />
                        {touched.rejectReason && errors.rejectReason && (
                          <Index.FormHelperText error>
                            {errors.rejectReason}
                          </Index.FormHelperText>
                        )}
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
