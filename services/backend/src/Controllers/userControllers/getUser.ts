import { Context } from 'hono';
import prisma from '../../lib/prisma'
import { User } from '../../Types/user';

const userService = new User(prisma);

export const getUser = async (c: Context) => {
    try {

        const id = await c.req.param('id');

        if (!id || typeof id != 'string') {
            console.log("ID malformed or not provided:", id)
            return c.json({ message: 'ID malformed or not provided' }, 400)
        }

        const user = await userService.getOneById(id);

        if (!user || user.deleted) {
            return c.json({ message: 'User not found!' }, 404);
        }

        return c.json(user, 200);
    } catch (error: any) {
        console.error(error);
        return c.json(
            {
                message: 'Error fetching user',
                error: error.message
            }, 500
        )
    }
};