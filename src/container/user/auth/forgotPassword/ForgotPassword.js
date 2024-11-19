import React from "react";
import Index from "../../../Index";
import PageIndex from "../../../pageIndex";
import DataService from "../../../../config/DataService";
import { Api } from "../../../../config/Api";
import { toast } from "react-toastify";
import { userLoginValidationSchema } from "../../../../validation/Validation";

const ForgotPassword = ({
  email,
  handleCloseForgotPassword,
  handleOpenOtp,
  setUserId,
  setforgot,
  setEmail,
}) => {
  let initialValues = {
    email: email.email || "",
  };

  /*user forgotpassword api call*/
  const handleForgotPasswordSubmit = (values, { setFieldValue }) => {
    if (email === values.email) {
      const data = {
        email: values.email,
        type: "forgotPassword",
      };

      DataService.post(Api.User.FORGOT_PASSWORD, data)
        .then((res) => {
          setUserId(res?.data?.data?._id);
          toast.success(res?.data?.message, {
            toastId: "customId",
          });
          handleOpenOtp();
          setforgot("forgotPassword");
          setEmail("");
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message, {
            toastId: "customId",
          });
        });
    } else {
      toast.error("Invalid Email", {
        toastId: "customId",
      });
      setFieldValue("email", "");
    }
    setforgot("");
  };

  return (
    <>
      <Index.Box className="modal-cancel-btn">
        <Index.Button className="btn btn-cancel">
          <img
            src={PageIndex.Svg.cancelmodal}
            className="cancel-modal"
            alt="modal-cancel"
            onClick={() => handleCloseForgotPassword()}
          />
        </Index.Button>
      </Index.Box>
      <Index.Box className="otp-main-component">
        <Index.Box className="signin-main-content">
          <Index.Box className="signin-content-details">
            <Index.Typography
              className="user-auth-title-comman"
              variant="h6"
              component="h6"
            >
              Email
            </Index.Typography>
          </Index.Box>
          <PageIndex.Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={userLoginValidationSchema}
            onSubmit={handleForgotPasswordSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Index.Box className="comman-details-auth-user">
                  <Index.Box className="form-control-details-auth mb-30px-form">
                    <Index.TextField
                      className="form-control custom-auth-user-control form-control-icon-left"
                      name="email"
                      placeholder="Enter email"
                      onBlur={handleBlur}
                      value={values.email}
                      onChange={handleChange}
                      helperText={touched.email && errors.email}
                      error={Boolean(errors.email && touched.email)}
                      onKeyDown={(e) => {
                        if (e.key === " " && e.target.value.trim() === "") {
                          e.preventDefault();
                        }
                      }}
                    />
                  </Index.Box>

                  <Index.Box className="btn-list-login-content">
                    <Index.Box className="login-btn-list">
                      <PageIndex.BlueButton
                        btnLabel="Submit"
                        className="blue-btn-content"
                        type="submit"
                      />
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              </form>
            )}
          </PageIndex.Formik>
        </Index.Box>
      </Index.Box>
    </>
  );
};

export default ForgotPassword;
