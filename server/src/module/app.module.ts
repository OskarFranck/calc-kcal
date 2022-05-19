import { MiddlewareConsumer, Module, NestMiddleware, NestModule } from '@nestjs/common';
import { PrismaService } from 'src/service/prisma.service';
import { ProductService } from 'src/service/product.service';
import { AppController, HealthController } from '../controllers/product.controller';
import { AppService } from '../service/app.service';
import { NutrientsService } from 'src/service/nutriants_service';
import { ProductDataService } from 'src/service/product_data.service';


@Module({
  imports: [],
  controllers: [AppController, HealthController],
  providers: [AppService, ProductService, NutrientsService, ProductDataService, PrismaService],
})
export class AppModule {};
