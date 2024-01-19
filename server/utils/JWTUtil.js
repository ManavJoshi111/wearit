const jwt = require("jsonwebtoken");

exports.generateJWT = async (p) => {
  try {
    console.log("Payload: ", p);
    const JWT = await jwt.sign(p, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return JWT;
  } catch (err) {
    throw err;
  }
};

exports.verifyJWT = async () => {};
