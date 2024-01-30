import { Outlet } from "react-router-dom";
import CustomNavbar from "../customComponents/CustomNavbar.js";
const WithNavbar = () => {
  return (
    <>
      <CustomNavbar />
      <Outlet />
    </>
  );
};

export default WithNavbar;
