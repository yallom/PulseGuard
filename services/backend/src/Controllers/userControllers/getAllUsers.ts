import { Context } from 'hono';
import prisma from '../../lib/prisma'
import { User } from '../../Types/user';

const userService = new User(prisma);

export const getAllUsers = async (c: Context) => {
    try {

        const query = await c.req.query();

        const users = await userService.getAll(query as any);

        return c.json(users, 200);
    } catch (error: any) {
        console.error(error);
        return c.json(
            {
                message: 'Error fetching users',
                error: error.message
            }, 500
        )
    }
};