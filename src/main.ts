import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FuelPriceUpdateScheduler } from './fuel/fuel.scheduler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const scheduler = app.get(FuelPriceUpdateScheduler);
  scheduler.updateFuelPricesDaily();
  await app.listen(3000);
}
bootstrap();
