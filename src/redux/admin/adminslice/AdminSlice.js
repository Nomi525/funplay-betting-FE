import { createSlice } from "@reduxjs/toolkit";
import { getRoleAdmin, loginAdmin, rolePermissionData } from "../AddService";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const AdminSlice = createSlice({
  name: "admin",
  initialState: {
    adminData: {},
    roleList: [],
    adminRoleData: {},
    token: "",
    loading: false,
    isAuthenticated: false,
    status: STATUSES.IDLE,
  },
  reducers: {
    logout: (state) => {
      // state.isAuthenticated = false;
      state.adminData = {};
      state.token = "";
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAdmin.pending, (state, action) => {
      state.loading = true;
    });
    builder
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.adminData = action.payload;
        //state.isAuthenticated = true;
        state.token = action.payload?.token;
        state.loading = false;
      })
      .addCase(getRoleAdmin.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.adminRoleData = action.payload?.data;
      });
  },
});

export const { logout } = AdminSlice.actions;

export default AdminSlice.reducer;
