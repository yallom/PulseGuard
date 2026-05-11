import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

export type BraceletDataType = z.infer<typeof Bracelet.type>;
export type BraceletQueryType = z.infer<typeof Bracelet.queryType>;

export class Bracelet {
    private prismaClient: PrismaClient | null = null;

    static type = z.object({
        id: z.uuid().optional(),
        idUser: z.uuid(),
        fabrication_date: z.date(),

        createDate: z.date().optional(),
        updateDate: z.date().optional(),
        deleted: z.boolean().optional()
    });

    static queryType = Bracelet.type.extend({
        orderBy: Bracelet.type.keyof(),
        order: z.enum(['asc', 'desc']).default('asc'),
        page: z.number().default(0),
    }).partial();

    constructor(database: PrismaClient) {
        this.prismaClient = database;
    }

    async insertOne(queryData: BraceletDataType): Promise<string> {
        if (!this.prismaClient) throw new Error('Database not attached');

        const user = await this.prismaClient.bracelet.create({
            data: {
                ...queryData,
                createDate: new Date(),
                updateDate: new Date(),
                deleted: false
            }
        });

        return user.id;
    }

    async getOneById(id: string): Promise<BraceletDataType> {
        if (!this.prismaClient) throw new Error('Database not attached');

        const bracelet = await this.prismaClient.bracelet.findUnique({
            where: { id },
        });

        if (!bracelet) throw new Error('Bracelet not found');

        return bracelet;
    }

    async getAll(query: BraceletQueryType): Promise<BraceletDataType[]> {
        if (!this.prismaClient) throw new Error('Database not attached');

        const orderBy = query.orderBy ?? 'id';
        const order = query.order ?? 'asc';

        return await this.prismaClient.bracelet.findMany({
            orderBy: {
                [orderBy]: order,
            },
        });
    }

    async updateOne(id: string, queryData: BraceletDataType): Promise<string> {
        if (!this.prismaClient) throw new Error('Database not attached');

        const bracelet = await this.prismaClient.bracelet.update({
            where: { id },
            data: {
                ...queryData,
                updateDate: new Date()
            }
        });

        return bracelet.id;
    }

    async deleteOne(id: string): Promise<string> {
        if (!this.prismaClient) throw new Error('Database not attached');

        const bracelet = await this.prismaClient.bracelet.delete({
            where: { id },
        });

        return bracelet.id;
    }
}