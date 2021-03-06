import { OkResponse, ErrorResponse } from "../interfaces/ResponseType";

export const okResponse = ({ status, data, req, res }: OkResponse) => {
  const resObj = {
    success: true,
    code: status,
    requesteURL: req.hostname + req.baseUrl + req.path,
    payload: {
      data: data,
    },
    timeStamp: new Date(),
  };
  res.status(status).send(resObj);
};

export const errorResponse = ({
  status,
  message,
  data,
  req,
  description,
  res,
}: ErrorResponse) => {
  const resObj = {
    success: false,
    description,
    code: status,
    message: message,
    requestURL: req.hostname + req.baseUrl + req.path,
    error: data,
    timeStamp: new Date(),
  };
  res.status(status).send(resObj);
};
