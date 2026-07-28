import express, { Response } from 'express';
import client from '../prisma/db';
import authMiddleware from "../middleware/auth";
import jwt, { JwtPayload } from 'jsonwebtoken';



import { AuthenticatedRequest } from '../types';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

router.post('/signup', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const { email, name, password, username } = req.body;

        if (!email || !name || !password || !username) {
            res.status(400).json({ msg: 'All fields are required' });
            return;
        }

        const existingUser = await client.user.findUnique({ where: { email } });

        if (existingUser) {
            res.status(400).json({ msg: 'Email already exists. Try a different email.' });
            return;
        }

        const user = await client.user.create({ data: { email, name, password, username } });

        const token = jwt.sign(
            { id: user.id, name: user.name, email: user.email, username: user.username },
            JWT_SECRET
        );

        res.status(201).json({ msg: 'Signed up successfully', token });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ msg: 'Signup failed', error: error instanceof Error ? error.message : 'Unknown error' });
    }
});

router.post('/signin', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const { identifier, password } = req.body;

        if (!identifier || !password) {
            res.status(400).json({ msg: 'Identifier and password are required' });
            return;
        }

        const user = await client.user.findFirst({
            where: {
                OR: [
                    { email: identifier },
                    { username: identifier },
                ],
            },
        });

        if (!user || user.password !== password) {
            res.status(401).json({ msg: 'Invalid username/email or password.' });
            return;
        }

        const token = jwt.sign(
            { id: user.id, name: user.name, email: user.email, username: user.username },
            JWT_SECRET
        );

        res.json({ msg: 'Signed in successfully', token });
    } catch (error) {
        console.error('Signin error:', error);
        res.status(500).json({ msg: 'Signin failed', error: error instanceof Error ? error.message : 'Unknown error' });
    }
});

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