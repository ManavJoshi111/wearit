import { getOrdersData } from "../mongodb/order.js";

export const getOrders = async (ctx) => {
  try {
    const orders = await getOrdersData();
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
