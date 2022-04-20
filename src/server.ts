import express, { Express, Request, Response } from "express";
import config from "./config/config";

const app: Express = express();
config.connectDatabase();

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(config.PORT, () => {
  console.log(
    `⚡️[server]: Server is running at https://localhost:${config.PORT}`
  );
});
