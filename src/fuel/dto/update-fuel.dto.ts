import { PartialType } from '@nestjs/mapped-types';
import { CreateFuelDto } from './create-fuel.dto';

export class UpdateFuelDto extends PartialType(CreateFuelDto) {
    state : string;
    petrolPrice : string;
    dieselPrice : string;
}
