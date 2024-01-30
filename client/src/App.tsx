import "react-toastify/ReactToastify.css";
import "bootswatch/dist/yeti/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Features/Auth/components/Login";
import Register from "./Features/Auth/components/Register";
import Logout from "./Features/Auth/components/Logout";
import BuyerDashboard from "./Features/Dashboard/BuyerDashboard";
import SellerDashboard from "./Features/Dashboard/SellerDashboard";
import PrivateRoute from "./Routes/PrivateRoute";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
import { getUserData } from "./Features/Auth/actions/user.action";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import WithoutNavbar from "./containers/WithoutNavbar";
import WithNavbar from "./containers/WithNavbar";
import { USER_TYPES } from "./utlils/constants";
import getUserToken from "./utlils/getUserToken";

function App() {
  const { BUYER, SELLER } = USER_TYPES;
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector((state: any) => state.user);
  const getUser = async () => {
    try {
      const data = await dispatch(getUserData());
      data;
    } catch (err: any) {
      console.log("err: ", err);
    }
  };

  useEffect(() => {
    const getToken = async () => {
      const token = await getUserToken();
      if (token) {
        getUser();
      }
    };
    getToken();
  }, []);

  if (!user && !loading && !error) {
    if (localStorage.getItem("token")) {
      return <h1>Loading...</h1>;
    }
  }

  return (
    <>
      <Routes>
        {/* Common Routes */}
        <Route element={<WithoutNavbar />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="*"
            element={
              <>
                <h1>404 Not Found!</h1>
              </>
            }
          />
        </Route>

        <Route element={<WithNavbar />}>
          <Route
            path="/logout"
            element={
              <PrivateRoute
                type="common-protected"
                component={Logout}
                props={{ prop: "Logout" }}
              />
            }
          />

          {/* Buyer routes */}
          <Route
            path="/"
            element={
              <PrivateRoute
                type={BUYER}
                component={BuyerDashboard}
                props={{ prop: "buyer route" }}
              />
            }
          />
          <Route
            path="/products"
            element={
              <PrivateRoute
                type={BUYER}
                component={BuyerDashboard}
                props={{ prop: "buyer route products" }}
              />
            }
          />
          <Route
            path="/product/:id"
            element={
              <PrivateRoute
                type={BUYER}
                component={BuyerDashboard}
                props={{ prop: "buyer route parti pro" }}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <PrivateRoute
                type={BUYER}
                component={BuyerDashboard}
                props={{ prop: "buyer route cart" }}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <PrivateRoute
                type={BUYER}
                component={BuyerDashboard}
                props={{ prop: "buyer route" }}
              />
            }
          />
          <Route
            path="/reviews"
            element={
              <PrivateRoute
                type={BUYER}
                component={BuyerDashboard}
                props={{ prop: "buyer route" }}
              />
            }
          />
          <Route
            path="/review/:id"
            element={
              <PrivateRoute
                type={BUYER}
                component={BuyerDashboard}
                props={{ prop: "buyer route" }}
              />
            }
          />
          <Route
            path="/orders"
            element={
              <PrivateRoute
                type={BUYER}
                component={BuyerDashboard}
                props={{ prop: "buyer route" }}
              />
            }
          />

          {/* Seller Routes */}
          <Route
            path="/s"
            element={
              <PrivateRoute
                type={SELLER}
                component={SellerDashboard}
                props={{ prop: "seller route" }}
              />
            }
          />
          <Route
            path="/s/products"
            element={
              <PrivateRoute
                type={SELLER}
                component={SellerDashboard}
                props={{ prop: "seller route" }}
              />
            }
          />
          <Route
            path="/s/product/:id"
            element={
              <PrivateRoute
                type={SELLER}
                component={SellerDashboard}
                props={{ prop: "seller route" }}
              />
            }
          />
          <Route
            path="/s/review/:id"
            element={
              <PrivateRoute
                type={SELLER}
                component={SellerDashboard}
                props={{ prop: "seller route" }}
              />
            }
          />
          <Route
            path="/s/orders"
            element={
              <PrivateRoute
                type={SELLER}
                component={SellerDashboard}
                props={{ prop: "seller route" }}
              />
            }
          />
          <Route
            path="/s/orders/:id"
            element={
              <PrivateRoute
                type={SELLER}
                component={SellerDashboard}
                props={{ prop: "seller route" }}
              />
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
