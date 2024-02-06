import { addReviewData, getProductReviewsData } from "../mongodb/review.js";

export const addReview = async (ctx) => {
  try {
    const { productId } = ctx.params;
    const { review, rating } = ctx.request.body;
    const user = ctx.user;
    const data = {
      productId,
      review,
      rating,
      userId: user._id,
    };
    const { acknowledged, insertedId } = await addReviewData(data);
    if (acknowledged) {
      data._id = insertedId;
      data.user = ctx.user;
      createdAt: new Date();
    }
    ctx.response.status = 200;
    ctx.response.body = { message: "Review added successfully!", review: data };
    return;
  } catch (err) {
    console.log("Error in getting review: ", err);
    ctx.response.status = 500;
    ctx.response.body = { message: "Internal Server Error!" };
  }
};

export const getProductReviews = async (ctx) => {
  try {
    const { productId } = ctx.params;
    const reviews = await getProductReviewsData(productId);
    ctx.response.status = 200;
    ctx.response.body = { message: "Reviews fetched successfully!", reviews };
    return;
  } catch (err) {
    console.log("Error in getting reviews: ", err);
    ctx.response.status = 500;
    ctx.response.body = { message: "Internal Server Error!" };
  }
};
