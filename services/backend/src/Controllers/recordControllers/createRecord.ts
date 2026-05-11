import { Context } from 'hono';
import prisma from '../../lib/prisma'
import { Record } from '../../Types/record';

const recordService = new Record(prisma);

export const createRecord = async (c: Context) => {
    try {

        const body = await c.req.json();

        let dataToValidate = {
            ...body,
            createDate: new Date(),
            updateDate: new Date(),
            deleted: false
        };

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

        const recordId = await recordService.insertOne(validatedData);

        const record = await recordService.getOneById(recordId);

        return c.json(record, 201)
    } catch (error: any) {
        console.error(error);
        return c.json({
            message: 'Error creating Record',
            error: error.message
        }, 500
        )
    }
};