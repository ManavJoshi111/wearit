import {
  deleteProduct,
  getAllProducts,
  getProductById,
  insertProduct,
  updateProduct,
} from "../mongodb/product.js";

export const addProduct = async (ctx) => {
  try {
    const { name, categories, price, imgUrls, quantity } = ctx.request.body;
    console.log("User in addproduct: ", ctx.user);
    await insertProduct({
      name,
      categories,
      price,
      imgUrls,
      quantity,
      userId: ctx.user._id,
    });
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

export const getProducts = async (ctx) => {
  try {
    const products = await getAllProducts();
    ctx.response.status = 200;
    ctx.response.body = { products };
    return;
  } catch (err) {
    console.log("Error in getProducts: ", err);
    ctx.response.status = 500;
    ctx.response.body = {
      error: "Internal server error, please try again after sometime!",
    };
  }
};
