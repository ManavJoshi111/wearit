import { client } from "../DB/db.js";
import md5 from "md5";
import { generateJWT, verifyJWT } from "../utils/JWTUtil.js";
// import { registerValidator, loginValidator } from "../validators/index.js";
import {
  insertUser,
  getUserByEmail,
  getUserByEmailPassword,
} from "../mongodb/user.js";

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
    const result = await insertUser({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      type,
    });
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
  ctx.response.status = 200;
  ctx.response.body = {
    user: ctx.user,
  };
};
