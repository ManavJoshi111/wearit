import Stripe from "stripe";
import { CLIENT_URL, STRIPE_SECRET_KEY } from "../utils/constants.js";
import { Cart, emptyCart, getCartData } from "../mongodb/cart.js";
import { Product, decreaseProductQuantity } from "../mongodb/product.js";
import { ObjectId } from "mongodb";
import { addOrderData } from "../mongodb/order.js";

export const createCheckoutSession = async (ctx) => {
  try {
    const { cart } = ctx.request.body;
    const data = await getCartData(ctx.user._id);
    const stripe = new Stripe(STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: data.products.map((product, index) => {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: data.productsdata[index].name,
              description: data.productsdata[index].description,
              images: [...data.productsdata[index].imgUrls],
            },
            unit_amount: +data.productsdata[index].price * 100,
          },
          quantity: +product.quantity,
        };
      }),
      success_url: `${CLIENT_URL}/payment/success/${cart._id}`,
      cancel_url: `${CLIENT_URL}/payment/cancel`,
    });

    ctx.status = 200;
    ctx.response.body = {
      id: session.id,
    };
  } catch (err) {
    console.log("Error in payment : ", err.message);
    ctx.response.status = 500;
    ctx.response.body = {
      error: "Internal server error, please try again after sometime!",
    };
  }
};

export const paymentSuccess = async (ctx) => {
  try {
    const { cartId } = ctx.params;
    const cart = await getCartData(ctx.user._id);
    delete cart._id;
    await addOrderData(cart);
    await decreaseProductQuantity(cartId);
    await emptyCart(cartId);
    ctx.response.status = 200;
    ctx.response.body = {
      message: "Payment successful!",
    };
  } catch (err) {
    console.log("Error in payment success : ", err.message);
    ctx.response.status = 500;
    ctx.response.body = {
      error: "Internal server error, please try again after sometime!",
    };
  }
};
