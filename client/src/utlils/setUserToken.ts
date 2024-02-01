import Cookies from "js-cookie";

const setUserToken = (token: string) => {
  return Cookies.set("token", token, {
    expires: 7,
  });
};
export default setUserToken;
