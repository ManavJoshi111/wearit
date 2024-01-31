import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../reducers/user.reducer";
import { useNavigate } from "react-router-dom";
import getUserToken from "../../../utlils/getUserToken";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    try {
      if (getUserToken()) {
        dispatch(logoutUser());
      }
      navigate("/login");
    } catch (err) {
      console.log("error: ", err);
    }
  }, []);
  return <div>Logout</div>;
};

export default Logout;
