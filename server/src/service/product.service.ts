import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { product, Prisma } from "@prisma/client";

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) { }

    // test to get nutrients with product (the badest way....)
    async product(productWhereUniqueInput: Prisma.productWhereUniqueInput,): Promise<product | null> {
        let test: any = productWhereUniqueInput.name;
        return this.prisma.product.findUnique({
            where: productWhereUniqueInput,
            include: {
                product_data: {
                    where: {
                        product_name: test
                    },
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
        return this.prisma.product.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
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
