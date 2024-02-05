import Router from "@koa/router";
import { authenticateUser, isBuyer } from "../middlewares/index.js";
import { addToCart, getCart, removeFromCart } from "../controllers/index.js";

const router = new Router({
  prefix: "/api/cart",
});

router.get("/get-cart", authenticateUser, isBuyer, getCart);
router.post("/add-to-cart", authenticateUser, isBuyer, addToCart);
router.delete(
  "/remove-from-cart/:productId",
  authenticateUser,
  isBuyer,
  removeFromCart
);

export { router as cartRouter };
