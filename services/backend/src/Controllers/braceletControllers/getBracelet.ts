import { Context } from 'hono';
import prisma from '../../lib/prisma'
import { Bracelet } from '../../Types/bracelet';

const braceletService = new Bracelet(prisma);

export const getBracelet = async (c: Context) => {
    try {

        const id = await c.req.param('id');

        if (!id || typeof id != 'string') {
            console.log("ID malformed or not provided:", id)
            return c.json({ message: 'ID malformed or not provided' }, 400)
        }

        const bracelet = await braceletService.getOneById(id);

        if (!bracelet || bracelet.deleted) {
            return c.json({ message: 'Bracelet not found!' }, 404);
        }

        return c.json(bracelet, 200);
    } catch (error: any) {
        console.error(error);
        return c.json(
            {
                message: 'Error fetching bracelet',
                error: error.message
            }, 500
        )
    }
};