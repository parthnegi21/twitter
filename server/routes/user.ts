import express, { Response } from 'express';
import client from '../prisma/db';
import authMiddleware from "../middleware/auth";
import jwt, { JwtPayload } from 'jsonwebtoken';



import { AuthenticatedRequest } from '../types';

const router = express.Router();

router.get("/name/:username",authMiddleware,async(req:AuthenticatedRequest,res:Response):Promise<void>=>{
    const usernameParam = req.params.username;
    const username = Array.isArray(usernameParam) ? usernameParam[0] : usernameParam;

    const response = await client.user.findUnique({
        where:{
            username
        }
    })
    res.json(response)
})


router.get("/my",authMiddleware,async(req:AuthenticatedRequest,res:Response):Promise<void>=>{
    const response  = req.user as JwtPayload; 

   
    res.json(response)
})

router.get("/search/:term", authMiddleware, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const termParam = req.params.term;
    const searchTerm = Array.isArray(termParam) ? termParam[0] : termParam;

    const users = await client.user.findMany({
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
});

export default router