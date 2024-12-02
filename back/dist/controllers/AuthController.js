import prisma from '../config/db.config.js';
import jwt from 'jsonwebtoken';
class AuthController {
    static async login(request, response) {
        try {
            const body = request.body;
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
        }
        catch (err) {
            response.status(500).json({ message: 'Internal server error' });
        }
    }
}
export default AuthController;
