import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Auth/components/Login";
import Home from "../pages/Home";
import Register from "../Auth/components/Register";

const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
