import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
    const { userInfo } = useSelector((state) => state.auth);
    // replace is used to replace any past history while navigation
    return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
