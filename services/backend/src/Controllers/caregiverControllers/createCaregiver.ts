import { Context } from 'hono';
import prisma from '../../lib/prisma'
import { Caregiver } from '../../Types/caregiver';

const caregiverService = new Caregiver(prisma);

export const createCaregiver = async (c: Context) => {
    try {

        const body = await c.req.json();

        let dataToValidate = {
            ...body,
            createDate: new Date(),
            updateDate: new Date(),
            deleted: false
        };
        
        const validatedData = Caregiver.type.parse(dataToValidate);

        const caregiverId = await caregiverService.insertOne(validatedData);

        const caregiver = await caregiverService.getOneById(caregiverId);

        return c.json(caregiver, 201)
    } catch (error: any) {
        console.error(error);
        return c.json({
            message: 'Error creating Caregiver',
            error: error.message
        }, 500
        )
    }
};