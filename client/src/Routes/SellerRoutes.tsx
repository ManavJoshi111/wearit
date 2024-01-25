import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";

const SellerRoutes: React.FC = () => (
  <>
    <Routes>
      <Route path="/s" element={<Home prop="Seller" />} />
      <Route path="/s/products" element={<Home prop="Seller" />} />
      <Route path="/s/product/:id" element={<Home prop="Seller" />} />
      <Route path="/s/review/:id" element={<Home prop="Seller" />} />
      <Route path="/s/orders" element={<Home prop="Seller" />} />
      <Route path="/s/orders/:id" element={<Home prop="Seller" />} />
    </Routes>
  </>
);

export default SellerRoutes;
