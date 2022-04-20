import { Router, Response, Request } from "express";


import {
  createUser,
  deleteUser,
  getAllUser,
  getUser,
  loginUser,
  updateUser,
} from "../controllers/userController";

const userRouter = Router();

userRouter.route("/").get(getAllUser).post(createUser);
userRouter.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

userRouter.post("/login", loginUser);


export default userRouter;
