import { Injectable } from '@nestjs/common';
import { CreateFuelDto } from './dto/create-fuel.dto';
import { UpdateFuelDto } from './dto/update-fuel.dto';
import { Repository } from 'typeorm';
import { Fuel } from './entities/fuel.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FuelService {

  constructor(@InjectRepository(Fuel) private readonly fuelRepository : Repository<Fuel>) {

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
