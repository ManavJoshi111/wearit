import Stripe from "stripe";
import { SERVER_URL, STRIPE_SECRET_KEY } from "../utils/constants.js";
import { Cart } from "../mongodb/cart.js";
import { ObjectId } from "mongodb";

export const createCheckoutSession = async (ctx) => {
  try {
    const { cart } = ctx.request.body;
    const [data] = await Cart.aggregate([
      {
        $match: { userId: new ObjectId(cart.userId) },
      },
      {
        $lookup: {
          from: "products",
          localField: "products.productId",
          foreignField: "_id",
          as: "productsdata",
        },
      },
    ]).toArray();

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
            unit_amount: +product.totalPrice * 100,
          },
          quantity: +product.quantity,
        };
      }),
      success_url: `${SERVER_URL}/api/payment/success`,
      cancel_url: `${SERVER_URL}/api/payment/cancel`,
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

export const paymentSuccess = async (ctx) => {};
