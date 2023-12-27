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
exports.signupUser = exports.loginUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = __importDefault(require("../middleware/db/model/userModel"));
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginDetails = req.body;
    const user = yield userModel_1.default.findOne({ email: loginDetails.email });
    bcrypt_1.default.compare(loginDetails.password, user === null || user === void 0 ? void 0 : user.hash, function (err, result) {
        if (result === true) {
            res.send({ status: 1, message: "login complete", access: true });
        }
        else {
            res.send({
                status: 0,
                message: "Password or Email was incorrect",
                access: false,
            });
        }
    });
});
exports.loginUser = loginUser;
const signupUser = (req, res) => {
    console.log(req.body);
    const saltRounds = 10;
    bcrypt_1.default.genSalt(saltRounds, function (err, salt) {
        bcrypt_1.default.hash(req.body.password, salt, function (err, hash) {
            return __awaiter(this, void 0, void 0, function* () {
                const user = new userModel_1.default({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    hash: hash,
                });
                yield user.save();
                res.send("complete");
            });
        });
    });
};
exports.signupUser = signupUser;
