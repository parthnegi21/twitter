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
router.post("/follow", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, username } = req.user;
    const toUserId = req.body.id;
    const check = yield db_1.default.connection.findMany({
        where: { fromUserID: id, toUserId }
    });
    console.log(check);
    if (check.length == 0) {
        const follow = yield db_1.default.connection.create({
            data: {
                name,
                username,
                fromUserID: id,
                toUserId,
            }
        });
        res.json("followed successfully");
    }
    else {
        const unfollow = yield db_1.default.connection.deleteMany({
            where: {
                fromUserID: id,
                toUserId
            }
        });
        res.json("unfollowed successfully");
    }
}));
router.get("/count", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const following = yield db_1.default.connection.findMany({
        where: {
            fromUserID: id
        }
    });
    const follower = yield db_1.default.connection.findMany({
        where: {
            toUserId: id
        }
    });
    res.json({ follower: follower.length,
        following: following.length
    });
}));
router.post("/usercount", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.id;
    const following = yield db_1.default.connection.findMany({
        where: {
            fromUserID: id
        }
    });
    const follower = yield db_1.default.connection.findMany({
        where: {
            toUserId: id
        }
    });
    res.json({ follower: follower.length,
        following: following.length
    });
}));
router.post("/check", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const toUserId = req.body.id;
    const check = yield db_1.default.connection.findFirst({
        where: { fromUserID: id, toUserId }
    });
    if (check) {
        res.json("Followed");
    }
    else {
        res.json("NotFollowed");
    }
}));
exports.default = router;
