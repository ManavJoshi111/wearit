import { addToCartData, getCartData } from "../mongodb/cart.js";
export const getCart = async (ctx) => {
  try {
    const { _id } = ctx.user;
    const cart = await getCartData(_id);
    ctx.response.status = 200;
    ctx.response.body = { cart };
    return;
  } catch (err) {
    console.log("Error in getCart: ", err);
    ctx.response.status = 500;
    ctx.response.body = {
      error: "Internal server error, please try again after sometime!",
    };
  }
};

export const addToCart = async (ctx) => {
  try {
    const { productId, quantity } = ctx.request.body;
    const cart = await addToCartData({
      userId: ctx.user._id,
      productId,
      quantity,
    });
    ctx.response.status = 200;
    ctx.response.body = {
      message: "Product added to cart successfully!",
      cart,
    };
    return;
  } catch (err) {
    console.log("Error in addToCart: ", err);
    ctx.response.status = 500;
    ctx.response.body = {
      error: "Internal server error, please try again after sometime!",
    };
  }
};

export const removeFromCart = async (ctx) => {
  try {
    const { userId, productId } = ctx.params;
    const cart = await removeFromCartData({ userId, productId });
    ctx.response.status = 200;
    ctx.response.body = {
      message: "Product removed from cart successfully!",
      cart,
    };
    return;
  } catch (err) {
    console.log("Error in removeFromCart: ", err);
    ctx.response.status = 500;
    ctx.response.body = {
      error: "Internal server error, please try again after sometime!",
    };
  }
};
