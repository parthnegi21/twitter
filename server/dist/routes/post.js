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
        return;
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
        where: { authorId: id },
    });
    res.json({ name, username, response });
}));
router.delete("/delete", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postid = req.body.postid;
    const { id } = req.user;
    const post = yield db_1.default.post.findFirst({
        where: {
            authorId: id,
            id: postid,
        },
    });
    if (!post) {
        res.status(404).json({ msg: "No Post found" });
        return;
    }
    yield db_1.default.post.delete({
        where: { id: postid },
    });
    res.json({ msg: "Deleted successfully" });
}));
router.get("/bulk", auth_1.default, (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield db_1.default.post.findMany();
    if (response.length === 0) {
        res.json({ msg: "no post found" });
        return;
    }
    res.json(response);
}));
router.get("/userpost/:username", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usernameParam = req.params.username;
    const username = Array.isArray(usernameParam) ? usernameParam[0] : usernameParam;
    const response = yield db_1.default.post.findMany({
        where: { username },
    });
    res.json(response);
}));
router.post("/bookmark", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const postId = req.body.postId;
    const existing = yield db_1.default.bookmark.findFirst({
        where: {
            userId: id,
            postId: postId,
        },
    });
    if (existing === null) {
        yield db_1.default.bookmark.create({
            data: {
                userId: id,
                postId: postId,
            },
        });
        res.json({ msg: "Bookmark added" });
    }
    else {
        yield db_1.default.bookmark.delete({
            where: { id: existing.id },
        });
        res.json({ msg: "Bookmark removed" });
    }
}));
router.get("/bookmarks", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const bookmarks = yield db_1.default.bookmark.findMany({
        where: { userId: id },
        include: { post: true },
    });
    res.json(bookmarks.map((b) => b.post));
}));
exports.default = router;
