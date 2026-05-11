import { Context } from 'hono';
import prisma from '../../lib/prisma'
import { User } from '../../Types/user';

const userService = new User(prisma);

export const createUser = async (c: Context) => {
    try {

        const body = await c.req.json();

        let dataToValidate = {
            ...body,
            createDate: new Date(),
            updateDate: new Date(),
            deleted: false
        };

        if (dataToValidate.birth_date && typeof dataToValidate.birth_date === 'string') {
            const convertedDate = new Date(dataToValidate.birth_date);
            if (isNaN(convertedDate.getTime())) {
                return c.json({
                    message: 'Invalid date format for birth_date'
                }, 400)
            }
            dataToValidate.birth_date = convertedDate;
            console.log('Converted birth_date:', convertedDate);
        } else {
            console.log('birth_date not found or not a string:', dataToValidate.birth_date);
        }
        
        const validatedData = User.type.parse(dataToValidate);

        const userId = await userService.insertOne(validatedData);

        const user = await userService.getOneById(userId);

        return c.json(user, 201)
    } catch (error: any) {
        console.error(error);
        return c.json({
            message: 'Error creating User',
            error: error.message
        }, 500
        )
    }
};