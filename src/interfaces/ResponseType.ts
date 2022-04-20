import { Response, Request } from "express";

export interface OkResponse {
  status: number;
  data: Object;
  req: Request;
  res: Response;
}
export interface ErrorResponse extends OkResponse {
  message: string;
}
