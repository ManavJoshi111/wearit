import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

type PropType = {
  type?: string;
  component: React.FC;
  props?: any;
};

const PrivateRoute = ({ component, type, props }: PropType) => {
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
      case "buyer": {
        return user.type === "buyer" ? (
          <Component {...props} />
        ) : (
          <Navigate to="/login" />
        );
      }
      case "seller": {
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
