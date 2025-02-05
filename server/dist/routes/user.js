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
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../prisma/db"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.get("/my", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = req.user;
    res.json(response);
}));
router.get("/search/:term", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchTerm = req.params.term;
    const users = yield db_1.default.user.findMany({
        where: {
            OR: [
                {
                    username: {
                        startsWith: searchTerm,
                        mode: 'insensitive' // Makes the search case-insensitive
                    }
                },
                {
                    name: {
                        startsWith: searchTerm,
                        mode: 'insensitive'
                    }
                }
            ]
        }
    });
    res.json(users);
}));
exports.default = router;
