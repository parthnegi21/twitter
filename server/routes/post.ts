import express, { response, Response } from 'express';
import client from '../prisma/db';
import authMiddleware from "../middleware/auth";
import jwt, { JwtPayload } from 'jsonwebtoken';



import { AuthenticatedRequest } from '../types';

const router = express.Router();

router.post('/post', authMiddleware, async (req: AuthenticatedRequest, res: Response): Promise<void> => {



  if (!req.user) {
     res.status(401).json({ error: 'User not authenticated' });
  }

  const { id, name, username } = req.user as JwtPayload; 

  const response = await client.post.create({
    data: {
     content:req.body.content,
      username,
      name,
      authorId: id,
    },
  });

  res.status(201).json({ message: 'Post created successfully', data: response });
});




router.get("/mypost",authMiddleware,async(req:AuthenticatedRequest,res:Response):Promise<void>=>{
  const { id,name,username } = req.user as JwtPayload; 
   
 
  const response = await client.post.findMany({
    where:{authorId:id}
    
  })

  res.json({name:name,
    username:username,
    response
  })


 

 

})




router.delete("/delete",authMiddleware,async(req:AuthenticatedRequest,res:Response):Promise<void>=>{
   const postid = req.body.postid
  const { id } = req.user as JwtPayload; 


  const post = await client.post.findUnique({
    where:{
      authorId:id,
      id:postid
    }
  })

  if(!post){
    res.json("No Post found")
  }

  else{
  const response= await client.post.delete({
    where:
    {
      authorId:id,
      id:postid
    }


  })
  if(response){

    res.json({msg:"Deleted successfully"})
  }
}
})




router.get("/bulk",authMiddleware,async(req:AuthenticatedRequest,res:Response):Promise<void>=>{
const {id:authorId} = req.user as JwtPayload; 


const response = await client.post.findMany({
  where: {
   authorId: {
      not: authorId,
    },
  },
});

if(response.length==0){
  res.json({msg:"no post found"})

}

else{
  res.json(response)
}

})
  
  
export default router;
