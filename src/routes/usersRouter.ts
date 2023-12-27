import express from "express";
import { loginUser, signupUser } from "../controllers/usersController";
const usersRouter: express.Router = express.Router();

usersRouter.post("/login", loginUser);
usersRouter.post("/signup", signupUser);
usersRouter.get("/test", (req, res) => {
  res.send("test complete");
});

export default usersRouter;
