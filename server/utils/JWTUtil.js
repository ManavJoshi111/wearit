import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./constants.js";

export const generateJWT = async (jwtData) => {
  try {
    const JWT = await jwt.sign(jwtData, JWT_SECRET, {
      expiresIn: "7d",
    });
    return JWT;
  } catch (err) {
    throw err;
  }
};

export const verifyJWT = async (token) => {
  try {
    const payload = await jwt.verify(token, JWT_SECRET);
    return payload;
  } catch (err) {
    throw err;
  }
};

export const JsonWebTokenError = jwt.JsonWebTokenError;
