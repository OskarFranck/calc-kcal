import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { nutrients, Prisma } from "@prisma/client";

@Injectable()
export class NutrientsService {
    constructor(private prisma: PrismaService) { }

    async nutrient(nutrientsWhereUniqueInput: Prisma.productWhereUniqueInput,): Promise<nutrients | null> {
        return this.prisma.nutrients.findUnique({
            where: nutrientsWhereUniqueInput,
        });
    };
    async nutrients(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.nutrientsWhereUniqueInput;
        where?: Prisma.nutrientsWhereInput;
        orderBy?: Prisma.nutrientsOrderByWithRelationInput;
    }): Promise<nutrients[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.nutrients.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

};