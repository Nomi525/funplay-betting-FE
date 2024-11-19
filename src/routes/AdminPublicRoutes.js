import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";

const AdminPublicRoutes = () => {
  // Check token expiry
  const isValidToken = (accessToken) => {
    if (!accessToken) {
      localStorage.removeItem("token");
      return false;
    }
    return true;
  };

  const token = localStorage.getItem("token");

  return isValidToken(token) ? <Navigate to="/admin" /> : <Outlet />;
};

export default AdminPublicRoutes;
