import { client } from "../DB/db.js";
export const Order = client.db("wearit").collection("orders");

export const getOrdersData = async () => {
  return await Order.find({}).toArray();
};

export const addOrderData = async (orderData) => {
  return await Order.insertOne({
    ...orderData,
    orderedTime: new Date(),
  });
};
