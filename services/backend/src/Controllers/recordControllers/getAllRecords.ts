import { Context } from 'hono';
import prisma from '../../lib/prisma'
import { Record } from '../../Types/record';

const recordService = new Record(prisma);

export const getAllRecords = async (c: Context) => {
    try {

        const query = await c.req.query();

        const records = await recordService.getAll(query as any);

        return c.json(records, 200);
    } catch (error: any) {
        console.error(error);
        return c.json(
            {
                message: 'Error fetching records',
                error: error.message
            }, 500
        )
    }
};