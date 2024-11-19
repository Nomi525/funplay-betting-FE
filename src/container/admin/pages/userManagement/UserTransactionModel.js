import React from "react";
import { toast } from "react-toastify";
import DataService from "../../../../config/DataService";
import { Api } from "../../../../config/Api";
import Index from "../../../Index";
import PageIndex from "../../../pageIndex";

export default function UserTransactionModel(props) {
  const {
    handleClose,
    userId,
    approveAmount,
    getSingleTransaction,
    getUserDetails,
  } = props;

  // initialValues
  let initialValues = {
    amount: "",
    type: "",
  };
  console.log(userId, 30);
  const handleFormSubmit = async (values) => {
    console.log(values, 60);
    const data = new URLSearchParams();
    data.append("id", userId);
    data.append("amount", values?.amount);
    data.append("type", values?.type);

    DataService.post(Api.ADMIN_USER_ADD_TRANSACTION, data)
      .then((res) => {
        console.log(res, 32);
        toast.success(res?.data?.message);
        handleClose();
        getSingleTransaction(props.userId);
        getUserDetails(userId);
      })
      .catch((e) => {
        toast.error(
          e?.response?.data?.message
            ? e?.response?.data?.message
            : e?.response?.data?.message
        );
      });
  };

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
                  Add Transaction
                </Index.Typography>
              </Index.Box>
            </Index.Box>
          </Index.Box>
          <PageIndex.Formik
            enableReinitialize
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={PageIndex.validationSchemaAdminUserTransaction}
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
                {console.log(values, "values44")}
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

                  <Index.Grid item xs={12} sm={12} md={12} lg={12}>
                    <Index.Typography
                      variant="label"
                      component="label"
                      className="input-label"
                    >
                      Type*
                    </Index.Typography>

                    <Index.Box className=" signin-drop-details admin-dropdown-details">
                      <Index.FormControl className="formcontrol_login sign-in-inner-form">
                        <Index.Select
                          className="currency-select-drop"
                          name="type"
                          id="type"
                          value={values.type}
                          onChange={handleChange}
                          error={errors.type && touched.type ? true : false}
                          onBlur={handleBlur}
                          displayEmpty
                          renderValue={
                            values?.type !== ""
                              ? undefined
                              : () => "Select type"
                          }
                          inputProps={{
                            "aria-label": "Without label",
                          }}
                        >
                          <Index.MenuItem
                            value="credit"
                            // className="menuitem"
                            className="currency-select-menu"
                          >
                            Credit
                          </Index.MenuItem>
                          <Index.MenuItem
                            value="debit"
                            // className="menuitem"
                            className="currency-select-menu"
                          >
                            Debit
                          </Index.MenuItem>
                        </Index.Select>
                      </Index.FormControl>
                      <Index.FormHelperText error>
                        {errors.type && touched.type ? errors.type : false}
                      </Index.FormHelperText>
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
