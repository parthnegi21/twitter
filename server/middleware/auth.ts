import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction, response } from 'express';

interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}

const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(403).json({ msg: "No token provided or invalid format" });
    return; 
  }

  const token = authHeader.split(' ')[1];

  try {
    const checkToken = jwt.verify(token, "your_secret_key");
    console.log(checkToken)

    if (checkToken) {
      req.user = checkToken; 
      next(); 
    } else {
      res.status(401).json({ msg: "Invalid token" });
    }
  } catch (error) {
    res.status(401).json({ msg: "Token verification failed", error });
  }
};

export default authMiddleware;
