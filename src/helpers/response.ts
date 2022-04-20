import { OkResponse, ErrorResponse } from "../interfaces/ResponseType";

export const okResponse = ({ status, data, req, res }: OkResponse) => {
  const resObj = {
    success: true,
    code: status,
    requestedResource: req.hostname + req.baseUrl + req.path,
    payload: {
      data: data,
    },
    responseTime: new Date(),
  };
  res.status(status).send(resObj);
};

export const errorResponse = ({
  status,
  message,
  data,
  req,
  res,
}: ErrorResponse) => {
  const resObj = {
    success: false,
    requestUrl: req.hostname + req.baseUrl + req.path,
    payload: {
      data: data,
    },
    error: {
      code: status,
      message: message,
    },
  };
  res.status(status).send(resObj);
};
