import { Router, Response, Request } from "express/";
import {
  createUser,
  getAllUser,
  getUser,
  updateUser,
} from "../controllers/users";



const userRouter = Router();

const responseTest = (req: Request, res: Response) => {
  res.send(req.hostname + req.baseUrl + req.url);
};
userRouter.route("/").get(getAllUser).post(createUser);
userRouter.route("/:id").get(getUser).put(updateUser).delete(responseTest);


userRouter.route("/").get(getAllUser).post(createUser);
userRouter.route("/:id").get(getUser).put(updateUser).delete(responseTest);

userRouter.post("/login", responseTest);

export default userRouter;
