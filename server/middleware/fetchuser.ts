import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Optional: export type for controller use
export interface AuthenticatedUser {
  _id: string;
  role: string;
  name: string;
}

const fetchuser = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header("authtoken");

  if (!token) {
    res.status(401).json({
      message: "Please Login or Signup to Access the resource",
      success: false,
    });
    return;
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    if (!data || typeof data !== "object" || !data.user) {
      res.status(401).json({
        message: "Invalid token. Please login again.",
        success: false,
      });
      return;
    }

    // Attach user manually using type assertion
    (req as any).user = data.user;

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export default fetchuser;
