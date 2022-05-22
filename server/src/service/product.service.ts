import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { product, Prisma } from "@prisma/client";

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) { }

    async product(productWhereUniqueInput: Prisma.productWhereUniqueInput, product_dataWhereInput: Prisma.product_dataWhereInput): Promise<product | null> {
        return this.prisma.product.findUnique({
            where: productWhereUniqueInput,
            include: {
                product_data: {
                    where: product_dataWhereInput,
                    include: {
                        nutrients: true
                    }
                }
            }
        });
    };
    async products(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.productWhereUniqueInput;
        where?: Prisma.productWhereInput;
        orderBy?: Prisma.productOrderByWithRelationInput;
    }): Promise<product[]> {
        const { skip, take, cursor, where, orderBy } = params;
        const prodName: any = params.where.name;
        return this.prisma.product.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include: {
                product_data: {
                    where: {
                        product_name: prodName
                    },
                    include: {
                        nutrients: true
                    }
                }
            }
        });
    }

    async allProducts() {
        return this.prisma.product.findMany({
            where:{}
        })
    }

    async createproduct(data: Prisma.productCreateInput): Promise<product> {
        return this.prisma.product.create({
            data,
        });
    }

    async updateproduct(params: {
        where: Prisma.productWhereUniqueInput;
        data: Prisma.productUpdateInput;
    }): Promise<product> {
        const { where, data} = params;
        return this.prisma.product.update({
            data,
            where,
        });
    }

    async deleteproduct(where: Prisma.productWhereUniqueInput): Promise<product> {
        return this.prisma.product.delete({
            where,
        });
    }
};
