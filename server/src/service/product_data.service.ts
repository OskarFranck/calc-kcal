import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { product_data, Prisma } from "@prisma/client";

@Injectable()
export class ProductDataService {
    constructor(private prisma: PrismaService) { }

    async product_data(product_dataWhereUniqueInput: Prisma.product_dataWhereUniqueInput,): Promise<product_data | null> {
        return this.prisma.product_data.findUnique({
            where: product_dataWhereUniqueInput,
        });
    };
    async products_data(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.product_dataWhereUniqueInput;
        where?: Prisma.product_dataWhereInput;
        orderBy?: Prisma.product_dataOrderByWithRelationInput;
    }): Promise<product_data[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.product_data.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }
    // delete because not needed
    // async createproduct_data(data: Prisma.product_dataCreateInput): Promise<product_data> {
    //     return this.prisma.product_data.create({
    //         data,
    //     });
    // }

    // async updateproduct_data(params: {
    //     where: Prisma.product_dataWhereUniqueInput;
    //     data: Prisma.product_dataUpdateInput;
    // }): Promise<product_data> {
    //     const { where, data } = params;
    //     return this.prisma.product_data.update({
    //         data,
    //         where,
    //     });
    // }

    // async deleteproduct_data(where: Prisma.product_dataWhereUniqueInput): Promise<product_data> {
    //     return this.prisma.product_data.delete({
    //         where,
    //     });
    // }
};
