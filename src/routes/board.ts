import express from "express";
import { fetchBoard } from "../controllers/boardController";
const boardRouter: express.Router = express.Router();

boardRouter.get("/", fetchBoard);

export default boardRouter;
