import { Controller, Get } from '@nestjs/common';
import { ScraperService } from './scraper.service';

@Controller('scrape')
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}

  @Get()
  async scrape() {
    const data = await this.scraperService.scrapeWebsite(
      'https://panelharga.badanpangan.go.id/',
    );
    return { data };
  }
}
