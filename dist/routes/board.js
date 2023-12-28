"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const boardController_1 = require("../controllers/boardController");
const boardRouter = express_1.default.Router();
boardRouter.get("/", boardController_1.fetchBoard);
boardRouter.get("/single", boardController_1.fetchBoardSingle);
boardRouter.post("/", boardController_1.insertBoard);
exports.default = boardRouter;
