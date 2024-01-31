import "react-toastify/ReactToastify.css";
import "bootswatch/dist/yeti/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
import { getUserData } from "./Features/Auth/actions/user.action";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import getUserToken from "./utlils/getUserToken";
import Router from "./Routes/Router";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: any) => state.user);
  const getUser = async () => {
    try {
      const data = await dispatch(getUserData());
      data;
    } catch (err: any) {
      console.log("err: ", err);
    }
  };

  useEffect(() => {
    const getToken = () => {
      const token = getUserToken();
      if (token) {
        getUser();
      }
    };
    getToken();
  }, []);

  if (!getUserToken() || user) {
    return <Router />;
  } else {
    return <h1>App Loading...</h1>;
  }
}

export default App;
