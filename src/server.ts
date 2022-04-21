import express, { Express, Request, Response } from "express";
import cors from "cors";
import config from "./config/config";
import userRouter from "./routes/userRoute";

const app: Express = express();
config.connectDatabase();
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
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
