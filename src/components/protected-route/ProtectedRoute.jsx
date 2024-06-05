import React from "react";
import { useSelector } from "react-redux";
import Error403 from "./Error403";

const RoleBasicRoute = (props) => {
  const isAdminRoute = window.location.pathname === "/admin";
  const user = useSelector((state) => state.account.user);
  const userRole = user.role;
  if (isAdminRoute && userRole === "ADMIN") {
    return <>{props.children}</>;
  } else {
    return <Error403></Error403>;
  }
};

const ProtectedRoute = (props) => {
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  return (
    <>
      {isAuthenticated === true ? (
        <RoleBasicRoute>{props.children}</RoleBasicRoute>
      ) : (
        <Navigate to={"/login"} replace />
      )}
    </>
  );
};

export default ProtectedRoute;
