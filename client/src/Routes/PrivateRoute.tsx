import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { USER_TYPES } from "../utlils/constants";

type PropType = {
  type?: string;
  component: React.FC;
  props?: any;
};

const PrivateRoute = ({ component, type, props }: PropType) => {
  const { BUYER, SELLER } = USER_TYPES;
  const Component = component;
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
          <Component {...props} />
        ) : (
          <Navigate to="/login" />
        );
      }
      case SELLER: {
        return user.type === "seller" ? (
          <Component {...props} />
        ) : (
          <Navigate to="/login" />
        );
      }
      case "common-protected": {
        return <Component {...props} />;
      }
      default: {
        return <Navigate to="/" />;
      }
    }
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
