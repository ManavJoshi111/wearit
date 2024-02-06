import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import Login from "../Features/Auth/components/Login";
import Register from "../Features/Auth/components/Register";
import Logout from "../Features/Auth/components/Logout";
import BuyerDashboard from "../Features/Buyer/BuyerDashboard";
import SellerDashboard from "../Features/Seller/SellerDashboard";
import PrivateRoute from "./PrivateRoute";
import { USER_TYPES } from "../utlils/constants";
import AddProduct from "../Features/Seller/AddProduct";
import Products from "../Features/Common/Products";
import Product from "../Features/Common/Product";
import BuyerHome from "../Features/Buyer/Home";
import Cart from "../Features/Buyer/cart/components/Cart";
import PaymentSuccess from "../Features/Buyer/PaymentSuccess";
import PaymentError from "../Features/Buyer/PaymentError";
import Orders from "../Features/Buyer/orders/Orders";

const Router: React.FC = () => {
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
        <Route path="" element={<BuyerHome />} />
        <Route path="products" element={<Products />} />
        <Route path="product/:id" element={<Product />} />
        <Route path="cart" element={<Cart />} />
        <Route path="payment/success/:id" element={<PaymentSuccess />} />
        <Route path="payment/error" element={<PaymentError />} />
        <Route path="reviews" element={<BuyerDashboard />} />
        <Route path="review/:id" element={<BuyerDashboard />} />
        <Route path="orders" element={<Orders />} />
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
