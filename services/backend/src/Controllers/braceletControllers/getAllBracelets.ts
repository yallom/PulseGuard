import { Context } from 'hono';
import prisma from '../../lib/prisma'
import { Bracelet } from '../../Types/bracelet';

const braceletService = new Bracelet(prisma);

export const getAllBracelets = async (c: Context) => {
    try {

        const query = await c.req.query();

        const bracelets = await braceletService.getAll(query as any);

        return c.json(bracelets, 200);
    } catch (error: any) {
        console.error(error);
        return c.json(
            {
                message: 'Error fetching bracelets',
                error: error.message
            }, 500
        )
    }
};