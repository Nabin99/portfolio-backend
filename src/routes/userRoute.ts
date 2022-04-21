import { Router, Response, Request } from "express";

import {
  createUser,
  deleteUser,
  getAllUser,
  getUser,
  loginUser,
  updateUser,
} from "../controllers/userController";
import { authenticateAccessToken } from "../middlewares/authenticateToken";

const userRouter = Router();

userRouter.route("/").get(authenticateAccessToken, getAllUser).post(createUser);
userRouter
  .route("/:id")
  .get(authenticateAccessToken, getUser)
  .put(authenticateAccessToken, updateUser)
  .delete(authenticateAccessToken, deleteUser);

userRouter.post("/login", loginUser);

export default userRouter;
