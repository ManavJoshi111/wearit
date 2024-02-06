import {
  deleteProductData,
  getAllProducts,
  getProductById,
  insertProduct,
  updateProductData,
  getUserProductsData,
} from "../mongodb/product.js";

export const addProduct = async (ctx) => {
  console.log("addproduct");
  try {
    const { name, description, categories, price, imgUrls, quantity } =
      ctx.request.body;
    const product = {
      name,
      description,
      price: +price,
      quantity: +quantity,
      imgUrls,
      categories,
      userId: ctx.user._id,
      companyName: ctx.user.companyName,
    };
    const { acknowledged, insertedId } = await insertProduct(product);
    if (acknowledged) {
      product._id = insertedId;
    }
    ctx.response.status = 200;
    ctx.response.body = { message: "Product added successfully!", product };
    return;
  } catch (err) {
    console.log("Error in addProduct: ", err);
    ctx.response.status = 500;
    ctx.response.body = {
      error: "Internal server error, please try again after sometime!",
    };
  }
};

// not used as of now, will se if we need it in future
export const getUserProducts = async (ctx) => {
  try {
    const products = await getUserProductsData(ctx.user._id);
    ctx.response.status = 200;
    ctx.response.body = { products };
    return;
  } catch (err) {
    console.log("Error in getUserProducts: ", err);
    ctx.response.status = 500;
    ctx.response.body = {
      error: "Internal server error, please try again after sometime!",
    };
  }
};

// returns all products if user is buyer and only added products if user is seller
export const getProducts = async (ctx) => {
  try {
    const products =
      ctx.user.type === "seller"
        ? await getUserProductsData(ctx.user._id)
        : await getAllProducts();
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
    const { price, quantity } = ctx.request.body;
    ctx.request.body.price = +price;
    ctx.request.body.quantity = +quantity;
    const updatedProduct = await updateProductData({
      id,
      ...ctx.request.body,
    });
    console.log("data in update prodduct: ", updatedProduct);
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

export const addToCart = async (ctx) => {
  try {
  } catch (err) {
    console.log("Error in addToCart: ", err);
    ctx.response.status = 500;
    ctx.response.body = {
      error: "Internal server error, please try again after sometime!",
    };
  }
};
