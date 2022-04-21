import { Router } from "express";
import {
  addWorks,
  deleteWorks,
  getAllWorks,
  getWorks,
  updateWorks,
  getReqWorks,
  fetchGithubData,
} from "../controllers/worksController";
import { authenticateAccessToken } from "../middlewares/authenticateToken";

const WorksRouter = Router();

WorksRouter.route("/").get(getAllWorks).post(authenticateAccessToken, addWorks);
WorksRouter.route("/:id")
  .get(getWorks)
  .put(authenticateAccessToken, updateWorks)
  .delete(authenticateAccessToken, deleteWorks);
WorksRouter.get("/list/:number", getReqWorks);

const SourceRoutes = Router();
WorksRouter.use("/fetch", SourceRoutes);

SourceRoutes.get("/github", fetchGithubData);

export default WorksRouter;
