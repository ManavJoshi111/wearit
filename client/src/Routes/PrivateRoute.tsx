import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

type PropType = {
  component: React.FC;
  props?: any;
};
const PrivateRoute = ({ component, props }: PropType) => {
  const { user, loading, error } = useSelector((state: any) => state.user);
  console.log("state: ", loading, error, user);
  const Component = component;
  if (!user && !loading && !error) {
    if (localStorage.getItem("token")) {
      return <h1>Loading...</h1>;
    } else {
      return <Navigate to="/login" />;
    }
  }
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
  } else if (!user) {
    console.log("rendering login");
    return <Navigate to="/login" />;
  } else {
    return <Component {...props} />;
  }
};

export default PrivateRoute;
