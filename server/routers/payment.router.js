import Router from "@koa/router";
import { authenticateUser, isBuyer } from "../middlewares/index.js";
import { createCheckoutSession } from "../controllers/payment.controller.js";
const router = new Router({
  prefix: "/api/payment",
});

router.post(
  "/create-checkout-session",
  authenticateUser,
  isBuyer,
  createCheckoutSession
);

router.get("/success", async (ctx) => {
  ctx.response.status = 200;
  ctx.response.body = {
    message: "Payment successful!",
  };
});
export { router as paymentRouter };
