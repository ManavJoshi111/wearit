import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../reducers/user.reducer";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    try {
      if (localStorage.getItem("token")) {
        dispatch(logoutUser());
      } else {
        console.log("no token found");
        navigate("/login");
      }
    } catch (err) {
      console.log("error: ", err);
    }
  }, []);
  return <div>Logout</div>;
};

export default Logout;
