import { Injectable } from '@nestjs/common';
import { CreateFuelDto } from './dto/create-fuel.dto';
import { UpdateFuelDto } from './dto/update-fuel.dto';
import { Repository } from 'typeorm';
import { Fuel } from './entities/fuel.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ScrapingService } from 'src/scraping/scraping.service';

@Injectable()
export class FuelService {

  constructor(
    @InjectRepository(Fuel) private readonly fuelRepository : Repository<Fuel>,
    private readonly scrapingService: ScrapingService,

) {

  }

  async updateFuelPricesFromWebsite(): Promise<void> {
    try {
      const prices = await this.scrapingService.scrapePetrolPrices();

      for (const price of prices) {
        const { state, petrolPrice, dieselPrice } = price;

        //Update prices in the database
        let fuel = await this.fuelRepository.findOne({ where: { state } });

        if (!fuel) {
          fuel = new Fuel();
          fuel.state = state;
        }

        fuel.petrolPrice = petrolPrice;
        fuel.dieselPrice = dieselPrice;

        await this.fuelRepository.save(fuel);
      }

      console.log('Fuel prices updated successfully.');

    } catch (error) {
      console.error('Error updating fuel prices:', error);
      throw new Error('Failed to update fuel prices from website');
    }
  }


  create(createFuelDto: CreateFuelDto) {
    let fuel : Fuel = new Fuel();
    fuel.state = createFuelDto.state;
    fuel.petrolPrice = createFuelDto.petrolPrice;
    fuel.dieselPrice = createFuelDto.dieselPrice;
    return this.fuelRepository.save(fuel);
  }

  findAll() : Promise<Fuel[]> {
    return this.fuelRepository.find();
  }

  findOne(state : string) {
    return this.fuelRepository.findOne({where: {state}});
  }

  update(state : string, updateFuelDto: UpdateFuelDto) {
    let fuel : Fuel = new Fuel();
    fuel.state = updateFuelDto.state;
    fuel.petrolPrice = updateFuelDto.petrolPrice;
    fuel.dieselPrice = updateFuelDto.dieselPrice;
    fuel.state = state; 
    return this.fuelRepository.save(fuel);
  }

  remove(id : number) {
    return this.fuelRepository.delete(id);
  }
}
