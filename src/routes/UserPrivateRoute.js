import React, { useEffect } from "react";
import {
  Navigate,
  Outlet,
  useOutletContext,
  useSearchParams,
} from "react-router-dom";
import jwtDecode from "jwt-decode";

export const UserPrivateRoute = () => {
  console.log("calling query");
  const outletContext = useOutletContext();
  let joinReferralCode = useSearchParams();

  // console.log({outletContext});
  // Check token expiry
  const isValidToken = (accessToken) => {
    console.log("calling query inside fun", accessToken);

    if (!accessToken) {
      console.log("calling false ");

      return false;
    } else {
      return true;
    }

    // const decodedToken = jwtDecode(accessToken);
    // const currentTime = Date.now() / 1000;

    // if (decodedToken.exp > currentTime) {
    //   return true;
    // } else {
    //   localStorage.removeItem("token");
    //   return false;
    // }
  };

  console.log({ outletContext });
  const token = localStorage.getItem("token");
  return isValidToken(token) ? (
    <Outlet context={[...outletContext]} />
  ) : (
    <Navigate to="/user" />
  );
};

export const UserPrivateRouteWalletAddress = () => {
  // Check token expiry
  const isValidTokenAndWalletAddress = (walletAddress) => {
    // if (walletAddress == "undefined") {
    //   return false;
    // }
    return true;
  };
  const token = localStorage.getItem("token");
  const walletAddress = localStorage.getItem("walletAddress");
  return isValidTokenAndWalletAddress(walletAddress) ? (
    <Outlet />
  ) : (
    <Navigate to="/user" />
  );
};
