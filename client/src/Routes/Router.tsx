import { NavLink, Route, Routes } from "react-router-dom";
import Login from "../Features/Auth/components/Login";
import Register from "../Features/Auth/components/Register";
import Logout from "../Features/Auth/components/Logout";
import BuyerDashboard from "../Features/Dashboard/BuyerDashboard";
import SellerDashboard from "../Features/Dashboard/SellerDashboard";
import PrivateRoute from "./PrivateRoute";
// import AddProduct from "../Features/Product/components/AddProduct";
// import Products from "../Features/Product/components/Products";
import { USER_TYPES } from "../utlils/constants";
import AddProduct from "../Features/Product/components/AddProduct";
import Products from "../Features/Product/components/Products";
import Product from "../Features/Product/components/Product";
// import Product from "../Features/Product/components/Product";

const Router = () => {
  const { BUYER, SELLER } = USER_TYPES;
  return (
    <Routes>
      {/* Common Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="logout" element={<Logout />} />
      <Route
        path="*"
        element={
          <>
            <h1>404 Not Found!</h1>
            <NavLink to="/">Go to Homepage</NavLink>
          </>
        }
      />

      <Route
        path="/logout"
        element={<PrivateRoute type="common-protected" />}
      />

      {/* Buyer routes */}
      <Route path="/" element={<PrivateRoute type={BUYER} />}>
        <Route path="products" element={<BuyerDashboard />} />
        <Route path="product/:id" element={<BuyerDashboard />} />
        <Route path="cart" element={<BuyerDashboard />} />
        <Route path="checkout" element={<BuyerDashboard />} />
        <Route path="reviews" element={<BuyerDashboard />} />
        <Route path="review/:id" element={<BuyerDashboard />} />
        <Route path="orders" element={<BuyerDashboard />} />
      </Route>

      {/* Seller Routes */}
      <Route path="/s" element={<PrivateRoute type={SELLER} />}>
        <Route path="add-product" element={<AddProduct />} />
        <Route path="products" element={<Products />} />
        <Route path="product/:id" element={<Product />} />
        <Route path="review/:id" element={<SellerDashboard />} />
        <Route path="orders" element={<SellerDashboard />} />
        <Route path="orders/:id" element={<SellerDashboard />} />
      </Route>
    </Routes>
  );
};

export default Router;
