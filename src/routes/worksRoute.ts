import { Router, Response, Request } from "express";
import {
  addWorks,
  deleteWorks,
  getAllWorks,
  getWorks,
  updateWorks,
} from "../controllers/worksController";
import { authenticateAccessToken } from "../middlewares/authenticateToken";

const WorksRouter = Router();

WorksRouter.route("/").get(getAllWorks).post(authenticateAccessToken, addWorks);
WorksRouter.route("/:id")
  .get(getWorks)
  .put(authenticateAccessToken, updateWorks)
  .delete(authenticateAccessToken, deleteWorks);

export default WorksRouter;
