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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(403).json({ msg: "No token provided or invalid format" });
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        const checkToken = jsonwebtoken_1.default.verify(token, "your_secret_key");
        console.log(checkToken);
        if (checkToken) {
            req.user = checkToken;
            next();
        }
        else {
            res.status(401).json({ msg: "Invalid token" });
        }
    }
    catch (error) {
        res.status(401).json({ msg: "Token verification failed", error });
    }
});
exports.default = authMiddleware;
