"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const favouriteController_1 = require("../controllers/favouriteController");
const favouritesRouter = express_1.default.Router();
favouritesRouter.get("/", favouriteController_1.fetchFavourites);
exports.default = favouritesRouter;
