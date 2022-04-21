import { Router, Response, Request } from "express";
import {
  addContact,
  deleteContact,
  getAllContact,
  getContact,
  updateContact,
} from "../controllers/contactController";
import { authenticateAccessToken } from "../middlewares/authenticateToken";

const contactRouter = Router();

contactRouter
  .route("/")
  .get(authenticateAccessToken, getAllContact)
  .post(addContact);
contactRouter
  .route("/:id")
  .get(authenticateAccessToken, getContact)
  .put(authenticateAccessToken, updateContact)
  .delete(authenticateAccessToken, deleteContact);

export default contactRouter;
