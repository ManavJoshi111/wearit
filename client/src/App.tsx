import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AppRoutes from "./Routes/AppRoutes";
import { getUserData } from "./Auth/actions/user.action";
import { AppDispatch } from "./store";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import "bootswatch/dist/yeti/bootstrap.min.css";
import { toast } from "react-toastify";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  console.log("user: ", user);
  const token = localStorage.getItem("token");
  const getUser = async () => {
    try {
      const data = await dispatch(getUserData());
      data;
    } catch (err: any) {
      console.log("err: ", err);
    }
  };

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <AppRoutes />
    </>
  );
}

export default App;
