import { Context } from 'hono';
import prisma from '../../lib/prisma'
import { Record } from '../../Types/record';

const recordService = new Record(prisma);

export const deleteRecord = async (c: Context) => {
    try {

        const id = await c.req.param('id');

        if (!id || typeof id != 'string') {
            console.log("ID malformed or not provided:", id)
            return c.json({message: 'ID malformed or not provided'}, 400)
        }
        
        await recordService.deleteOne(id);

        return c.json({
            message: 'Record deleted successfully',
        });
    } catch (error: any) {
        console.error(error);
        return c.json(
            {
                message: 'Error deleting record',
                error: error.message
            }, 500
        )
    }
};