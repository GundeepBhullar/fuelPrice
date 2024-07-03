import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { FuelModule } from './fuel/fuel.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fuel } from './fuel/entities/fuel.entity';

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
    
  }),FuelModule],
  controllers: [AppController],
  providers: [],
  
})
export class AppModule {}
