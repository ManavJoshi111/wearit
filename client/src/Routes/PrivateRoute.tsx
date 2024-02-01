import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { USER_TYPES } from "../utlils/constants";
import { Outlet } from "react-router-dom";
import BuyerDashboard from "../Features/Dashboard/BuyerDashboard";
import SellerDashboard from "../Features/Dashboard/SellerDashboard";

type PropType = {
  type?: string;
  // component: React.FC<any>;
  // props?: any;
};

const PrivateRoute = ({ type }: PropType) => {
  const { BUYER, SELLER } = USER_TYPES;
  // const Component = component;
  const { user, loading, error } = useSelector((state: any) => state.user);

  if (loading) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  } else if (error) {
    return (
      <>
        <h1>Error</h1>
      </>
    );
  }
  if (user) {
    switch (type) {
      case BUYER: {
        return user.type === "buyer" ? (
          <>
            <BuyerDashboard />
            <Outlet />
          </>
        ) : (
          <Navigate to="/s" />
        );
      }
      case SELLER: {
        return user.type === "seller" ? (
          <>
            <SellerDashboard />
            <Outlet />
          </>
        ) : (
          <Navigate to="/" />
        );
      }
    }
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
