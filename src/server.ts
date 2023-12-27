import express from "express";
import dotenv from "dotenv";
import apiRouter from "./routes/api";
import boardRouter from "./routes/board";
import favouritesRouter from "./routes/favourites";
import usersRouter from "./routes/usersRouter";
import cors from "cors";
import mongoose from "mongoose";

const app: express.Application = express();
dotenv.config();
const PORT: number = 6001;
mongoose.connect(process.env.MONGODB!);

app.use(express.json());
app.use(cors());

app.use("/", apiRouter);
app.use("/board", boardRouter);
app.use("/favourites", favouritesRouter);
app.use("/users", usersRouter);

app.get("/testapi", (req: express.Request, res: express.Response) => {
  res.send({ status: 1, message: "test performed successfully" });
});

app.listen(PORT, listener);

function listener() {
  console.log(`Server listening on http://localhost:${PORT}`);
}
