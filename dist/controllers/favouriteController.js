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
exports.addFavourites = exports.fetchFavourites = void 0;
const favouriteModel_1 = __importDefault(require("../middleware/db/model/favouriteModel"));
const fetchFavourites = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const favourites = yield favouriteModel_1.default.find({ user_id: req.query.user_id });
        res.send({ status: 1, content: favourites });
    }
    catch (error) {
        res.send({ status: 0, content: "No favourites found" });
    }
});
exports.fetchFavourites = fetchFavourites;
const addFavourites = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const favourite = new favouriteModel_1.default({
            user_id: req.body.user_id,
            coords: req.body.coords,
            name: req.body.name,
        });
        yield favourite.save();
        res.send({ status: 1, content: "favourite added" });
    }
    catch (error) {
        res.send({ status: 0, content: "favourite failed to add" });
    }
});
exports.addFavourites = addFavourites;
