import { Controller, Get } from '@nestjs/common';
import { AppService } from '../app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Object {
    return this.appService.getHello();
  }
}

@Controller('data')
export class dataController {
  @Get()
  getData(): String {
    return 'test data';
  };
};
