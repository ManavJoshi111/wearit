import { register, login, getUser } from "./auth.controller.js";
import {
  addProduct,
  getProducts,
  getUserProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "./product.controller.js";
import { createCheckoutSession } from "./payment.controller.js";
import { addToCart, getCart, removeFromCart } from "./cart.controller.js";
import { getOrders } from "./order.controller.js";
import { addReview, getProductReviews } from "./review.controller.js";

export {
  register,
  login,
  getUser,
  addProduct,
  getProducts,
  getUserProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  addToCart,
  getCart,
  removeFromCart,
  createCheckoutSession,
  getOrders,
  addReview,
  getProductReviews,
};
