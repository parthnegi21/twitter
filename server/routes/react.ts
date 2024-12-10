import express, { response, Response } from 'express';
import client from '../prisma/db';
import authMiddleware from "../middleware/auth";
import jwt, { JwtPayload } from 'jsonwebtoken';



import { AuthenticatedRequest } from '../types';

const router = express.Router();


router.post("/like",authMiddleware,async(req:AuthenticatedRequest,res:Response):Promise<void>=>{

    const {id:fromUserId} = req.user as JwtPayload; 
    const {postId,authorId}= req.body
    
const check= await client.like.findFirst({
where:{
    userId:authorId,
    postId:postId,
    fromUserId
}

})
if(check==null){
    const response = await client.like.create({
        data:{
            userId:authorId,
            postId:postId,
            fromUserId
        }
    })
    if(response ){
        res.json("New like added")
    }
        
}
else{
    const unlike = await client.like.deleteMany({
        where:{
            userId:authorId,
            postId:postId,
            fromUserId:fromUserId
        }
    })
    if(unlike){
        res.json("Unliked")
    }

}
    
    
})

router.post("/count",async(req:AuthenticatedRequest,res:Response):Promise<void>=>{
    const {postId,authorId}= req.body
    const count = await client.like.findMany({
        where:{
            postId:postId,
            userId:authorId
            
        }
    })
    res.json({postId:postId,
        likescount:count.length
    })
})



export default router