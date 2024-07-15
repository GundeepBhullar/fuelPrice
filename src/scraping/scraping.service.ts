import { Injectable } from "@nestjs/common";
import axios from "axios";
import * as cheerio from 'cheerio';


@Injectable()
export class ScrapingService {
    async fetchHTML(url: string): Promise<string> {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error('Error fetching HTML:', error);
            return null;
        }
    }

    async scrapePetrolPrices(): Promise<any[]> {
        const url = 'https://www.goodreturns.in/petrol-price.html';
        const html = await this.fetchHTML(url);

        if (!html) {
            console.error('Failed to fetch HTML');
            return [];
        }

        const $ = cheerio.load(html);
        const prices = [];
       
        // Not sure how the petrol prices are structured but we are assuming it as an table
        $('table.petrol-table tbody tr').each((index, element) => {
           const state = $(element).find('td:nth-child(1)').text().trim(); 
           const petrolPrice = $(element).find('td:nth-child(2)').text().trim();
           const dieselPrice = $(element).find('td:nth-child(3)').text().trim();
           
           prices.push({
            state,
            petrolPrice,
            dieselPrice
           });
        });

        console.log('Petrol prices:', prices);
        return prices;

    }
}