import React from "react";
import { Outlet } from "react-router-dom";
import Headers from "./header/Headers";

const LayoutAdmin = () => {
  return (
    <div>
      <Headers></Headers>
      <Outlet></Outlet>
    </div>
  );
};

export default LayoutAdmin;
