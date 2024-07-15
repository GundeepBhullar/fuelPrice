import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { FuelModule } from './fuel/fuel.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fuel } from './fuel/entities/fuel.entity';
import { FuelService } from './fuel/fuel.service';
import { ScrapingService } from './scraping/scraping.service';
import { ScrapingModule } from './scraping/scraping.module';
import { FuelPriceUpdateScheduler } from './fuel/fuel.scheduler';

@Module({
  imports: [TypeOrmModule.forRoot({
    
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "post@123",
    database: "fueldb",
    entities: [Fuel],
    synchronize: true,
    logging: true,
    
  }),
  ScheduleModule.forRoot(),
  FuelModule,
  ScrapingModule
],
  controllers: [AppController],
  providers: [
    FuelService,
    FuelPriceUpdateScheduler
  ],
  
})
export class AppModule {}
