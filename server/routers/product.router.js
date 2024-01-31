import Router from "@koa/router";
import { authenticateUser } from "../middlewares/index.js";
import { validate, isSeller } from "../middlewares/index.js";
import {
  proudctNameValidator,
  priceValidator,
  quantityValidator,
  categoriesValidator,
  imgUrlsValidator,
} from "../validators/index.js";
import { addProduct, getProducts } from "../controllers/index.js";

const router = new Router({
  prefix: "/api/product",
});

router.post(
  "/add-product",
  authenticateUser,
  isSeller,
  validate([
    proudctNameValidator,
    priceValidator,
    quantityValidator,
    categoriesValidator,
    imgUrlsValidator,
  ]),
  addProduct
);

router.get("/get-products", authenticateUser, getProducts);

export { router as productRouter };
