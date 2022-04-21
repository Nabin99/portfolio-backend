import ContactModel from "../models/ContactModel";
import { Request, Response } from "express";
import { errorResponse, okResponse } from "../helpers/response";
import { mailer } from "../utils/mailer";

interface NewContactTypes extends ReadableStream<Uint8Array> {
  name: string;
  email: string;
  message: string;
}

export const addContact = async (req: Request, res: Response) => {
  let { name, email, message } = req.body as NewContactTypes;
  try {
    const dbRes = await new ContactModel({
      name,
      email,
      message,
    }).save();

    mailer(email, name);

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

export const getAllContact = async (req: Request, res: Response) => {
  try {
    const dbRes = await ContactModel.find({});
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

export const getContact = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const dbRes = await ContactModel.findById(id);
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

export const updateContact = async (req: Request, res: Response) => {
  const id = req.params.id;
  let { name, email, message } = req.body as NewContactTypes & {
    id: string;
  };

  try {
    const dbRes = await ContactModel.updateOne(
      { _id: id },
      { name, email, message }
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

export const deleteContact = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, email, message } = req.body as NewContactTypes & {
    id: string;
  };

  try {
    const dbRes = await ContactModel.findOneAndRemove({ _id: id });
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
