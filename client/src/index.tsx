import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootswatch/dist/yeti/bootstrap.min.css";
import "./styles/style.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store.ts";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </BrowserRouter>
);
