import Cookies from "js-cookie";

const setUserToken = (token: string) => {
  return Cookies.set("token", token);
};
export default setUserToken;
