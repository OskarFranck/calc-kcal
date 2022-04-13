
import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { NutrientsService } from 'src/service/nutriants_service';
import { AppService } from 'src/service/app.service';
import { ProductDataService } from 'src/service/product_data.service';
import { product as Product_Model, nutrients as Nutrients_Model, product_data as Product_Data_Model } from '@prisma/client';

@Controller('/api')
export class AppController {
  constructor(
    private readonly ProductService: ProductService,
    private readonly NutrientsService: NutrientsService,
    private readonly ProductDataService: ProductDataService,
  ) {}

  @Get('product/:name')
  async getPostById(@Param('name') name: string): Promise<Product_Model> {
    return this.ProductService.product({ name: String(name) });
  }

  @Get('products/:searchString')
  async getFilteredPosts(
    @Param('searchString') searchString: string,
  ): Promise<Product_Model[]> {
    return this.ProductService.products({
      where: {
        OR: [
          {
            name: { contains: searchString },
          },
          {
            main_group: { contains: searchString },
          },
        ],
      },
    });
  }

  @Get('group/:searchString')
  async getProductGroup(
    @Param('searchString') searchString: string,
  ): Promise<Product_Model[]> {
    return this.ProductService.products({
      where: {
        main_group: {
          contains: searchString
        },
      }
    })
  }

  @Get('nutrients')
  async getNutrients(): Promise<Nutrients_Model[]> {
    return this.NutrientsService.nutrients({
      where: {},
    });
  }
}

@Controller()
export class HealthController {
  constructor(
    private readonly AppService: AppService
  ) {}

  @Get('health')
  getHealth(): Object {
    return this.AppService.getHello();
  }
}

  // @Post('post')
  // async createDraft(
  //   @Body() postData: { name: string; number?: number; main_group: string, product_name: string },
  // ): Promise<Product_Model> {
  //   const { name, number, main_group, product_name } = postData;
  //   return this.ProductService.createproduct({
  //     name,
  //     number,
  //     main_group,
  //     product_data: {
  //       connect: { product_name: product_name },
  //     },
  //   });
  // }

  // @Post('user')
  // async signupUser(
  //   @Body() userData: { name?: string; email: string },
  // ): Promise<UserModel> {
  //   return this.userService.createUser(userData);
  // }

  // @Put('publish/:id')
  // async publishPost(@Param('id') id: string): Promise<Product_Model> {
  //   return this.ProductService.updateproduct({
  //     where: { id: Number(id) },
  //     data: { published: true },
  //   });
  // }

  // @Delete('post/:id')
  // async deletePost(@Param('id') id: string): Promise<Product_Model> {
  //   return this.ProductService.deleteproduct({ id: Number(id) });
  // }





// import { Controller, Get } from '@nestjs/common';
// import { AppService } from '../service/app.service';

// @Controller()
// export class AppController {
//   constructor(private readonly appService: AppService) {}

//   @Get()
//   getHello(): Object {
//     return this.appService.getHello();
//   }
// }

// @Controller('data')
// export class dataController {
//   @Get()
//   getData(): String {
//     return 'test data';
//   };
// };
