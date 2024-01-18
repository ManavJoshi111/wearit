const checkAuth = (ctx, next) => {
  console.log("here in the middleware");
  next();
};

module.exports = checkAuth;
