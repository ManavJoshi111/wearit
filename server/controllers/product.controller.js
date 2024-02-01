import {
  deleteProductData,
  getAllProducts,
  getProductById,
  insertProduct,
  updateProductData,
} from "../mongodb/product.js";

export const addProduct = async (ctx) => {
  try {
    const { name, description, categories, price, imgUrls, quantity } =
      ctx.request.body;
    await insertProduct({
      name,
      categories,
      price,
      imgUrls,
      quantity,
      description,
      userId: ctx.user._id,
      companyName: ctx.user.companyName,
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

export const getProduct = async (ctx) => {
  try {
    const { id } = ctx.params;
    const product = await getProductById(id);
    product.companyName = ctx.user.companyName;
    ctx.response.status = 200;
    ctx.response.body = { product };
    return;
  } catch (err) {
    console.log("Error in getProduct: ", err);
    ctx.response.status = 500;
    ctx.response.body = {
      error: "Internal server error, please try again after sometime!",
    };
  }
};

export const updateProduct = async (ctx) => {
  try {
    const { id } = ctx.params;
    const updatedProduct = await updateProductData({
      id,
      ...ctx.request.body,
    });
    ctx.response.status = 200;
    ctx.response.body = {
      message: "Product updated successfully!",
      product: updatedProduct,
    };
    return;
  } catch (err) {
    console.log("Error in updateProduct: ", err);
    ctx.response.status = 500;
    ctx.response.body = {
      error: "Internal server error, please try again after sometime!",
    };
  }
};

export const deleteProduct = async (ctx) => {
  try {
    const { id } = ctx.params;
    await deleteProductData(id);
    ctx.response.status = 200;
    ctx.response.body = {
      message: "Product deleted successfully!",
    };
    return;
  } catch (err) {
    console.log("Error in deleteProduct: ", err);
    ctx.response.status = 500;
    ctx.response.body = {
      error: "Internal server error, please try again after sometime!",
    };
  }
};
