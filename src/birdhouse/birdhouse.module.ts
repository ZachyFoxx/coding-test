import { AuthMiddleware } from './logging.middleware';
import { BirdhouseController } from './birdhouse.controller';
import { BirdhouseService } from './birdhouse.service';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

@Module({
  providers: [BirdhouseService],
  controllers: [BirdhouseController],
  exports: [],
})
export class BirdhouseModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('house/:birdhouse', 'house/:id', 'house/:id/residency');
  }
}
