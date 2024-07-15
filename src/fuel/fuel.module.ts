import { Module } from '@nestjs/common';
import { FuelService } from './fuel.service';
import { FuelController } from './fuel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fuel } from './entities/fuel.entity';
import { ScrapingModule } from 'src/scraping/scraping.module';
import { FuelPriceUpdateScheduler } from './fuel.scheduler';

@Module({
  imports: [TypeOrmModule.forFeature([Fuel]),
 ScrapingModule,
],
  controllers: [FuelController],
  providers: [FuelService, FuelPriceUpdateScheduler],
})
export class FuelModule {}
