import { verifyJWT, JsonWebTokenError } from "../utils/JWTUtil.js";
import { getUserById } from "../mongodb/user.js";

const authenticateUser = async (ctx, next) => {
  try {
    console.log("Headers: ", ctx.headers.authorization);
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
    ctx.user = user;
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

export default authenticateUser;
