import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import NotFound from "./NotFound";
const RoleBasicRoute = (props) => {
  const isAdminRoute = window.location.pathname.startsWith("/admin");
  const user = useSelector((state) => state.account.user);
  const userRole = user.role;
  if (isAdminRoute && userRole === "ADMIN") {
    return <>{props.children}</>;
  } else {
    return (
      <>
        <NotFound></NotFound>
      </>
    );
  }
};
const ProtectedRoute = (props) => {
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  return (
    <div>
      {isAuthenticated === true ? (
        <RoleBasicRoute>{props.children} </RoleBasicRoute>
      ) : (
        <Navigate to="/login" replace />
      )}
    </div>
  );
};

export default ProtectedRoute;
