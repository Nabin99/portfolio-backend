import express, { Express, Request, Response } from "express";
import cors from "cors";
import config from "./config/config";
import userRouter from "./routes/userRoute";
import contactRouter from "./routes/contactRoute";

const app: Express = express();
config.connectDatabase();
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
app.use("/user", userRouter);
app.use("/contact", contactRouter);

app.listen(config.PORT, () => {
  console.log(
    `⚡️[server]: Server is running at https://localhost:${config.PORT}`
  );
});
