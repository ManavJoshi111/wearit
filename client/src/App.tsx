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
import { getCartData } from "./Features/Buyer/cart/actions/cart.action";
import { getProducts } from "./Features/Common/actions/product.action";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const getData = () => {
      try {
        dispatch(getUserData());
        dispatch(getProducts());
        dispatch(getCartData());
      } catch (err: unknown) {
        console.log("err: ", err);
      }
    };
    const token = getUserToken();
    if (token) {
      getData();
    }
  }, []);

  if (!getUserToken() || user) {
    return <Router />;
  } else {
    return <Loading />;
  }
}

export default App;
