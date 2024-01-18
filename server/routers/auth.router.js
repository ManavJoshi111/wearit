const Router = require("@koa/router");
const middleware = require("../middlewares/auth.middleware");
const router = new Router();

router.get("/login", middleware, (ctx, next) => {
  console.log("in login");
});

module.exports = router;
