import { Context } from 'hono';
import prisma from '../../lib/prisma'
import { Record } from '../../Types/record';

const recordService = new Record(prisma);

export const getRecord = async (c: Context) => {
    try {

        const id = await c.req.param('id');

        if (!id || typeof id != 'string') {
            console.log("ID malformed or not provided:", id)
            return c.json({ message: 'ID malformed or not provided' }, 400)
        }

        const record = await recordService.getOneById(id);

        if (!record || record.deleted) {
            return c.json({ message: 'Record not found!' }, 404);
        }

        return c.json(record, 200);
    } catch (error: any) {
        console.error(error);
        return c.json(
            {
                message: 'Error fetching record',
                error: error.message
            }, 500
        )
    }
};