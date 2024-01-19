const Router = require("@koa/router");
const { authController } = require("../controllers");
const router = new Router({
  prefix: "/api/auth",
});

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/get-user", authController.getUser);

module.exports = router;
