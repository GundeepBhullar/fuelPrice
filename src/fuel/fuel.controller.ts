import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FuelService } from './fuel.service';
import { CreateFuelDto } from './dto/create-fuel.dto';
import { UpdateFuelDto } from './dto/update-fuel.dto';

@Controller('fuel')
export class FuelController {
  constructor(private readonly fuelService: FuelService) {}

  @Post()
  create(@Body() createFuelDto: CreateFuelDto) {
    return this.fuelService.create(createFuelDto);
  }

  @Get()
  findAll() {
    return this.fuelService.findAll();
  }

  @Get(':state')
  findOne(@Param('state') state: string) {
    return this.fuelService.findOne(state);
  }

  @Patch(':state')
  update(@Param('state') state: string, @Body() updateFuelDto: UpdateFuelDto) {
    return this.fuelService.update(state, updateFuelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.fuelService.remove(+id);
  }
}
