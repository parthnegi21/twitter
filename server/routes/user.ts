import express, { response, Response } from 'express';
import client from '../prisma/db';
import authMiddleware from "../middleware/auth";
import jwt, { JwtPayload } from 'jsonwebtoken';



import { AuthenticatedRequest } from '../types';

const router = express.Router();



router.get("/my",authMiddleware,async(req:AuthenticatedRequest,res:Response):Promise<void>=>{
    const response  = req.user as JwtPayload; 

   
    res.json(response)
})

router.get("/search/:term", authMiddleware, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const searchTerm = req.params.term;

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