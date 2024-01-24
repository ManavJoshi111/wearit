const { client } = require("../DB/db");
const md5 = require("md5");
const { ObjectId } = require("mongodb");
const { generateJWT, verifyJWT } = require("../utils/JWTUtil");
const {
  authValidator: { registerValidator, loginValidator },
} = require("../validators");
const User = client.db("wearit").collection("users");

exports.register = async (ctx) => {
  const session = client.startSession();
  session.startTransaction();
  console.log("body: ", ctx.request.body);
  try {
    const { firstName, lastName, email, password, type } = ctx.request.body;
    const { error } = registerValidator.validate(ctx.request.body);
    if (error) {
      console.log("error: ", error);
      ctx.response.status = 400;
      ctx.response.body = { error: error?.details[0]?.message };
      return;
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      ctx.response.status = 400;
      ctx.response.body = {
        error: "An account associated with this email id already exists",
      };
      return;
    }
    const hashedPassword = md5(password);
    const result = await User.insertOne({
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

exports.login = async (ctx) => {
  const session = client.startSession();
  session.startTransaction();
  try {
    const { email, password } = ctx.request.body;
    const { error } = loginValidator.validate(ctx.request.body);
    if (error) {
      console.log("error: ", error);
      ctx.response.status = 400;
      ctx.response.body = { error: error?.details[0]?.message };
      return;
    }
    const hashedPassword = md5(password);
    const user = await User.findOne({ email, password: hashedPassword });
    if (!user) {
      ctx.response.status = 404;
      ctx.response.body = {
        error: "Invalid credentials or you don't have an account",
      };
      return;
    }
    const jwt = await generateJWT({ _id: user._id });
    session.commitTransaction();
    ctx.response.status = 200;
    ctx.response.body = {
      message: "Login successful!",
      token: jwt,
    };
  } catch (err) {
    console.log("Error in login: ", err);
    session.abortTransaction();
    ctx.response.status = 500;
    ctx.response.body = {
      error: "Internal server error, please try again after sometime!",
    };
  } finally {
    session.endSession();
  }
};

exports.getUser = async (ctx) => {
  try {
    console.log("getuser: ", ctx.request.body);
    const { token } = ctx.request?.body;
    if (!token) {
      ctx.response.status = 400;
      ctx.response.body = {
        error: "Token not found!",
        user: null,
      };
      return;
    }
    const payload = await verifyJWT(token);
    const { _id } = payload;
    console.log("id : ", _id);
    const user = await User.findOne(
      { _id: new ObjectId(_id) },
      {
        projection: { _id: 0, password: 0 },
      }
    );
    console.log("user: ", user);
    if (!user) {
      ctx.response.status = 404;
      ctx.response.body = {
        error: "User not found!",
        user: null,
      };
      return;
    }
    ctx.response.status = 200;
    ctx.response.body = { user };
  } catch (err) {
    console.log("error in getuser: ", err);
    ctx.response.status = 500;
    ctx.response.body = {
      error: "Internal server error",
      user: null,
    };
  }
};
