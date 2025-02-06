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
router.post('/post', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.status(401).json({ error: 'User not authenticated' });
    }
    const { id, name, username } = req.user;
    const response = yield db_1.default.post.create({
        data: {
            content: req.body.content,
            imageUrl: req.body.imageUrl,
            username,
            name,
            authorId: id,
        },
    });
    res.status(201).json({ message: 'Post created successfully', data: response });
}));
router.get("/mypost", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, username } = req.user;
    const response = yield db_1.default.post.findMany({
        where: { authorId: id }
    });
    res.json({ name: name,
        username: username,
        response
    });
}));
router.delete("/delete", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postid = req.body.postid;
    const { id } = req.user;
    const post = yield db_1.default.post.findUnique({
        where: {
            authorId: id,
            id: postid
        }
    });
    if (!post) {
        res.json("No Post found");
    }
    else {
        const response = yield db_1.default.post.delete({
            where: {
                authorId: id,
                id: postid
            }
        });
        if (response) {
            res.json({ msg: "Deleted successfully" });
        }
    }
}));
router.get("/bulk", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: authorId } = req.user;
    const response = yield db_1.default.post.findMany({});
    if (response.length == 0) {
        res.json({ msg: "no post found" });
    }
    else {
        res.json(response);
    }
}));
router.get("/userpost/:username", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.params.username;
    const response = yield db_1.default.post.findMany({
        where: {
            username
        }
    });
    res.json(response);
}));
exports.default = router;
