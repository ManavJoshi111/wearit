import { ObjectId } from "mongodb";
import { client } from "../DB/db.js";
const User = client.db("wearit").collection("users");

export const insertUser = async (data) => {
  return await User.insertOne({
    ...data,
  });
};

export const getUserById = async (id) => {
  return await User.findOne({ _id: new ObjectId(id) });
};

export const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const getUserByEmailPassword = async (email, password) => {
  return await User.findOne({
    email,
    password,
  });
};
