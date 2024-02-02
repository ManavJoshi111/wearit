import { register, login, getUser } from "./auth.controller.js";
import {
  addProduct,
  getProducts,
  getUserProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "./product.controller.js";
import { addToCart, getCart, removeFromCart } from "./cart.controller.js";

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
};
