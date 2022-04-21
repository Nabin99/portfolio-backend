import jwt from "jsonwebtoken";
import "dotenv/config";
import { Response, Request, NextFunction } from "express";
import { errorResponse, okResponse } from "../helpers/response";
import { generateAccessToken } from "../utils/generateToken";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string;

export const authenticateAccessToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearerHeader = req.headers["authorization"];
  let bearerToken: string;
  if (typeof bearerHeader !== "undefined") {
    bearerToken = bearerHeader.split(" ")[1];
    jwt.verify(bearerToken, accessTokenSecret, (err, user) => {
      if (err)
        errorResponse({
          data: err,
          description: "Authentication Error",
          message: "Invalid User Token",
          req,
          res,
          status: 401,
        });
      else next();
    });
  } else {
    errorResponse({
      data: {},
      description: "Authentication  Error",
      message: "Token Not Found",
      req,
      res,
      status: 403,
    });
  }
};

export const authenticateRefreshToken = (req: Request, res: Response) => {
  let token = req.body.refreshToken;

  jwt.verify(token, refreshTokenSecret, (err: any, user: any) => {
    if (err)
      errorResponse({
        data: err,
        description: "Authentication Error",
        message: "Invalid Refresh Token",
        req,
        res,
        status: 401,
      });
    else {
      okResponse({
        data: { accessToken: generateAccessToken(user) },
        req,
        res,
        status: 220,
      });
    }
  });
};
