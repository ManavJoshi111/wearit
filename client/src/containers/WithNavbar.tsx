import { Outlet } from "react-router-dom";
import CustomNavbar from "../customComponents/CustomNavbar";
const WithNavbar = () => {
  return (
    <>
      <CustomNavbar />
      <Outlet />
    </>
  );
};

export default WithNavbar;
