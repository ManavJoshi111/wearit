import Router from "@koa/router";
import { authenticateUser, validate, isBuyer } from "../middlewares/index.js";
import { ratingValidator, reviewValidator } from "../validators/index.js";
import { addReview, getProductReviews } from "../controllers/index.js";

const router = new Router({
  prefix: "/api/review",
});
router.post(
  "/add-review/:productId",
  authenticateUser,
  isBuyer,
  validate([ratingValidator, reviewValidator]),
  addReview
);
router.get("/get-reviews/:productId", authenticateUser, getProductReviews);

export { router as reviewRouter };
