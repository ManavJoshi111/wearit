import { ObjectId } from "mongodb";
import { client } from "../DB/db.js";

export const Review = client.db("wearit").collection("reviews");

export const addReviewData = async (data) => {
  return await Review.insertOne({
    ...data,
    productId: new ObjectId(data.productId),
    createdAt: new Date(),
  });
};

export const getProductReviewsData = async (productId) => {
  return await Review.aggregate([
    {
      $match: {
        productId: new ObjectId(productId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $project: {
        _id: 1,
        review: 1,
        rating: 1,
        createdAt: 1,
        user: {
          firstName: 1,
          lastName: 1,
        },
      },
    },
  ]).toArray();
  // return await Review.find({}).toArray();
};
