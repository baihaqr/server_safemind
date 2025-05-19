import { Injectable,Logger, OnApplicationBootstrap ,  } from '@nestjs/common';

@Injectable()
export class AppService {

 private readonly logger = new Logger(AppService.name);
 onApplicationBootstrap() {
    this.logger.log('✅ Database connected successfully via TypeORM!');
  }

  getHello(): string {
    return 'Hello World!';
  }
}
