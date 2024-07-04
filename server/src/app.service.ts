import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Anupat Kaewmee!!!!';
  }

  getHealth() {
    return "I'm healthy!";
  }
}
