import WorksModel from "../models/WorksModel";
import { Request, Response } from "express";
import { errorResponse, okResponse } from "../helpers/response";
import axios from "axios";

interface NewWorksTypes extends ReadableStream<Uint8Array> {
  title: string;
  coverImage: ImageData;
  description: string;
  projectDate: Date;
  projectLink: string;
}

export const addWorks = async (req: Request, res: Response) => {
  let { title, coverImage, description, projectDate, projectLink } =
    req.body as NewWorksTypes;
  try {
    let dbRes = await new WorksModel({
      title,
      coverImage,
      description,
      projectDate,
      projectLink,
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

export const getAllWorks = async (req: Request, res: Response) => {
  try {
    const dbRes = await WorksModel.find({});
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

export const getWorks = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const dbRes = await WorksModel.findById(id);
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

export const updateWorks = async (req: Request, res: Response) => {
  const id = req.params.id;
  let { title, coverImage, description, projectDate, projectLink } =
    req.body as NewWorksTypes & {
      id: string;
    };

  try {
    const dbRes = await WorksModel.updateOne(
      { _id: id },
      { title, coverImage, description }
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

export const deleteWorks = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { title, coverImage, description } = req.body as NewWorksTypes & {
    id: string;
  };

  try {
    const dbRes = await WorksModel.findOneAndRemove({ _id: id });
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

export const getReqWorks = async (req: Request, res: Response) => {
  const number = req.params.number as unknown;
  try {
    const dbRes = await WorksModel.find().limit(number as number);
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

export const fetchGithubData = async (req: Request, res: Response) => {
  let resData: any[];
  try {
    resData = await axios.get("https://api.github.com/users/Nabin99/repos");
    const postData = resData.map((obj) => ({
      description: obj.description,
      projectDate: obj.created_at,
      title: obj.name,
      projectLink: obj.html_url,
    }));
    const dbRes = await WorksModel.insertMany(postData);
    okResponse({
      data: dbRes,
      req,
      res,
      status: 201,
    });
  } catch (error) {
    errorResponse({
      data: error,
      description: "Unexpected Error!",
      message: " An error occured!",
      req,
      res,
      status: 400,
    });
  }
};
