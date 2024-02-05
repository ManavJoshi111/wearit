import { client } from "../DB/db.js";
import md5 from "md5";
import { generateJWT } from "../utils/JWTUtil.js";
import {
  insertUser,
  getUserByEmail,
  getUserByEmailPassword,
  getUserById,
} from "../mongodb/user.js";
import { Cart } from "../mongodb/cart.js";

export const register = async (ctx) => {
  const session = client.startSession();
  session.startTransaction();
  try {
    const { firstName, lastName, email, password, type } = ctx.request.body;
    const userExists = await getUserByEmail(email);
    if (userExists) {
      ctx.response.status = 400;
      ctx.response.body = {
        error: "An account associated with this email id already exists",
      };
      return;
    }
    const hashedPassword = md5(password);
    const user = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      type,
    };
    if (type === "seller") {
      user.companyName = ctx.request.body.companyName;
      user.companyAddress = ctx.request.body.companyAddress;
    }
    const result = await insertUser(user);
    if (type === "buyer") {
      await Cart.insertOne({
        userId: result.insertedId,
        products: [],
        grandTotal: 0,
      });
    }
    const jwt = await generateJWT({ _id: result.insertedId });
    session.commitTransaction();
    ctx.response.status = 200;
    ctx.response.body = {
      message: "Account created successfully",
      token: jwt,
    };
  } catch (err) {
    session.abortTransaction();
    console.log("error in signin controller: ", err);
    ctx.response.status = 500;
    ctx.response.body = {
      error: "Internal server error, please try again after sometime!",
    };
  } finally {
    session.endSession();
  }
};

export const login = async (ctx) => {
  try {
    const { email, password } = ctx.request.body;
    const hashedPassword = md5(password);
    const user = await getUserByEmailPassword(email, hashedPassword);
    if (!user) {
      ctx.response.status = 404;
      ctx.response.body = {
        error: "Invalid credentials or you don't have an account",
      };
      return;
    }
    const jwt = await generateJWT({ _id: user._id });
    ctx.response.status = 200;
    ctx.response.body = {
      message: "Login successful!",
      token: jwt,
    };
  } catch (err) {
    console.log("Error in login: ", err);
    ctx.response.status = 500;
    ctx.response.body = {
      error: "Internal server error, please try again after sometime!",
    };
  }
};

export const getUser = async (ctx) => {
  ctx.user = await getUserById(ctx.user._id);
  ctx.response.status = 200;
  delete ctx.user.password;
  ctx.response.body = {
    user: ctx.user,
  };
};
