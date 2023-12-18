import express from "express";
import { fetchAPIData } from "../controllers/apiController";

const apiRouter: express.Router = express.Router();

apiRouter.get("/", fetchAPIData);

export default apiRouter;
