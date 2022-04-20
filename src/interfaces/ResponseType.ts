import { Response, Request } from "express";

export interface OkResponse {
  status: number;
  data: any;
  req: Request;
  res: Response;
}
export interface ErrorResponse extends OkResponse {
  message: string;
  description: string;
}
