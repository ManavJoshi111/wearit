const getUserToken = async () => {
  return localStorage.getItem("token");
};
export default getUserToken;
