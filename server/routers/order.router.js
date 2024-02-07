import Router from "@koa/router";
import { authenticateUser, isBuyer, isSeller } from "../middlewares/index.js";
import { getOrders, getSellerOrders } from "../controllers/index.js";

const router = new Router({
  prefix: "/api/order",
});

router.get("/get-orders", authenticateUser, isBuyer, getOrders);
router.get("/get-seller-orders", authenticateUser, isSeller, getSellerOrders);

export { router as orderRouter };
