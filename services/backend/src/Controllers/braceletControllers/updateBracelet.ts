import { Context } from 'hono';
import prisma from '../../lib/prisma'
import { Bracelet } from '../../Types/bracelet';

const braceletService = new Bracelet(prisma);

export const updateBracelet = async (c: Context) => {
    try {

        const id = await c.req.param('id');

        if (!id || typeof id != 'string') {
            console.log("ID malformed or not provided:", id)
            return c.json({ message: 'ID malformed or not provided' }, 400)
        }

        const body = await c.req.json();

        const dataToValidate = {
            ...body,
            updateDate: new Date()
        }

        if (dataToValidate.fabrication_date && typeof dataToValidate.fabrication_date === 'string') {
            const convertedDate = new Date(dataToValidate.fabrication_date);
            if (isNaN(convertedDate.getTime())) {
                return c.json({
                    message: 'Invalid date format for fabrication_date'
                }, 400)
            }
            dataToValidate.fabrication_date = convertedDate;
            console.log('Converted fabrication_date:', convertedDate);
        } else {
            console.log('fabrication_date not found or not a string:', dataToValidate.fabrication_date);
        }

        const validatedData = Bracelet.type.parse(dataToValidate);

        await braceletService.updateOne(id, validatedData);

        const updated = await braceletService.getOneById(id);

        return c.json(updated, 200);
    } catch (error: any) {
        console.error(error);
        return c.json(
            {
                message: 'Error updating bracelet',
                error: error.message
            }, 500
        )
    }
};