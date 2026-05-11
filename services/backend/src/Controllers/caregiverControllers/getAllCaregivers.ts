import { Context } from 'hono';
import prisma from '../../lib/prisma'
import { Caregiver } from '../../Types/caregiver';

const caregiverService = new Caregiver(prisma);

export const getAllCaregivers = async (c: Context) => {
    try {

        const query = await c.req.query();

        const caregivers = await caregiverService.getAll(query as any);

        return c.json(caregivers, 200);
    } catch (error: any) {
        console.error(error);
        return c.json(
            {
                message: 'Error fetching caregivers',
                error: error.message
            }, 500
        )
    }
};