import { Injectable } from "@nestjs/common";
import { FuelService } from "./fuel.service";
import { Cron, CronExpression } from "@nestjs/schedule";


@Injectable()
export class FuelPriceUpdateScheduler {
    constructor(private readonly fuelService: FuelService) {}

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async updateFuelPricesDaily() {
        try {
            await this.fuelService.updateFuelPricesFromWebsite();
        } catch (error) {
            console.error('Error updating fuel prices', error);
        }
    }
}