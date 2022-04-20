import express, { Express, Request, Response } from "express";
import config from "./config/config";
import userRouter from "./routes/user";

const app: Express = express();
config.connectDatabase();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
app.use("/users", userRouter);

app.listen(config.PORT, () => {
  console.log(
    `⚡️[server]: Server is running at https://localhost:${config.PORT}`
  );
});
