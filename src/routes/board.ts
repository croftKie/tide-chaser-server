import express from "express";
import {
  fetchBoard,
  fetchBoardSingle,
  insertBoard,
} from "../controllers/boardController";
const boardRouter: express.Router = express.Router();

boardRouter.get("/", fetchBoard);
boardRouter.get("/single", fetchBoardSingle);
boardRouter.post("/", insertBoard);

export default boardRouter;
