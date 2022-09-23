import { AuthMiddleware } from './auth.middleware';
import { BirdhouseController } from './birdhouse.controller';
import { BirdhouseService } from './birdhouse.service';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { idValidateMiddleware } from './idValidate.middleware';
import { LoggingMiddleware } from './logging.middleware';

@Module({
  providers: [BirdhouseService],
  controllers: [BirdhouseController],
  exports: [BirdhouseService],
})
export class BirdhouseModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware, idValidateMiddleware)
      .forRoutes(
        { path: 'house/:id', method: RequestMethod.GET },
        { path: 'house/:id', method: RequestMethod.PATCH },
        { path: 'house/:id/residency', method: RequestMethod.POST },
      )
      .apply(LoggingMiddleware)
      .forRoutes('*');
  }
}
