import express, { response, Response } from 'express';
import client from '../prisma/db';
import authMiddleware from "../middleware/auth";
import jwt, { JwtPayload } from 'jsonwebtoken';



import { AuthenticatedRequest } from '../types';
import { parse } from 'path';

const router = express.Router();

router.post("/follow",authMiddleware,async(req:AuthenticatedRequest,res:Response):Promise<void>=>{
    
    const {id,name,username } = req.user as JwtPayload;
    const toUserId = req.body.id;

    const check = await client.connection.findMany({
        where:{fromUserID:id,toUserId}
    })
    console.log(check)

    if(check.length==0 ){

     
    const follow = await client.connection.create({
      data:{
             name,
             username,
             fromUserID:id,
             toUserId,
            
      }
  })
  res.json("followed successfully")
}
else{
  const unfollow = await client.connection.deleteMany({
    where:{
      fromUserID:id,
      toUserId
    }
  })
  res.json("unfollowed successfully")
}

})

router.get("/count",authMiddleware,async(req:AuthenticatedRequest,res:Response):Promise<void>=>{
   
  const {id } = req.user as JwtPayload;

  const following = await client.connection.findMany({
    where:{
      fromUserID:id
    }
  })
  
  const follower = await client.connection.findMany({
    where:{
      toUserId:id
    }
  })
 res.json({follower:follower.length,
  following:following.length
 })


 
})


router.post("/usercount",authMiddleware,async(req:AuthenticatedRequest,res:Response):Promise<void>=>{
 const id = req.body.id
  const following = await client.connection.findMany({
    where:{
      fromUserID:id
    }
  })
  
  const follower = await client.connection.findMany({
    where:{
      toUserId:id
    }
  })
 res.json({follower:follower.length,
  following:following.length
 })

})



export default router