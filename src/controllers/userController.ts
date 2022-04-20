import UserModel from "../models/UserModel";
import { Request, Response } from "express";
import { encrypt, validateEncryption } from "../utils/encryption";
import { errorResponse, okResponse } from "../helpers/response";

interface NewUserTypes extends ReadableStream<Uint8Array> {
  name: string;
  email: string;
  contact: string;
  role: string;
  password: string;
}

export const createUser = async (req: Request, res: Response) => {
  let { name, email, contact, role, password } = req.body as NewUserTypes;
  try {
    password = await encrypt(req.body.password);

    const dbRes = await new UserModel({
      name,
      email,
      contact,
      role,
      password,
    }).save();
    okResponse({ data: dbRes, req, res, status: 201 });
  } catch (err: any) {
    errorResponse({
      data: err,
      req,
      res,
      status: 400,
      message: "An Error Occured!",
      description: "Unexpected error!",
    });
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const dbRes = await UserModel.find({});
    if (dbRes.length === 0) throw { error: "No data Found!" };
    okResponse({
      data: dbRes,
      req,
      res,
      status: 200,
    });
  } catch (err) {
    errorResponse({
      data: err,
      description: "Unexpected Error!",
      message: "An error occured!",
      req,
      res,
      status: 404,
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const dbRes = await UserModel.findById(id);
    okResponse({
      data: dbRes,
      req,
      res,
      status: 200,
    });
  } catch (err) {
    errorResponse({
      data: err,
      description: "An error Occured!",
      message: "Unexpected Error",
      req,
      res,
      status: 404,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const dbRes = await UserModel.findOne({ email: email });
    if (dbRes) {
      if (await validateEncryption(password, dbRes.password))
        okResponse({
          data: dbRes,
          req,
          res,
          status: 200,
        });
      else
        errorResponse({
          data: [],
          description: "An error Occured!",
          message: "Ivalid Password",
          req,
          res,
          status: 401,
        });
    } else {
      errorResponse({
        data: [],
        description: "An error Occured!",
        message: "User Not Found",
        req,
        res,
        status: 404,
      });
    }
  } catch (err) {
    errorResponse({
      data: err,
      description: "An error Occured!",
      message: "Unexpected Error",
      req,
      res,
      status: 404,
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  let { name, email, contact, role, password } = req.body as NewUserTypes & {
    id: string;
  };

  try {
    password = await encrypt(req.body.password);

    const dbRes = await UserModel.updateOne(
      { _id: id },
      { name, email, contact, role, password }
    );
    okResponse({
      data: dbRes,
      req,
      res,
      status: 200,
    });
  } catch (err) {
    errorResponse({
      data: err,
      description: "An error Occured!",
      message: "Unexpected error",
      req,
      res,
      status: 404,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, email, contact, role, password } = req.body as NewUserTypes & {
    id: string;
  };

  try {
    const dbRes = await UserModel.findOneAndRemove({ _id: id });
    okResponse({
      data: dbRes,
      req,
      res,
      status: 200,
    });
  } catch (err) {
    errorResponse({
      data: err,
      description: "An error Occured!",
      message: "Unexpected error",
      req,
      res,
      status: 404,
    });
  }
};
