import Router from "@koa/router";
import { authenticateUser } from "../middlewares/index.js";
import { validate, isSeller } from "../middlewares/index.js";
import {
  proudctNameValidator,
  priceValidator,
  quantityValidator,
  categoriesValidator,
  descriptionValidator,
  imgUrlsValidator,
} from "../validators/index.js";
import {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/index.js";

const router = new Router({
  prefix: "/api/product",
});

router.get("/get-products", authenticateUser, getProducts);
router.get("/get-product/:id", authenticateUser, getProduct);

router.post(
  "/add-product",
  authenticateUser,
  isSeller,
  validate([
    proudctNameValidator,
    priceValidator,
    quantityValidator,
    categoriesValidator,
    descriptionValidator,
    imgUrlsValidator,
  ]),
  addProduct
);

router.put(
  "/update-product/:id",
  authenticateUser,
  isSeller,
  validate([
    proudctNameValidator,
    priceValidator,
    quantityValidator,
    categoriesValidator,
    descriptionValidator,
  ]),
  updateProduct
);

router.delete("/delete-product/:id", authenticateUser, isSeller, deleteProduct);

export { router as productRouter };
