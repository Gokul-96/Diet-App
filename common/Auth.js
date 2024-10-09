import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const SALT_ROUND = 10;

const hashpassword = async (password) => {
  let salt = await bcrypt.genSalt(SALT_ROUND);
  let hash = await bcrypt.hash(password, salt);
  return hash;
};

const hashcompare = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

const createToken = async (payload) => {
  try {
    let token = await jwt.sign(payload, process.env.JWT_SECRET);
    return token;
  } catch (error) {
    console.error("Error generating JWT token:", error);
    throw new Error("Failed to generate JWT token");
  }
};

export default { hashpassword, hashcompare, createToken };
