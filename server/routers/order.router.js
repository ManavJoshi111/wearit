import Router from "@koa/router";
import { authenticateUser, isBuyer } from "../middlewares/index.js";
import { getOrders } from "../controllers/index.js";

const router = new Router({
  prefix: "/api/order",
});

router.get("/get-orders", authenticateUser, isBuyer, getOrders);

export { router as orderRouter };
