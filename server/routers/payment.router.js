import Router from "@koa/router";
import { authenticateUser, isBuyer } from "../middlewares/index.js";
import {
  createCheckoutSession,
  paymentSuccess,
} from "../controllers/payment.controller.js";
const router = new Router({
  prefix: "/api/payment",
});

router.post(
  "/create-checkout-session",
  authenticateUser,
  isBuyer,
  createCheckoutSession
);

router.get("/success/:cartId", paymentSuccess);
export { router as paymentRouter };
