import express from "express";
import { fetchFavourites } from "../controllers/favouriteController";

const favouritesRouter: express.Router = express.Router();

favouritesRouter.get("/", fetchFavourites);

export default favouritesRouter;
