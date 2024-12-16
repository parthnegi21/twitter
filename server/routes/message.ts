import express, { response, Response } from 'express';
import client from '../prisma/db';
import authMiddleware from "../middleware/auth";
import jwt, { JwtPayload } from 'jsonwebtoken';



import { AuthenticatedRequest } from '../types';

const router = express.Router();


router.get("/users",authMiddleware,async(req:AuthenticatedRequest,res:Response):Promise<void>=>{
    const {id} = req.user as JwtPayload; 
    const response = await client.user.findMany({
        where: {
        id: {
               not: id,
             },
           },
    })
  res.json(response)
})


router.get("/:id",authMiddleware,async(req:AuthenticatedRequest,res:Response):Promise<void>=>{
    const {id:toId}=req.params
    const receiverId = parseInt(toId, 10);
    const {id:myId} = req.user as JwtPayload; 

    const message = await client.message.findMany({
        where:{
            OR:[
                {fromUserId:receiverId,toUserId:myId},
                {fromUserId:myId,toUserId:receiverId}
            ]
        }
    })
    res.json(message)
})

router.post("/send:id",authMiddleware,async(req:AuthenticatedRequest,res:Response):Promise<void>=>{
    const {id:toId}=req.params
    const receiverId = parseInt(toId, 10);
    const {id:myId} = req.user as JwtPayload; 
    const text = req.body

    const response = await client.message.create({
        data:{
            fromUserId:myId,
            toUserId:receiverId,
            text:text

        }

    })
    res.json(response)
}
)


    router.post("/read:id",authMiddleware,async(req:AuthenticatedRequest,res:Response):Promise<void>=>{
        const {id:myId} = req.user as JwtPayload; 
        const {id:toId}=req.params
    const receiverId = parseInt(toId, 10);
        const readMessage = await client.message.updateMany({
            where:{
                fromUserId:myId,
                toUserId:receiverId
            },
            data:{

                isRead:true
            }
        })
        res.json(readMessage)
    })

export default router