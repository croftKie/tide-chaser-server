"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const favouriteSchema = new Schema({
    user_id: String,
    coords: [Number],
    name: String,
    updated: { type: Date, default: Date.now },
});
const Favourite = model("Favourite", favouriteSchema);
exports.default = Favourite;
