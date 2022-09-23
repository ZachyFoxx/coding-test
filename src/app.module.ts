import { BirdhouseModule } from './birdhouse/birdhouse.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

@Module({
  imports: [BirdhouseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
