import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../config/Api";
import DataService from "../../config/DataService";
import { toast } from "react-toastify";

// Login

export const loginUser = createAsyncThunk(
  "user/login",
  async (data, navigate) => {
    try {
      const response = await DataService.post(Api.User.OTP_VERIFY, data);
      if (response.data.status == 200) {
        toast.success(response.data?.message, {
          toastId: "customId",
        });
        localStorage.setItem("token", response.data.data.token);
      }
      return response.data.data;
    } catch (error) {
      toast.error(error.response.data.message || error.message, {
        toastId: "customId",
      });
      return error.response;
    }
  }
);

export const userLoginPassword = createAsyncThunk(
  "user/login/password",
  async (data, navigate) => {
    try {
      const response = await DataService.post(Api.User.PASSWORD_USER, data);
      if (response.data.status == 201 || response.data.status == 200) {
        toast.success(response?.data?.message, {
          toastId: "customId",
        });
        localStorage.setItem("token", response.data.data.token);
      }
      return response.data.data;
    } catch (error) {
      toast.error(error.response.data.message || error.message, {
        toastId: "customId",
      });
    }
  }
);

export const userSetPassword = createAsyncThunk(
  "user/setpassword",
  async (data, navigate) => {
    try {
      const response = await DataService.post(Api.User.SET_PASSWORD, data);
      if (response.data.status == 201 || response.data.status == 200) {
        toast.success(response?.data?.message, {
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
export const userProfile = createAsyncThunk(
  "user/profile",
  async (data, navigate) => {
    try {
      const response = await DataService.get(Api.User.USER_PROFILE, data);
      if (response.data.status == 200) {
      }
      return response.data.data;
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  }
);

export const userAmount = createAsyncThunk(
  "user/userAmount",
  async (data, navigate) => {
    try {
      const response = await DataService.get(
        Api.User.USER_DASHBOARD_DETAILS,
        data
      );
      if (response.data.status == 200) {
      }
      return response.data.data;
    } catch (error) {
      // toast.error(error.response.data.message || error.message);
    }
  }
);

export const userAmountNew = createAsyncThunk(
  "user/userAmountNew",
  async (data, navigate) => {
    try {
      const response = await DataService.get(
        Api.User.USER_DASHBOARD_DETAILS_NEW,
        data
      );
      const totalWin = await DataService.get(Api.User.USER_TOTAL_WIN);
      const totalLoose = await DataService.get(Api.User.USER_TOTAL_LOSE);
      if (response.data.status == 200) {
      }
      const dashboardData = {totalWin: totalWin.data.data, totalLoose: totalLoose.data.data, ...response.data.data}
      return dashboardData;
    } catch (error) {
      // toast.error(error.response.data.message || error.message);
    }
  }
);
export const userGameList = createAsyncThunk(
  "user/userGameList",
  async (data, navigate) => {
    try {
      const response = await DataService.get(Api.User.USER_GAMES, data);
      if (response.data.status == 200) {
      }
      return response.data.data;
    } catch (error) {
      // toast.error(error.response.data.message || error.message);
    }
  }
);

export const userWalletLogin = createAsyncThunk(
  "user/wallet/login",
  async (data, navigate) => {
    try {
      const response = await DataService.post(
        Api.User.USER_WALLET_SIGNUP,
        data
      );
      if (response.data.status == 200) {
        toast.success("Logged in successfully", {
          toastId: "customId",
        });
        localStorage.setItem("token", response.data.data.token);
      }
      return response.data.data;
    } catch (error) {
      toast.error(error.response.data.message || error.message, {
        toastId: "customId",
      });
    }
  }
);

export const getTotalCoins = createAsyncThunk(
  "user/userTotalCoins",
  async () => {
    try {
      const response = await DataService.get(Api.User.GET_TOTAL_COINS);

      return response.data.data;
    } catch (error) {
      // toast.error(error.response.data.message || error.message);
      console.log(error);
    }
  }
);
