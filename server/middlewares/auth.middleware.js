import { verifyJWT, JsonWebTokenError } from "../utils/JWTUtil.js";
import { getUserById } from "../mongodb/user.js";

export const authenticateUser = async (ctx, next) => {
  try {
    if (!ctx.headers.authorization) {
      ctx.response.status = 401;
      ctx.response.body = {
        error: "Unauthorized!",
      };
      return;
    }
    const token = ctx.headers.authorization.split(" ")[1];
    if (!token) {
      ctx.response.status = 401;
      ctx.response.body = {
        error: "Unauthorized!",
      };
      return;
    }
    const decodedToken = await verifyJWT(token);
    const user = await getUserById(decodedToken._id);
    if (user) {
      ctx.user = user;
    } else {
      ctx.response.status = 401;
      ctx.response.body = {
        error: "Unauthorized!",
      };
      return;
    }
    await next();
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      ctx.response.status = 401;
      ctx.response.body = {
        error: "Unauthorized",
      };
      return;
    }
    console.log("error in auth middleware: ", err);
    ctx.response.status = 500;
    ctx.response.body = {
      error: "Internal server error, please try again after sometime!",
    };
    return;
  }
};

export const isSeller = async (ctx, next) => {
  try {
    if (ctx.user.type !== "seller") {
      ctx.response.status = 403;
      ctx.response.body = {
        error: "Forbidden",
      };
      return;
    }
    await next();
  } catch (err) {
    console.log("error in isSeller middleware: ", err);
    ctx.response.status = 500;
    ctx.response.body = {
      error: "Internal server error, please try again after sometime!",
    };
    return;
  }
};

export const isBuyer = async (ctx, next) => {
  try {
    if (ctx.user.type !== "buyer") {
      ctx.response.status = 403;
      ctx.response.body = {
        error: "Forbidden",
      };
      return;
    }
    await next();
  } catch (err) {
    console.log("error in isBuyer middleware: ", err);
    ctx.response.status = 500;
    ctx.response.body = {
      error: "Internal server error, please try again after sometime!",
    };
    return;
  }
};
