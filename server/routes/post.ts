import express, { Response } from 'express';
import client from '../prisma/db';
import authMiddleware from "../middleware/auth";
import jwt, { JwtPayload } from 'jsonwebtoken';

import { AuthenticatedRequest } from '../types';

const router = express.Router();

router.post('/post', authMiddleware, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ error: 'User not authenticated' });
    return;
  }

  const { id, name, username } = req.user as JwtPayload;

  const response = await client.post.create({
    data: {
      content: req.body.content,
      imageUrl: req.body.imageUrl,
      username,
      name,
      authorId: id,
    },
  });

  res.status(201).json({ message: 'Post created successfully', data: response });
});

router.get("/mypost", authMiddleware, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { id, name, username } = req.user as JwtPayload;

  const response = await client.post.findMany({
    where: { authorId: id },
  });

  res.json({ name, username, response });
});

router.delete("/delete", authMiddleware, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const postid = req.body.postid;
  const { id } = req.user as JwtPayload;

  const post = await client.post.findFirst({
    where: {
      authorId: id,
      id: postid,
    },
  });

  if (!post) {
    res.status(404).json({ msg: "No Post found" });
    return;
  }

  await client.post.delete({
    where: { id: postid },
  });

  res.json({ msg: "Deleted successfully" });
});

router.get("/bulk", authMiddleware, async (_req: AuthenticatedRequest, res: Response): Promise<void> => {
  const response = await client.post.findMany();

  if (response.length === 0) {
    res.json({ msg: "no post found" });
    return;
  }

  res.json(response);
});

router.get("/userpost/:username", authMiddleware, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const usernameParam = req.params.username;
  const username = Array.isArray(usernameParam) ? usernameParam[0] : usernameParam;
  const response = await client.post.findMany({
    where: { username },
  });
  res.json(response);
});

router.post("/bookmark", authMiddleware, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { id } = req.user as JwtPayload;
  const postId = req.body.postId;

  const existing = await client.bookmark.findFirst({
    where: {
      userId: id,
      postId: postId,
    },
  });

  if (existing === null) {
    await client.bookmark.create({
      data: {
        userId: id,
        postId: postId,
      },
    });
    res.json({ msg: "Bookmark added" });
  } else {
    await client.bookmark.delete({
      where: { id: existing.id },
    });
    res.json({ msg: "Bookmark removed" });
  }
});

router.get("/bookmarks", authMiddleware, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { id } = req.user as JwtPayload;

  const bookmarks = await client.bookmark.findMany({
    where: { userId: id },
    include: { post: true },
  });

  res.json(bookmarks.map((b: any) => b.post));
});

export default router;
