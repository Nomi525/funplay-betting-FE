import React from "react";
import Index from "../../../../../Index";
import "./Signaturewallet.css";
import PagesIndex from "../../../../../PageIndex";
import * as yup from "yup";
import DataService from "../../../../../../config/DataService";
import { Api } from "../../../../../../config/Api";
import { toast } from "react-toastify";
import { loginWithWallet } from "../../../../../../redux/user/userSlice";
import { useDispatch } from "react-redux";

const WalletEmailUpadte = ({
  walletAddress,
  handleCloseEmailUpdate,
  walletType,
  magicWalletAddress,
}) => {
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
  };
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Enter the valid email")
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Enter the valid email"
      )
      .required("Email is required"),
  });

  const handleFormSubmit = async (values) => {
    const urlencoded = new URLSearchParams();
    urlencoded.append("email", values?.email);
    urlencoded.append(
      "walletAddress",
      magicWalletAddress ? magicWalletAddress : walletAddress
    );
    urlencoded.append("walletType", magicWalletAddress ? "magic" : walletType);
    await DataService.post(Api.User.UPDATE_EMAIL, urlencoded)
      .then((res) => {
        dispatch(loginWithWallet(res?.data?.data));
        localStorage.setItem("token", res?.data?.data?.token);
        if (res?.data?.status == 200) {
          handleCloseEmailUpdate();
          toast.success(res?.data?.message,  {
            toastId: "customId"
          });
        }
      })
      .catch((error) => {
        console.log(error, ":Error");
      });
  };

  return (
    <>
      <Index.Box className="choose-wallet-modal-main">
        <Index.Box className="choose-wallet-details" mt={3}>
          <Index.Typography
            component="h5"
            variant="h5"
            className=""
            align="center"
          >
            Email Update
          </Index.Typography>
        </Index.Box>
        <PagesIndex.Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            touched,
            errors,
          }) => (
            <form onSubmit={handleSubmit}>
              <Index.Box className="comman-details-auth-user">
                <Index.Box className="form-control-details-auth mb-30px-form">
                  <Index.Box>
                    <Index.Box className="icon-position-rel">
                      <Index.TextField
                        className="form-control custom-auth-user-control form-control-icon-left"
                        placeholder="Enter your email"
                        type="email"
                        name="email"
                        onBlur={handleBlur}
                        value={values.email}
                        onChange={handleChange}
                      />
                      <Index.Box className="icon-pos-top-control">
                        <img
                          src={PagesIndex.Svg.mailicon}
                          className="mail-icon-main"
                        />
                      </Index.Box>
                    </Index.Box>
                    {errors.email && (
                      <Index.FormHelperText error>
                        {errors.email}
                      </Index.FormHelperText>
                    )}
                  </Index.Box>
                </Index.Box>

                <Index.Box className="btn-list-login-content">
                  <Index.Box className="login-btn-list">
                    <PagesIndex.BlueButton
                      type="submit"
                      btnLabel="update Email"
                      className="blue-btn-content"
                      onClick={() => handleFormSubmit(values)}
                    />
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </form>
          )}
        </PagesIndex.Formik>
      </Index.Box>
    </>
  );
};

export default WalletEmailUpadte;
