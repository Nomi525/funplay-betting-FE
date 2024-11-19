import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../config/Api";
import DataService from "../../config/DataService";
import { toast } from "react-toastify";

// Login

export const loginAdmin = createAsyncThunk(
  "admin/login",
  async (data, navigate) => {
    try {
      const response = await DataService.post(Api.ADMIN_LOGIN, data);
      localStorage.setItem("token", response.data.data.token);
      if (response.data.status == 200) {
        toast.success("Logged in successfully", {
          toastId: "customId",
        });
      }
      return response.data.data;
    } catch (error) {
      toast.error(error.response.data.message || error.message, {
        toastId: "customId",
      });
    }
  }
);

// Get Cms List

//  // Admin Profile Update
// export const ProfileUpdate = createAsyncThunk(
//   "admin/profile",
//   async (data, navigate) => {
//
//     try {
//       const response = await DataService.post(Api.PROFILE_UPDATE, data);
//       localStorage.setItem("token", response.data.data.token);
//
//       if (response.data.status == 200) {
//         toast.success("Logged in successfully");
//       }
//       return response.data.data;
//     } catch (error) {
//       toast.error(error.response.data.message || error.message);
//     }
//   }
// );

// Get Cms List

// export const getCmsList = createAsyncThunk(
//   "admin/cms",
//   async (data, navigate) => {
//
//     try {
//       const response = await DataService.get(Api.ADMIN_CMS, data);
//
//       //localStorage.setItem("token", response.data.data.token);
//

//       if (response.data.status == 200) {
//         toast.success(response.data.message);
//       }
//       return response.data.data;
//     } catch (error) {
//       toast.error(error.response.data.message || error.message);
//     }
//   }
// );

// // Get CMS List
// export const GetCMSList = () => async (dispatch) => {
//   // To start the loading indicator
//   dispatch(LoadingStart());
//   const response = await APIService.GetCMSList();

//   if (response?.data?.status === "OK") {
//     // Dispactch reducer action

//     dispatch({
//       type: type.CMS_LIST_SUCCESS,
//       payload: response.data,
//     });
//   } else {
//     dispatch(LoadingEnd());
//     toast.error(response.response.data.message);
//   }
// };

// // Update CMS
// export const UpdateCMS = (data) => async (dispatch) => {
//   // To start the loading indicator
//   dispatch(LoadingStart());
//   const response = await APIService.UpdateCMS(data);

//   if (response?.data?.status === "OK") {
//     if(data?.type == 0)
//     {
//       toast.success("Privacy policy updated successfully");
//     }else{
//       toast.success("Terms & conditions updated successfully");
//     }
//     // Dispactch reducer action
//     dispatch(GetCMSList());
//   } else {
//     dispatch(LoadingEnd());
//     toast.error(response.response.data.message);
//   }
// };

// ForgotPassword

// export const forgotpasswordAdmin = createAsyncThunk(
//   "admin/forgot-password",
//   async (data, navigate) => {
//
//     try {
//       const response = await DataService.post(Api.FORGOT_PASSWORD, data);
//
//       if (response.data.status === 200) {
//         toast.success(response.data.message);

//         return response.data;
//       }
//     } catch (error) {
//       toast.error(error.response.data.message || error.message);
//     }
//   }
// );

// Reset Password

// export const resetpasswordAdmin = createAsyncThunk(
//   "admin/reset-password",
//   async (data) => {
//     try {
//       let reqData = {
//         adminId: data.adminId,
//         password: data.password,
//         confirm_password: data.confirm_password,
//       };
//       const response = await DataService.post(
//         `${Api.RESET_PASSWORD}/${data.id}`,
//         reqData
//       );
//       if (response.data.status === 200) {
//         toast.success(response.data.message);
//       }
//       return response.data;
//     } catch (error) {
//       toast.error(error.response.data.message || error.message);
//     }
//   }
// );
