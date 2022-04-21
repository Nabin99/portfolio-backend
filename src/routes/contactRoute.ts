import { Router, Response, Request } from "express";
import { authenticateAccessToken } from "../middlewares/authenticateToken";

const contactRouter = Router();

const testRoute = (req: Request, res: Response) => {
  res.send(req.hostname + req.baseUrl + req.path);
};

contactRouter
  .route("/")
  .get(authenticateAccessToken, testRoute)
  .post(testRoute);
contactRouter
  .route("/:id")
  .get(authenticateAccessToken, testRoute)
  .put(authenticateAccessToken, testRoute)
  .delete(authenticateAccessToken, testRoute);

contactRouter.post("/login", testRoute);

export default contactRouter;
