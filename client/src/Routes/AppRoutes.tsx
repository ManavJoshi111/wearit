import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Auth/components/Login";
import Register from "../Auth/components/Register";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/Home";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute
              component={Home}
              props={{ prop1: "thisistheprop" }}
            ></PrivateRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
