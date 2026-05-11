import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

export type RecordDataType = z.infer<typeof Record.type>;
export type RecordQueryType = z.infer<typeof Record.queryType>;

export class Record {
    private prismaClient: PrismaClient | null = null;

    static type = z.object({
        id: z.uuid().optional(),
        idUser: z.uuid(),
        timestamp: z.date(),
        heart_rate: z.number(),
        oxigen: z.number(),
        accel: z.number(),

        createDate: z.date().optional(),
        updateDate: z.date().optional(),
        deleted: z.boolean().optional()
    });

    static queryType = Record.type.extend({
        orderBy: Record.type.keyof(),
        order: z.enum(['asc', 'desc']).default('asc'),
        page: z.number().default(0),
    }).partial();

    constructor(database: PrismaClient) {
        this.prismaClient = database;
    }

    async insertOne(queryData: RecordDataType): Promise<string> {
        if (!this.prismaClient) throw new Error('Database not attached');

        const record = await this.prismaClient.record.create({
            data: {
                ...queryData,
                createDate: new Date(),
                updateDate: new Date(),
                deleted: false
            }
        });

        return record.id;
    }

    async getOneById(id: string): Promise<RecordDataType> {
        if (!this.prismaClient) throw new Error('Database not attached');

        const record = await this.prismaClient.record.findUnique({
            where: { id },
        });

        if (!record) throw new Error('Record not found');

        return record;
    }

    async getAll(query: RecordQueryType): Promise<RecordDataType[]> {
        if (!this.prismaClient) throw new Error('Database not attached');

        const orderBy = query.orderBy ?? 'timestamp';
        const order = query.order ?? 'asc';

        return await this.prismaClient.record.findMany({
            orderBy: {
                [orderBy]: order,
            },
        });
    }

    async updateOne(id: string, queryData: RecordDataType): Promise<string> {
        if (!this.prismaClient) throw new Error('Database not attached');

        const record = await this.prismaClient.record.update({
            where: { id },
            data: {
                ...queryData,
                updateDate: new Date()
            }
        });

        return record.id;
    }

    async deleteOne(id: string): Promise<string> {
        if (!this.prismaClient) throw new Error('Database not attached');

        const record = await this.prismaClient.record.delete({
            where: { id },
        });

        return record.id;
    }
}