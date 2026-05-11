import { z } from 'zod';
import { PrismaClient, CaregiverType } from '@prisma/client';

export type CaregiverDataType = z.infer<typeof Caregiver.type>;
export type CaregiverQueryType = z.infer<typeof Caregiver.queryType>;

export class Caregiver {
    private prismaClient: PrismaClient | null = null;

    static type = z.object({
        id: z.uuid().optional(),
        name: z.string().min(2).max(100),
        contact: z.string(),
        type: z.enum(CaregiverType),
        
        createDate: z.date().optional(),
        updateDate: z.date().optional(),
        deleted: z.boolean().optional()
    });

    static queryType = Caregiver.type.extend({
        orderBy: Caregiver.type.keyof(),
        order: z.enum(['asc', 'desc']).default('asc'),
        page: z.number().default(0),
    }).partial();

    constructor(database: PrismaClient) {
        this.prismaClient = database;
    }

    async insertOne(queryData: CaregiverDataType): Promise<string> {
        if (!this.prismaClient) throw new Error('Database not attached');

        const caregiver = await this.prismaClient.caregiver.create({
            data: {
                ...queryData,
                createDate: new Date(),
                updateDate: new Date(),
                deleted: false
            }
        });

        return caregiver.id;
    }

    async getOneById(id: string): Promise<CaregiverDataType> {
        if (!this.prismaClient) throw new Error('Database not attached');

        const caregiver = await this.prismaClient.caregiver.findUnique({
            where: { id },
        });

        if (!caregiver) throw new Error('Caregiver not found');

        return caregiver;
    }

    async getAll(query: CaregiverQueryType): Promise<CaregiverDataType[]> {
        if (!this.prismaClient) throw new Error('Database not attached');

        const orderBy = query.orderBy ?? 'name';
        const order = query.order ?? 'asc';

        return await this.prismaClient.caregiver.findMany({
            orderBy: {
                [orderBy]: order,
            },
        });
    }

    async updateOne(id: string, queryData: CaregiverDataType): Promise<string> {
        if (!this.prismaClient) throw new Error('Database not attached');

        const caregiver = await this.prismaClient.caregiver.update({
            where: { id },
            data: {
                ...queryData,
                updateDate: new Date()
            }
        });

        return caregiver.id;
    }

    async deleteOne(id: string): Promise<string> {
        if (!this.prismaClient) throw new Error('Database not attached');

        const caregiver = await this.prismaClient.caregiver.delete({
            where: { id },
        });

        return caregiver.id;
    }
}