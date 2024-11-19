import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { getRoleAdmin } from "../redux/admin/AddService";
import DataService from "../config/DataService";
import { logout } from "../redux/admin/adminslice/AdminSlice";

const AdminPrivateRoute = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const getPermissionData = () => {
    dispatch(getRoleAdmin());
  };
  useEffect(() => {
    getPermissionData();
  }, [location?.pathname]);

  // Check token expiry

  const isValidToken = (accessToken) => {
    if (!accessToken) {
      localStorage.removeItem("token");
      return false;
    }
    return true;

    // const decodedToken = jwtDecode(accessToken);
    // const currentTime = Date.now() / 1000;
    // console.log({decodedToken, currentTime});
    // if (decodedToken.exp > currentTime) {
    //   return true;
    // } else {
    //   localStorage.removeItem("token");
    //   return false;
    // }
  };

  const token = localStorage.getItem("token");

  console.log(token, 42);

  // 401 logout code
  // DataService.interceptors.request.use(
  //   (config) => {
  //     const token = localStorage.getItem("token");
  //     // if (token) {
  //     //   config.headers.auth = token;
  //     // }
  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );

  DataService.interceptors.response.use(
    (config) => config,
    (error) => {
      console.log(error, 61);
      const status = error.response?.status || 500;
      console.log(status, 5555);
      if (status === 401) {
        navigate("/admin/login");
        dispatch(logout());
      } else {
        return Promise.reject(error);
        //  return error;
      }
    }
  );

  return isValidToken(token) ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default AdminPrivateRoute;
