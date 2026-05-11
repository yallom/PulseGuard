import { Context } from 'hono';
import prisma from '../../lib/prisma'
import { Caregiver } from '../../Types/caregiver';

const caregiverService = new Caregiver(prisma);

export const updateCaregiver = async (c: Context) => {
    try {

        const id = c.req.param('id')

        if (!id || typeof id != 'string') {
            console.log("ID malformed or not provided:", id)
            return c.json({message: 'ID malformed or not provided'}, 400)
        }

        const body = await c.req.json();

        const dataToValidate = {
            ...body,
            updateDate: new Date()
        }

        const validatedData = Caregiver.type.parse(dataToValidate);

        await caregiverService.updateOne(id, validatedData);

        const updated = await caregiverService.getOneById(id);

        return c.json(updated, 200);
    } catch (error: any) {
        console.error(error);
        return c.json(
            {
                message: 'Error updating caregiver',
                error: error.message
            }, 500
        )
    }
};