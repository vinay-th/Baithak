import { Request, Response } from 'express';
import prisma from '../config/db.config.js';
import jwt from 'jsonwebtoken';

interface LoginPayLoadType {
  name: string;
  email: string;
  provider: string;
  oauth_id: string;
  image?: string;
}

class AuthController {
  static async login(request: Request, response: Response) {
    try {
      const body: LoginPayLoadType = request.body;

      let findUser = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });

      if (!findUser) {
        findUser = await prisma.user.create({
          data: body,
        });
      }
      let JWTPayload = {
        name: body.name,
        email: body.email,
        id: findUser.id,
      };

      const token = jwt.sign(JWTPayload, process.env.JWT_SECRET, {
        expiresIn: '30d',
      });

      return response.json({
        message: 'User logged in successfully',
        user: {
          ...findUser,
          token: `Bearer ${token}`,
        },
      });
    } catch (err) {
      response.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default AuthController;
