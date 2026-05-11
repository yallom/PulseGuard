import { Context } from 'hono';
import prisma from '../../lib/prisma'
import { Caregiver } from '../../Types/caregiver';

const caregiverService = new Caregiver(prisma);

export const getCaregiver = async (c: Context) => {
    try {

        const id = await c.req.param('id');

        if (!id || typeof id != 'string') {
            console.log("ID malformed or not provided:", id)
            return c.json({ message: 'ID malformed or not provided' }, 400)
        }

        const caregiver = await caregiverService.getOneById(id);

        if (!caregiver || caregiver.deleted) {
            return c.json({ message: 'Caregiver not found!' }, 404);
        }

        return c.json(caregiver, 200);
    } catch (error: any) {
        console.error(error);
        return c.json(
            {
                message: 'Error fetching caregiver',
                error: error.message
            }, 500
        )
    }
};