import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Auth/components/Login";
import Register from "../Auth/components/Register";
import Logout from "../Auth/components/Logout";
import BuyerRoutes from "./BuyerRoutes";
import SellerRoutes from "./SellerRoutes";

const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <BuyerRoutes />
        <SellerRoutes />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
