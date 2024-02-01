const RouterOld = () => {
  return <div>RouterOld</div>;
};

export default RouterOld;
// import { NavLink, Route, Routes } from "react-router-dom";
// import Login from "../Features/Auth/components/Login";
// import Register from "../Features/Auth/components/Register";
// import Logout from "../Features/Auth/components/Logout";
// import BuyerDashboard from "../Features/Dashboard/BuyerDashboard";
// import SellerDashboard from "../Features/Dashboard/SellerDashboard";
// import PrivateRoute from "./PrivateRoute";
// import WithoutNavbar from "../containers/WithoutNavbar";
// import WithNavbar from "../containers/WithNavbar";
// import AddProduct from "../Features/Product/components/AddProduct";
// import Products from "../Features/Product/components/Products";
// import { USER_TYPES } from "../utlils/constants";
// import Product from "../Features/Product/components/Product";

// const Router = () => {
//   const { BUYER, SELLER } = USER_TYPES;
//   return (
//     <Routes>
//       {/* Common Routes */}
//       <Route element={<WithoutNavbar />}>
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route
//           path="*"
//           element={
//             <>
//               <h1>404 Not Found!</h1>
//               <NavLink to="/">Go to Homepage</NavLink>
//             </>
//           }
//         />
//       </Route>

//       <Route element={<WithNavbar />}>
//         <Route
//           path="/logout"
//           element={
//             <PrivateRoute
//               type="common-protected"
//               component={Logout}
//               props={{ prop: "Logout" }}
//             />
//           }
//         />

//         {/* Buyer routes */}
//         <Route
//           path="/"
//           element={
//             <PrivateRoute
//               type={BUYER}
//               component={BuyerDashboard}
//               props={{ prop: "buyer route" }}
//             />
//           }
//         />
//         <Route
//           path="/products"
//           element={
//             <PrivateRoute
//               type={BUYER}
//               component={BuyerDashboard}
//               props={{ prop: "buyer route products" }}
//             />
//           }
//         />
//         <Route
//           path="/product/:id"
//           element={
//             <PrivateRoute
//               type={BUYER}
//               component={BuyerDashboard}
//               props={{ prop: "buyer route parti pro" }}
//             />
//           }
//         />
//         <Route
//           path="/cart"
//           element={
//             <PrivateRoute
//               type={BUYER}
//               component={BuyerDashboard}
//               props={{ prop: "buyer route cart" }}
//             />
//           }
//         />
//         <Route
//           path="/checkout"
//           element={
//             <PrivateRoute
//               type={BUYER}
//               component={BuyerDashboard}
//               props={{ prop: "buyer route" }}
//             />
//           }
//         />
//         <Route
//           path="/reviews"
//           element={
//             <PrivateRoute
//               type={BUYER}
//               component={BuyerDashboard}
//               props={{ prop: "buyer route" }}
//             />
//           }
//         />
//         <Route
//           path="/review/:id"
//           element={
//             <PrivateRoute
//               type={BUYER}
//               component={BuyerDashboard}
//               props={{ prop: "buyer route" }}
//             />
//           }
//         />
//         <Route
//           path="/orders"
//           element={
//             <PrivateRoute
//               type={BUYER}
//               component={BuyerDashboard}
//               props={{ prop: "buyer route" }}
//             />
//           }
//         />

//         {/* Seller Routes */}
//         <Route
//           path="/s"
//           element={
//             <PrivateRoute
//               type={SELLER}
//               component={SellerDashboard}
//               props={{ prop: "seller route" }}
//             />
//           }
//         />
//         <Route
//           path="/s/add-product"
//           element={<PrivateRoute type={SELLER} component={AddProduct} />}
//         />
//         <Route
//           path="/s/products"
//           element={
//             <PrivateRoute
//               type={SELLER}
//               component={Products}
//               props={{ prop: "seller route" }}
//             />
//           }
//         />
//         <Route
//           path="/s/product/:id"
//           element={
//             <PrivateRoute
//               type={SELLER}
//               component={Product}
//               props={{ prop: "seller route parti product" }}
//             />
//           }
//         />
//         <Route
//           path="/s/review/:id"
//           element={
//             <PrivateRoute
//               type={SELLER}
//               component={SellerDashboard}
//               props={{ prop: "seller route" }}
//             />
//           }
//         />
//         <Route
//           path="/s/orders"
//           element={
//             <PrivateRoute
//               type={SELLER}
//               component={SellerDashboard}
//               props={{ prop: "seller route" }}
//             />
//           }
//         />
//         <Route
//           path="/s/orders/:id"
//           element={
//             <PrivateRoute
//               type={SELLER}
//               component={SellerDashboard}
//               props={{ prop: "seller route" }}
//             />
//           }
//         />
//       </Route>
//     </Routes>
//   );
// };

// export default Router;
