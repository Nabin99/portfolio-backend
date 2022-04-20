import { Router, Response, Request } from "express/";

const userRouter = Router();

const responseTest = (req: Request, res: Response) => {
  res.send(req.hostname + req.baseUrl + req.url);
};
userRouter.route("/").get(responseTest).post(responseTest);
userRouter
  .route("/:id")
  .get(responseTest)
  .put(responseTest)
  .patch(responseTest)
  .delete(responseTest);
userRouter.post("/login", responseTest);

export default userRouter;
