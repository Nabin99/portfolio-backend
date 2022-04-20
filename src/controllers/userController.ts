import UserModel from "../models/UserModel";
import { Request, Response } from "express";
import { encrypt, validateEncryption } from "../utils/encryption";

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
    res.status(201).send(dbRes);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const dbRes = await UserModel.find({});
    res.status(200).send(dbRes);
  } catch (err) {
    res.status(404).send(err);
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const dbRes = await UserModel.findById(id);
    res.status(200).send(dbRes);
  } catch (err) {
    res.status(404).send(err);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const dbRes = await UserModel.findOne({ email: email });
    if (dbRes) {
      if (await validateEncryption(password, dbRes.password))
        res.status(200).send(dbRes);
      else res.status(401).send({ message: "invalid password" });
    } else {
      res.status(404).send({ message: "user not found" });
    }
  } catch (err) {
    res.status(404).send(err);
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
    res.status(200).send(dbRes);
  } catch (err) {
    res.status(404).send(err);
  }
};


export const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, email, contact, role, password } = req.body as NewUserTypes & {
    id: string;
  };

  try {
    const dbRes = await UserModel.findOneAndRemove({ _id: id });
    res.status(200).send(dbRes);
  } catch (err) {
    res.status(404).send(err);
  }
};

