import { birdhouseDS } from './database/data-source';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  birdhouseDS.initialize().catch((err) => {
    console.log(
      `Unable to initialize database, is it configured correctly? \n${err}`,
    );
    process.exit(1);
  });

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
