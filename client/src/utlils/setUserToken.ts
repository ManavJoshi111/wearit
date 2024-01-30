const setUserToken = async (token: string) => {
  console.log("token is getting set");
  return localStorage.setItem("token", token);
};
export default setUserToken;
