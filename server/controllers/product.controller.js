import {
  deleteProduct,
  getAllProducts,
  getProductById,
  insertProduct,
  updateProduct,
} from "../mongodb/product.js";
export const addProduct = async (ctx) => {
  try {
    const { name, categories, price, imgUrls } = ctx.request.body;
    await insertProduct({ name, categories, price, imgUrls });
    ctx.response.status = 200;
    ctx.response.body = { message: "Product added successfully!" };
    return;
  } catch (err) {
    console.log("Error in addProduct: ", err);
    ctx.response.status = 500;
    ctx.response.body = {
      error: "Internal server error, please try again after sometime!",
    };
  }
};
