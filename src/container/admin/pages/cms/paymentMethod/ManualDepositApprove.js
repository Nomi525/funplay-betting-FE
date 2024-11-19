import React from "react";
import PagesIndex from "../../../../../../src/container/pageIndex";
import { toast } from "react-toastify";
import DataService from "../../../../../config/DataService";
import { useOutletContext } from "react-router-dom";

import Index from "../../../../Index";
import { Api } from "../../../../../config/Api";
import PageIndex from "../../../../../../src/container/pageIndex";

export default function ManualDepositApprove(props) {
  const { handleClose, approvedId, approveAmount, getDepositRequest } = props;
  const { notifyUser, setNotifyUser, notifyUserId, setNotifyUserId } =
    useOutletContext();
  // const handleApproved = (approvedId) => {
  //   const urlencoded = new URLSearchParams();
  //   urlencoded.append("id", approvedId);
  //   urlencoded.append("status", "Approved");
  //   DataService.post(Api.ADMIN_DEPOSIT_REQUEST_APPROVED_REJECTED, urlencoded)
  //     .then((res) => {
  //       toast.success(res.data.message);
  //       setNotifyUser(!notifyUser);
  //       handleClose();
  //       getDepositRequest();
  //     })
  //     .catch((e) => {
  //       toast.error(e.message ? e.message : e.message);
  //     });
  // };
  // initialValues
  let initialValues = {
    amount: approveAmount ? approveAmount : "",
  };

  const handleFormSubmit = async (values) => {
    console.log(values, 60);
    const data = new FormData();
    data.append("id", approvedId);
    data.append("status", "Approved");
    data.append("amount", values?.amount);
    DataService.post(Api.ADMIN_DEPOSIT_REQUEST_APPROVED_REJECTED, data)
      .then((res) => {
        toast.success(res?.data?.message);
        setNotifyUser(!notifyUser);
        handleClose();
        getDepositRequest();
      })
      .catch((e) => {
        toast.error(e.message ? e.message : e.message);
      });
  };
  // return (
  //   <>
  //     <Index.Box>
  //       <Index.Box className="delete-game-data-main">
  //         <Index.Box>
  //           <h3 className="deleteModel-heading">
  //             You want to approve this deposit request?
  //           </h3>
  //         </Index.Box>

  //         <Index.Box className="deleteModel-btna1">
  //           <Index.Box className="btn-col">
  //             <PagesIndex.BlueOutlineButton
  //               variant="contained"
  //               onClick={handleClose}
  //               color="error"
  //               btnLabel="No"
  //               className="outline-blue-btn-content"
  //             />
  //           </Index.Box>
  //           <Index.Box className="btn-col">
  //             <PagesIndex.BlueButton
  //               variant="contained"
  //               btnLabel="Yes"
  //               className="blue-btn-content"
  //               onClick={() => handleApproved(approvedId)}
  //             />
  //           </Index.Box>
  //         </Index.Box>
  //       </Index.Box>
  //     </Index.Box>
  //   </>
  // );

  return (
    <>
      {/* {loading ? (
        <Loader />
      ) : ( */}
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
                  Edit Amount
                </Index.Typography>
              </Index.Box>
            </Index.Box>
          </Index.Box>
          <PageIndex.Formik
            enableReinitialize
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={PageIndex.validationSchemaDepositReqApproved}
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
                {console.log(values, "values")}
                <Index.Box className="">
                  <Index.Grid item xs={12} sm={12} md={12}>
                    <Index.Typography
                      variant="label"
                      component="label"
                      className="input-label"
                    >
                      Amount<span className="red-star">*</span>
                    </Index.Typography>
                    <Index.Box className="input-design-div with-border">
                      <Index.TextField
                        hiddenLabel
                        id="filled-hidden-label-normal"
                        placeholder="Amount"
                        variant="filled"
                        className="admin-input-design input-placeholder"
                        autoComplete="off"
                        name="amount"
                        type="number"
                        onBlur={handleBlur}
                        value={values.amount}
                        onChange={handleChange}
                        helperText={touched.amount && errors.amount}
                        error={Boolean(errors.amount && touched.amount)}
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
      {/* )} */}
    </>
  );
}
