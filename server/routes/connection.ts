import express, { response, Response } from 'express';
import client from '../prisma/db';
import authMiddleware from "../middleware/auth";
import jwt, { JwtPayload } from 'jsonwebtoken';



import { AuthenticatedRequest } from '../types';

const router = express.Router();

router.post("/follow",authMiddleware,async(req:AuthenticatedRequest,res:Response):Promise<void>=>{
    
    const {id,name,username } = req.user as JwtPayload;
    const toUserId = req.body.id;

    const check = await client.connection.findMany({
        where:{fromUserID:id,toUserId}
    })

  if (check.length > 0 && check[0].status === "followed") 
  {
         res.json("Guy is already followed")
  }

  else{
    const response = await client.connection.create({
        data:{
               name,
               username,
               fromUserID:id,
               toUserId,
               status:"followed"
        }
    })

if(response){
    res.json("friend request sent successfully")
}
  }
})





export default router