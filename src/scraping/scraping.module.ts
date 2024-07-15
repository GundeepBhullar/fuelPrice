import { Module } from '@nestjs/common';
import { ScrapingService } from './scraping.service';



@Module({
  imports: [],
  controllers: [],
  providers: [ScrapingService],
  exports: [ScrapingService]
})
export class ScrapingModule {}
