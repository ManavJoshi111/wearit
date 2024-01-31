import Cookies from "js-cookie";

const getUserToken = () => {
  return Cookies.get("token");
};
export default getUserToken;
