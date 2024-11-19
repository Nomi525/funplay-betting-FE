import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./userSlice";



  const userSlice = createSlice({
    name: "user",
    initialState: {
    userData: {},
    token: "",
    loading: false,
    //isAuthenticated: false,

    referralCode:""
},
reducers: {
    logout: (state) => {
     // state.isAuthenticated = false;
      state.userData = {};
      state.token = "";
      state.referralCode = ""
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.userData = action.payload;
      //state.isAuthenticated = true;
      state.token = action.payload?.token;
      state.referralCode = action.payload?.referralCode;
    });
},

  });

export const { logout } = userSlice.actions;

export default userSlice.reducer;
