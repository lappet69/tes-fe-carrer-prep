import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const authed = useSelector((state) => state.authed);
  return authed === true ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
