import { getOrdersData, getSellerOrdersData } from "../mongodb/order.js";

export const getOrders = async (ctx) => {
  try {
    const orders = await getOrdersData({ userId: ctx.user._id });
    ctx.status = 200;
    ctx.response.body = {
      orders,
    };
  } catch (err) {
    console.log("Error in getting orders : ", err.message);
    ctx.response.status = 500;
    ctx.response.body = {
      error: "Internal server error, please try again after sometime!",
    };
  }
};

export const getSellerOrders = async (ctx) => {
  try {
    const orders = await getSellerOrdersData({ userId: ctx.user._id });
    ctx.status = 200;
    ctx.response.body = {
      orders,
    };
  } catch (err) {
    console.log("Error in getting seller orders : ", err.message);
    ctx.response.status = 500;
    ctx.response.body = {
      error: "Internal server error, please try again after sometime!",
    };
  }
};
