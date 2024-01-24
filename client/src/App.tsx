import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AppRoutes from "./Routes/AppRoutes";
import { getUserData } from "./Auth/actions/user.action";
import { AppDispatch } from "./store";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import "bootswatch/dist/yeti/bootstrap.min.css";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const getUser = async () => {
    try {
      const data = await dispatch(getUserData());
      data;
    } catch (err: any) {
      console.log("err: ", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
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
