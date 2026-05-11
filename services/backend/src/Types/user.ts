import { z } from 'zod';
import { PrismaClient, Gender } from '@prisma/client';

export type UserDataType = z.infer<typeof User.type>;
export type UserQueryType = z.infer<typeof User.queryType>;

export class User {
    private prismaClient: PrismaClient | null = null;

    static type = z.object({
        id: z.uuid().optional(),
        idCaregiver: z.uuid(),
        contactCaregiver: z.string(),
        name: z.string(),
        birth_date: z.date(),
        gender: z.enum(Gender),
        height: z.number(),
        weight: z.number(),
        lang: z.string(),
        avatar: z.string(),

        createDate: z.date().optional(),
        updateDate: z.date().optional(),
        deleted: z.boolean().optional()
    });

    static queryType = User.type.extend({
        orderBy: User.type.keyof(),
        order: z.enum(['asc', 'desc']).default('asc'),
        page: z.number().default(0),
    }).partial();

    constructor(database: PrismaClient) {
        this.prismaClient = database;
    }

    async insertOne(queryData: UserDataType): Promise<string> {
        if (!this.prismaClient) throw new Error('Database not attached');

        const user = await this.prismaClient.user.create({
            data: {
                ...queryData,
                createDate: new Date(),
                updateDate: new Date(),
                deleted: false
            }
        });

        return user.id;
    }

    async getOneById(id: string): Promise<UserDataType> {
        if (!this.prismaClient) throw new Error('Database not attached');

        const user = await this.prismaClient.user.findUnique({
            where: { id },
        });

        if (!user) throw new Error('User not found');

        return user;
    }

    async getAll(query: UserQueryType): Promise<UserDataType[]> {
        if (!this.prismaClient) throw new Error('Database not attached');

        const orderBy = query.orderBy ?? 'name';
        const order = query.order ?? 'asc';

        return await this.prismaClient.user.findMany({
            orderBy: {
                [orderBy]: order,
            },
        });
    }

    async updateOne(id: string, queryData: UserDataType): Promise<string> {
        if (!this.prismaClient) throw new Error('Database not attached');

        const user = await this.prismaClient.user.update({
            where: { id },
            data: {
                ...queryData,
                updateDate: new Date()
            }
        });

        return user.id;
    }

    async deleteOne(id: string): Promise<string> {
        if (!this.prismaClient) throw new Error('Database not attached');

        const user = await this.prismaClient.user.delete({
            where: { id },
        });

        return user.id;
    }
}
