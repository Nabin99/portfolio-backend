<<<<<<< HEAD
<<<<<<< HEAD
import { Router, Response, Request } from "express/";
=======
import { Router, Response, Request } from "express";

>>>>>>> f4d5a94 (removes / form import 'express')
=======
import { Router, Response, Request } from "express";
>>>>>>> dev
import {
  createUser,
  getAllUser,
  getUser,
  updateUser,
} from "../controllers/users";

<<<<<<< HEAD
<<<<<<< HEAD


=======
>>>>>>> f4d5a94 (removes / form import 'express')
=======
>>>>>>> dev
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
