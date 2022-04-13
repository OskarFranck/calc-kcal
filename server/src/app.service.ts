import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): Object {
    return {"msg": 'Hello World!'};
  }
  getData(): Object {
    return {"hej": "hej"};
  }
}
