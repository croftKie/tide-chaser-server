import express from "express";
import dotenv from "dotenv";
import apiRouter from "./routes/api";
import boardRouter from "./routes/board";
import favouritesRouter from "./routes/favourites";

const app: express.Application = express();
dotenv.config();
const PORT: number = 6001;

app.use("/", apiRouter);
app.use("/board", boardRouter);
app.use("/favourites", favouritesRouter);

app.get("/testapi", (req: express.Request, res: express.Response) => {
  res.send({ status: 1, message: "test performed successfully" });
});

app.listen(PORT, listener);

function listener() {
  console.log(`Server listening on http://localhost:${PORT}`);
}
