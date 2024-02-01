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
  getUserProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/index.js";

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

router.get("/get-all-products", authenticateUser, getProducts);
router.get("/get-user-products", authenticateUser, isSeller, getUserProducts);
router.get("/get-product/:id", authenticateUser, getProduct);

export { router as productRouter };
