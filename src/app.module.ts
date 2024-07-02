import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FuelModule } from './fuel/fuel.module';

@Module({
  imports: [FuelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
