import { client } from "../DB/db.js";
export const Order = client.db("wearit").collection("orders");

export const getOrdersData = async ({ userId }) => {
  return await Order.find({ userId: userId }).toArray();
};

export const addOrderData = async (orderData) => {
  return await Order.insertOne({
    ...orderData,
    orderedTime: new Date(),
  });
};

export const getSellerOrdersData = async ({ userId }) => {
  return await Order.aggregate([
    {
      $match: { "productsdata.userId": userId },
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "customer",
      },
    },
    {
      $unwind: "$customer",
    },
    {
      $project: {
        "customer.password": 0,
      },
    },
  ]).toArray();
};
