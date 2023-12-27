"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersController_1 = require("../controllers/usersController");
const usersRouter = express_1.default.Router();
usersRouter.post("/login", usersController_1.loginUser);
usersRouter.post("/signup", usersController_1.signupUser);
usersRouter.get("/test", (req, res) => {
    res.send("test complete");
});
exports.default = usersRouter;
