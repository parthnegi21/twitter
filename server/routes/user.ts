import express, { response, Response } from 'express';
import client from '../prisma/db';
import authMiddleware from "../middleware/auth";
import jwt, { JwtPayload } from 'jsonwebtoken';



import { AuthenticatedRequest } from '../types';

const router = express.Router();

router.get("/name/:username",authMiddleware,async(req:AuthenticatedRequest,res:Response):Promise<void>=>{
    const username = req.params.username

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

export default router