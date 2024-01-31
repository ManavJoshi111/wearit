import Cookies from "js-cookie";

const removeUserToken = () => {
  return Cookies.remove("token");
};
export default removeUserToken;
