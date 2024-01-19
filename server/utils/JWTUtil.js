const jwt = require("jsonwebtoken");

exports.generateJWT = async (_id) => {
  try {
    const JWT = await jwt.sign(_id, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    console.log("generated jwt: ", JWT);
    return JWT;
  } catch (err) {
    throw err;
  }
};

exports.verifyJWT = async (token) => {
  try {
    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    return payload;
  } catch (err) {
    throw err;
  }
};
