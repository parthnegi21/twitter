import express, { response, Response } from 'express';
import client from '../prisma/db';
import authMiddleware from "../middleware/auth";
import jwt, { JwtPayload } from 'jsonwebtoken';



import { AuthenticatedRequest } from '../types';

const router = express.Router();
router.post("/",authMiddleware,async(req:AuthenticatedRequest,res:Response):Promise<void>=>{
    const{id} =req.query

    const response = await client.user.findMany({
        where:{
            id
        }
    })
    res.json(response)
})

export default router