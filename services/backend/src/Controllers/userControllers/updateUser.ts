import { Context } from 'hono';
import prisma from '../../lib/prisma'
import { User } from '../../Types/user';

const userService = new User(prisma);

export const updateUser = async (c: Context) => {
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

        await userService.updateOne(validatedData.id!, validatedData);

        const updated = await userService.getOneById(validatedData.id!);

        return c.json(updated, 200);
    } catch (error: any) {
        console.error(error);
        return c.json(
            {
                message: 'Error updating user',
                error: error.message
            }, 500
        )
    }
};