"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const api_1 = __importDefault(require("./routes/api"));
const board_1 = __importDefault(require("./routes/board"));
const favourites_1 = __importDefault(require("./routes/favourites"));
const usersRouter_1 = __importDefault(require("./routes/usersRouter"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const PORT = 6001;
mongoose_1.default.connect(process.env.MONGODB);
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/", api_1.default);
app.use("/board", board_1.default);
app.use("/favourites", favourites_1.default);
app.use("/users", usersRouter_1.default);
app.get("/testapi", (req, res) => {
    res.send({ status: 1, message: "test performed successfully" });
});
app.listen(PORT, listener);
function listener() {
    console.log(`Server listening on http://localhost:${PORT}`);
}
