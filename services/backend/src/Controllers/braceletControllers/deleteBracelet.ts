import { Context } from 'hono';
import prisma from '../../lib/prisma'
import { Bracelet } from '../../Types/bracelet';

const braceletService = new Bracelet(prisma);

export const deleteBracelet = async (c: Context) => {
    try {

        const id = await c.req.param('id');

        if (!id || typeof id != 'string') {
            console.log("ID malformed or not provided:", id)
            return c.json({message: 'ID malformed or not provided'}, 400)
        }
        
        await braceletService.deleteOne(id);

        return c.json({
            message: 'Bracelet deleted successfully',
        });
    } catch (error: any) {
        console.error(error);
        return c.json(
            {
                message: 'Error deleting Bracelet',
                error: error.message
            }, 500
        )
    }
};