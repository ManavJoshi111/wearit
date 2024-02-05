import { ObjectId } from "mongodb";
import { client } from "../DB/db.js";
import { getProductById } from "./product.js";

export const Cart = client.db("wearit").collection("carts");

export const getCartData = async (userId) => {
  return await Cart.findOne({ userId: userId });
};

export const addToCartData = async ({ userId, productId, quantity }) => {
  const product = await getProductById(productId);
  if (!product) {
    throw Error("Product not found!");
  }
  const totalPrice = product.price * quantity;

  const productExists = await Cart.findOne({
    userId: userId,
    "products.productId": new ObjectId(productId),
  });

  if (productExists) {
    return await Cart.findOneAndUpdate(
      {
        userId: userId,
        "products.productId": new ObjectId(productId),
      },
      {
        $inc: {
          "products.$.quantity": +quantity,
          "products.$.totalPrice": totalPrice,
        },
        $set: {
          grandTotal: productExists.grandTotal + totalPrice,
        },
      },
      {
        returnDocument: "after",
      }
    );
  } else {
    return await Cart.findOneAndUpdate(
      { userId: userId },
      {
        $push: {
          products: {
            productId: new ObjectId(productId),
            quantity: +quantity,
            totalPrice: totalPrice,
          },
        },
        $inc: {
          grandTotal: totalPrice,
        },
      },
      {
        upsert: true,
        returnDocument: "after",
      }
    );
  }
};

export const removeFromCartData = async ({ userId, productId }) => {
  const product = await getProductById(productId);
  const cartProduct = await Cart.findOne({
    userId: userId,
    "products.productId": new ObjectId(productId),
  });
  const addedQuantity = cartProduct.products.find(
    (p) => p.productId.toString() === productId
  ).quantity;
  if (!product || !cartProduct) {
    throw Error("Product not found!");
  }
  const totalPrice = +product.price * addedQuantity;
  return await Cart.findOneAndUpdate(
    { userId: userId },
    {
      $pull: {
        products: { productId: new ObjectId(productId) },
      },
      $inc: {
        grandTotal: -totalPrice,
      },
    },
    {
      returnDocument: "after",
    }
  );
};
