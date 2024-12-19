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
router.get("/users", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const response = yield db_1.default.user.findMany({
        where: {
            id: {
                not: id,
            },
        },
    });
    res.json(response);
}));
router.get("/send/:id", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: toId } = req.params;
    const receiverId = parseInt(toId, 10);
    const { id: myId } = req.user;
    const message = yield db_1.default.message.findMany({
        where: {
            fromUserId: myId,
            toUserId: receiverId
        }
    });
    res.json(message);
}));
router.get("/receive/:id", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: toId } = req.params;
    const receiverId = parseInt(toId, 10);
    const { id: myId } = req.user;
    const message = yield db_1.default.message.findMany({
        where: {
            fromUserId: receiverId,
            toUserId: myId
        }
    });
    res.json(message);
}));
router.post("/read/:id", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: myId } = req.user;
    const { id: toId } = req.params;
    const receiverId = parseInt(toId, 10);
    const readMessage = yield db_1.default.message.updateMany({
        where: {
            fromUserId: myId,
            toUserId: receiverId
        },
        data: {
            isRead: true
        }
    });
    res.json(readMessage);
}));
exports.default = router;
