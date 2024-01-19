const { client } = require("../DB/db");
const md5 = require("md5");
const { generateJWT } = require("../utils/JWTUtil");
const {
  authValidator: { registerValidator, loginValidator },
} = require("../validators");
const User = client.db("wearit").collection("users");

exports.register = async (ctx) => {
  const session = client.startSession();
  session.startTransaction();
  try {
    const { firstName, lastName, email, password, type } = ctx.request.body;
    const { error } = registerValidator.validate(ctx.request.body);
    if (error) {
      ctx.response.status = 400;
      ctx.response.body = { error: error?.details[0]?.message };
      return;
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      ctx.response.status = 400;
      ctx.response.body = {
        error: "An account associated with this email id already exists",
        user: userExists,
      };
      return;
    }
    const hashedPassword = md5(password);
    const result = await User.insertOne({
      firstName,
      lastName,
      email,
      hashedPassword,
      type,
    });
    const jwt = await generateJWT({ p: result.insertedId });
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
    if (!email || !password) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Please provide credentials!" };
    }
    const hashedPassword = md5(password);
    const user = await User.findOne({ email, hashedPassword });
    if (!user) {
      ctx.response.status = 404;
      ctx.response.body = {
        error: "Invalid credentials or you don't have an account",
      };
      return;
    }
    const jwt = await generateJWT({ p: user._id });
    session.commitTransaction();
    ctx.response.status = 200;
    ctx.response.body = {
      message: "You are loggedin successfully",
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
