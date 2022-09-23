import { BirdhouseModule } from './birdhouse/birdhouse.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [BirdhouseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
