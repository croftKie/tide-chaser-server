"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchBoardSingle = exports.insertBoard = exports.fetchBoard = void 0;
const boardModel_1 = __importDefault(require("../middleware/db/model/boardModel"));
const userModel_1 = __importDefault(require("../middleware/db/model/userModel"));
const fetchBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const boards = yield boardModel_1.default.find();
        res.send({ status: 1, content: boards });
    }
    catch (error) {
        res.send({ status: 0, content: "board sizes could not be retrieved" });
    }
});
exports.fetchBoard = fetchBoard;
const insertBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userModel_1.default.updateOne({ _id: req.body.user_id }, {
            board: req.body.board_id,
        });
        res.send({ status: 1, content: "board added" });
    }
    catch (error) {
        res.send({ status: 0, content: "board sizes could not be retrieved" });
    }
});
exports.insertBoard = insertBoard;
const fetchBoardSingle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findOne({ _id: req.query.user_id });
        const boards = yield boardModel_1.default.find({ _id: user === null || user === void 0 ? void 0 : user.board });
        res.send({ status: 1, content: boards });
    }
    catch (error) {
        res.send({ status: 0, content: "board sizes could not be retrieved" });
    }
});
exports.fetchBoardSingle = fetchBoardSingle;
