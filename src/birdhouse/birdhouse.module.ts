import { PruneMiddleware } from './middleware/prune.middleware';
import { AuthMiddleware } from './middleware/auth.middleware';
import { BirdhouseController } from './birdhouse.controller';
import { BirdhouseService } from './birdhouse.service';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { idValidateMiddleware } from './middleware/idValidate.middleware';
import { LoggingMiddleware } from './middleware/logging.middleware';

// Time for some "voo-doo magic".
@Module({
  providers: [BirdhouseService],
  controllers: [BirdhouseController],
  exports: [BirdhouseService],
})

// Create our module and export it
export class BirdhouseModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      // Ensure these endpoints are authenticated
      .apply(AuthMiddleware, idValidateMiddleware)
      .forRoutes(
        { path: 'house/:id', method: RequestMethod.GET },
        { path: 'house/:id', method: RequestMethod.PATCH },
        { path: 'house/:id/residency', method: RequestMethod.POST },
      )
      // Log *any* requests made
      .apply(LoggingMiddleware, PruneMiddleware)
      .forRoutes('*');
  }
}
