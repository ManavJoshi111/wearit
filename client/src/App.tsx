import "react-toastify/ReactToastify.css";
import "bootswatch/dist/yeti/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
import { getUserData } from "./Features/Auth/actions/user.action";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import getUserToken from "./utlils/getUserToken";
import Router from "./Routes/Router";
import { RootState } from "./store";
import Loading from "./utlils/Loading";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  const getUser = async () => {
    try {
      await dispatch(getUserData());
    } catch (err: unknown) {
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
    return <Loading />;
  }
}

export default App;
