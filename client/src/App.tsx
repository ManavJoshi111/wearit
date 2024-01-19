import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AppRoutes from "./AppRoutes";
import { getUserData } from "./Redux/actions/thunk";
import { AppDispatch } from "./Redux/store";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const getUser = async () => {
    try {
      const data = await dispatch(getUserData());
      console.log("data: ", data);
    } catch (err: any) {
      console.log("err: ", err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;
