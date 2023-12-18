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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAPIData = void 0;
const fetchStormGlass_1 = require("../utils/fetchStormGlass");
const fetchAPIData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, fetchStormGlass_1.fetchStormGlassData)();
    res.send(data);
});
exports.fetchAPIData = fetchAPIData;
