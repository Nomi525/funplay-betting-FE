import { createSlice, current } from "@reduxjs/toolkit";
import {
  loginUser,
  userLoginPassword,
  userProfile,
  userWalletLogin,
  userSetPassword,
  userGameList,
  userGames,
  userAmount,
  getTotalCoins,
} from "./userReducer";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: {},
    token: "",
    loading: false,
    walletAddress: "",
    //isAuthenticated: false,
    status: STATUSES.IDLE,
    referralCode: "",
    userAmounts: 0,
    totalCoins: 0,
  },
  reducers: {
    logout: (state, action) => {
      state.isAuthenticated = false;
      state.userData = {};
      state.token = "";
      state.referralCode = "";
      state.walletAddress = "";
      state.totalCoins = "";
    },
    loginWithWallet: (state, action) => {
      state.userData = action.payload;
      state.isAuthenticated = true;
      state.token = action.payload?.token;
      state.referralCode = action.payload?.referralCode;
    },
    userData: (state, action) => {
      state.userData = action.payload;
      state.isAuthenticated = true;
      state.token = action.payload?.token;
      state.referralCode = action.payload?.referralCode;
    },
    dashboardAmount: (state, action) => {
      state.isAuthenticated = true;
      state.userAmounts = { ...state.userAmounts, ...action.payload };
    },
    resetDashboardAmount: (state, action) => {
      state.isAuthenticated = true;
      state.userAmounts = 0;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(loginUser.pending, (state, action) => {
    //   state.loading=true
    // });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.userData = action.payload ? action.payload : {};
      state.isAuthenticated = true;
      state.token = action.payload ? action.payload?.token : "";
      state.referralCode = action.payload ? action.payload?.referralCode : "";
      // state.loading=false
    });
    // builder.addCase(userWalletLogin.pending, (state, action) => {
    //   state.loading=true
    // });
    builder.addCase(userWalletLogin.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.isAuthenticated = true;
      state.token = action.payload?.token;
      state.walletAddress = action.payload?.walletAddress;
      // state.referralCode = action.payload?.referralCode;
      // state.loading=false
    });

    builder.addCase(userLoginPassword.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(userLoginPassword.fulfilled, (state, action) => {
      state.userData = action.payload ? action.payload : {};
      state.isAuthenticated = true;
      state.token = action.payload ? action.payload?.token : "";
      state.referralCode = action.payload ? action.payload?.referralCode : "";
      state.loading = false;
    });
    builder.addCase(userSetPassword.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(userSetPassword.fulfilled, (state, action) => {
      state.userData = action.payload ? action.payload : {};
      state.isAuthenticated = true;
      state.loading = false;
    });
    builder.addCase(userProfile.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(userProfile.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    });
    // builder.addCase(userAmount.fulfilled, (state, action) => {
    //   state.userAmounts = action.payload;
    //   state.isAuthenticated = true;
    //   state.loading = false;
    // });
    builder.addCase(userGameList.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    });
    builder.addCase(getTotalCoins.fulfilled, (state, action) => {
      state.totalCoins = action.payload;
    });
  },
});

export const {
  logout,
  loginWithWallet,
  userData,
  dashboardAmount,
  resetDashboardAmount,
} = userSlice.actions;

export default userSlice.reducer;
