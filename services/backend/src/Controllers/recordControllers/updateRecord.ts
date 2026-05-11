import { Context } from 'hono';
import prisma from '../../lib/prisma'
import { Record } from '../../Types/record';

const recordService = new Record(prisma);

export const updateRecord = async (c: Context) => {
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

        if (dataToValidate.timestamp && typeof dataToValidate.timestamp === 'string') {
            const convertedDate = new Date(dataToValidate.timestamp);
            if (isNaN(convertedDate.getTime())) {
                return c.json({
                    message: 'Invalid date format for timestamp'
                }, 400)
            }
            dataToValidate.timestamp = convertedDate;
            console.log('Converted timestamp:', convertedDate);
        } else {
            console.log('timestamp not found or not a string:', dataToValidate.timestamp);
        }

        const validatedData = Record.type.parse(dataToValidate);

        await recordService.updateOne(validatedData.id!, validatedData);

        const updated = await recordService.getOneById(validatedData.id!);

        return c.json(updated, 200);
    } catch (error: any) {
        console.error(error);
        return c.json(
            {
                message: 'Error updating record',
                error: error.message
            }, 500
        )
    }
};