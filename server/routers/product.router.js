import Router from "@koa/router";
import { authenticateUser } from "../middlewares/index.js";
import { validate } from "../middlewares/index.js";
import {
  proudctNameValidator,
  priceValidator,
  categoriesValidator,
  imgUrlsValidator,
} from "../validators/index.js";
import { addProduct } from "../controllers/index.js";

const router = new Router({
  prefix: "/api/product",
});

router.post(
  "/add-product",
  authenticateUser,
  validate([
    proudctNameValidator,
    priceValidator,
    categoriesValidator,
    imgUrlsValidator,
  ]),
  addProduct
);

export { router as productRouter };
