import React from "react";
import { Outlet } from "react-router-dom";
import HeadersAdmin from "./header/HeadersAdmin";
import FooterAdmin from "./footer/FooterAdmin";

const LayoutAdmin = () => {
  return (
    <div>
      <HeadersAdmin></HeadersAdmin>
      {/* <Outlet></Outlet> */}
      <FooterAdmin></FooterAdmin>
    </div>
  );
};

export default LayoutAdmin;
