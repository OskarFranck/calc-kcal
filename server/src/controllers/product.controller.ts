
import {
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { NutrientsService } from 'src/service/nutriants_service';
import { AppService } from 'src/service/app.service';
import { product as Product_Model, nutrients as Nutrients_Model, product_data as Product_Data_Model } from '@prisma/client';
import { calcDto } from 'src/dto/calcDto';
import { kcalPerGramAndCategory } from 'src/consts/KcalPerGramAndCategory';

@Controller('/api')
export class AppController {
  constructor(
    private readonly ProductService: ProductService,
    private readonly NutrientsService: NutrientsService,
  ) {}

  @Post('weight-calculate')
  @HttpCode(200)
  async getWeightCalculate(@Body() calcDto: calcDto): Promise<any> {

    function calculateWeights(productsToCalculate: Array<any>, kcalGoal: number){
      let productsWithProtein: Array<object> = [];
      let productsWithCarbs: Array<object> = [];
      let productsWithFiber: Array<object> = [];
      let productsWithFat: Array<object> = [];
      let totalAmoutOfKacl: Array<Array<object>> = [];

      productsToCalculate.forEach(product => product.forEach((nutrient: any) => {
        if (nutrient.nutrients_name.includes("Protein")) productsWithProtein.push(nutrient);
        if (nutrient.nutrients_name.includes("Kolhydrater")) productsWithCarbs.push(nutrient);
        if (nutrient.nutrients_name.includes("Fibrer")) productsWithFiber.push(nutrient);
        if (nutrient.nutrients_name.includes("Fett")) productsWithFat.push(nutrient);
      }))

      let carbsKcal: Array<object> = [];
      let proteinKcal: Array<object> = [];
      let fiberKcal: Array<object> = [];
      let fatKcal: Array<object> = [];

      productsWithCarbs.forEach((item: any) => {
        carbsKcal.push({item: item , "kcal":((item.value * kcalPerGramAndCategory.carbs / 100) * kcalGoal)});
      });

      productsWithFiber.forEach((item: any) => {
        fiberKcal.push({item: item , "kcal":((item.value * kcalPerGramAndCategory.fiber / 100) * kcalGoal)});
      });

      productsWithProtein.forEach((item: any) => {
        proteinKcal.push({item: item , "kcal":((item.value * kcalPerGramAndCategory.protein / 100) * kcalGoal)});
      });

      productsWithFat.forEach((item: any) => {
        fatKcal.push({item: item , "kcal":((item.value * kcalPerGramAndCategory.fat / 100) * kcalGoal)});
      });
      totalAmoutOfKacl.push(proteinKcal, fiberKcal, carbsKcal, fatKcal);

      return totalAmoutOfKacl;
    }

    const requestBody = calcDto;
    let productData: any;
    const kcalGoal = requestBody.calories;
    
    productData = await this.ProductService.products({
      where: {
        name: {in: requestBody.ingredients},
      },
    });
    let usedIngr = productData.map((x: any) => x.product_data.filter((x: Product_Data_Model) => 
      x.nutrients_name.includes("Protein")
      || x.nutrients_name.includes("Salt")
      || x.nutrients_name.includes("Energi (kcal)")
      || x.nutrients_name.includes("Kolhydrater")
      || x.nutrients_name.length == 4 && x.nutrients_name.includes("Fett")
      || x.nutrients_name.includes("Fibrer")
    ));

    const test = usedIngr.map((e: any) => e.filter((c: any) => c.value > 0))

    return calculateWeights(test, kcalGoal);

  };




  @Get('calculate')
  async getCalculate(@Body() calcDto: calcDto): Promise<any> {

    function calculateWeights(productsToCalculate: Array<any>, kcalGoal: number, nutrientsSplit: object){
      let productsWithProtein: Array<object> = [];
      let productsWithCarbs: Array<object> = [];
      let productsWithFiber: Array<object> = [];
      let productsWithFat: Array<object> = [];
      let totalAmoutOfKacl: Array<object> = [];


      productsToCalculate.forEach(product => product.forEach((nutrient: any) => {
        if (nutrient.nutrients_name.includes("Protein")) productsWithProtein.push(nutrient);
        if (nutrient.nutrients_name.includes("Kolhydrater")) productsWithCarbs.push(nutrient);
        if (nutrient.nutrients_name.includes("Fibrer")) productsWithFiber.push(nutrient);
        if (nutrient.nutrients_name.includes("Fett")) productsWithFat.push(nutrient);
        
      }))


      let carbsKcal: Array<object> = [];
      let proteinKcal: Array<object> = [];
      let fiberKcal: Array<object> = [];
      productsWithCarbs.forEach((item: any) => {
        carbsKcal.push({item: item , "kcal":(item.value * kcalPerGramAndCategory.carbs)});
      });

      productsWithFiber.forEach((item: any) => {
        fiberKcal.push({item: item , "kcal":(item.value * kcalPerGramAndCategory.fiber)});
      });

      productsWithProtein.forEach((item: any) => {
        proteinKcal.push({item: item , "kcal":(item.value * kcalPerGramAndCategory.protein)});
      });

      //console.log(nutrientsSplit)
      totalAmoutOfKacl.push(proteinKcal, fiberKcal, carbsKcal);

      return totalAmoutOfKacl;

    }

    function mealPlans(mealPlan: number) {
      if (mealPlan === 1) {
        let kcalFromCarbs = kcalGoal * 0.4;
        let kcalFromProtein = kcalGoal * 0.2;
        let kcalFromFiber = kcalGoal * 0.4;

        return {
          kcalFromCarbs: kcalFromCarbs,
          kcalFromProtein: kcalFromProtein,
          kcalFromFiber: kcalFromFiber
        };
      }
      if (mealPlan === 2) {
        return {message: "Does not yet exists"}
      }
      if (mealPlan === 3) {
        return {message: "Does not yet exists"}
      }
    }

    const requestBody = calcDto;
    let productData: any;
    const kcalGoal = requestBody.calories;
    const mealPlan = requestBody.mealPlan;

    let totalKcal: number
    let totalProtein: number
    let totatFat: number
    let totalCarbs: number
    let totalFiber: number
    
    productData = await this.ProductService.products({
      where: {
        name: {in: requestBody.ingredients},
      },
    });
    let usedIngr = productData.map((x: any) => x.product_data.filter((x: Product_Data_Model) => 
      x.nutrients_name.includes("Protein")
      || x.nutrients_name.includes("Salt")
      || x.nutrients_name.includes("Energi (kcal)")
      || x.nutrients_name.includes("Kolhydrater")
      || x.nutrients_name.length == 4 && x.nutrients_name.includes("Fett")
      || x.nutrients_name.includes("Fibrer")
    ));
    //console.log(usedIngr);


    const test = usedIngr.map((e: any) => e.filter((c: any) => c.value > 0))
    console.log(test)

    const nutrientsSplit = mealPlans(mealPlan);

    return calculateWeights(test, kcalGoal, nutrientsSplit);

  };














  @Get('product/:name')
  async getPostById(@Param('name') name: string): Promise<Product_Model> {
    return this.ProductService.product({ name: String(name)}, {product_name: String(name) });
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

  @Get('products-all')
  async getAllProducts(): Promise<Product_Model[]> {
    return this.ProductService.allProducts() 
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
