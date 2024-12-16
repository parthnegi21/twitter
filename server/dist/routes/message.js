"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const express_1 = __importStar(require("express"));
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
router.get("/:id", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: toId } = req.params;
    const receiverId = parseInt(toId, 10);
    const { id: myId } = req.user;
    const message = yield db_1.default.message.findMany({
        where: {
            OR: [
                { fromUserId: receiverId, toUserId: myId },
                { fromUserId: myId, toUserId: receiverId }
            ]
        }
    });
    res.json(express_1.response);
}));
router.post("/send:id", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: toId } = req.params;
    const receiverId = parseInt(toId, 10);
    const { id: myId } = req.user;
    const text = req.body;
    const response = yield db_1.default.message.create({
        data: {
            fromUserId: myId,
            toUserId: receiverId,
            text: text
        }
    });
}));
router.post("/read:id", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
exports.default = router;
