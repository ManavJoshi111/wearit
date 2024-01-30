import Router from "@koa/router";
import { register, login, getUser } from "../controllers/auth.controller.js";
import {
  firstNameValidator,
  lastNameValidator,
  emailValidator,
  passwordValidator,
  confirmPasswordValidator,
  typeValidator,
} from "../validators/auth.validator.js";
import validate from "../middlewares/validator.middleware.js";
import { authenticateUser } from "../middlewares/index.js";

const router = new Router({
  prefix: "/api/auth",
});

router.post(
  "/register",
  validate([
    firstNameValidator,
    lastNameValidator,
    emailValidator,
    passwordValidator,
    confirmPasswordValidator,
    typeValidator,
  ]),
  register
);
router.post("/login", login);

router.post("/get-user", authenticateUser, getUser);

export { router as authRouter };
