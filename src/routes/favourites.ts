import express from "express";
import { fetchFavourites, addFavourites } from "../controllers/favouriteController";

const favouritesRouter: express.Router = express.Router();

favouritesRouter.get("/", fetchFavourites);
favouritesRouter.post("/", addFavourites);

export default favouritesRouter;
