import { Context } from 'hono';
import prisma from '../../lib/prisma'
import { User } from '../../Types/user';

const userService = new User(prisma);

export const deleteUser = async (c: Context) => {
    try {

        const id = await c.req.param('id');

        if (!id || typeof id != 'string') {
            console.log("ID malformed or not provided:", id)
            return c.json({message: 'ID malformed or not provided'}, 400)
        }
        
        await userService.deleteOne(id);

        return c.json({
            message: 'User deleted successfully',
        });
    } catch (error: any) {
        console.error(error);
        return c.json(
            {
                message: 'Error deleting user',
                error: error.message
            }, 500
        )
    }
};