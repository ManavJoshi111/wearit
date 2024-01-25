import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";

const BuyerRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home prop="BuyRoute" />} />
        <Route path="/products" element={<Home prop="BuyRoute" />} />
        <Route path="/product/:id" element={<Home prop="BuyRoute" />} />
        <Route path="/cart" element={<Home prop="BuyRoute" />} />
        <Route path="/checkout" element={<Home prop="BuyRoute" />} />
        <Route path="/reviews" element={<Home prop="BuyRoute" />} />
        <Route path="/review/:id" element={<Home prop="BuyRoute" />} />
        <Route path="/orders" element={<Home prop="BuyRoute" />} />
      </Routes>
    </>
  );
};

export default BuyerRoutes;
