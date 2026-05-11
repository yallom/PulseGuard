import { Context } from 'hono';
import prisma from '../../lib/prisma'
import { Bracelet } from '../../Types/bracelet';

const braceletService = new Bracelet(prisma);

export const createBracelet = async (c: Context) => {
    try {

        const body = await c.req.json();

        let dataToValidate = {
            ...body,
            createDate: new Date(),
            updateDate: new Date(),
            deleted: false
        };

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

        const braceletId = await braceletService.insertOne(validatedData);

        const bracelet = await braceletService.getOneById(braceletId);

        return c.json(bracelet, 201)
    } catch (error: any) {
        console.error(error);
        return c.json({
            message: 'Error creating Bracelet',
            error: error.message
        }, 500
        )
    }
};