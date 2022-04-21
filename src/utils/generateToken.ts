import jwt from "jsonwebtoken";
import "dotenv/config";

const accessToken = process.env.ACCESS_TOKEN_SECRET as string;

export const generateAccessToken = (user: object) => {
  return jwt.sign(user, accessToken, { expiresIn: "1h" });
};

const refreshToken = process.env.REFRESH_TOKEN_SECRET as string;

export const generateRefreshToken = (user: object) => {
  return jwt.sign(user, refreshToken);
};
