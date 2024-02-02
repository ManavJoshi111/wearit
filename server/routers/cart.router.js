import Router from "@koa/router";
import { authenticateUser, isBuyer } from "../middlewares/index.js";
import { addToCart, getCart } from "../controllers/index.js";

const router = new Router({
  prefix: "/api/cart",
});

router.get("/get-cart", authenticateUser, isBuyer, getCart);
router.post("/add-to-cart", authenticateUser, isBuyer, addToCart);
router.post("/delete-from-cart/:productId", authenticateUser, isBuyer);

export { router as cartRouter };
