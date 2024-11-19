import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class ScraperService {
  async scrapeWebsite(
    url: string,
  ): Promise<{ province: string; price: string; disparity: string }[]> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle2' });

    const tableData = await page.evaluate(() => {
      const rows = Array.from(
        document.querySelectorAll<HTMLTableRowElement>(
          '#province-table-table tbody tr',
        ),
      );

      return rows.flatMap((row) => {
        const provinceCell = row.querySelector('th');
        const cells = row.querySelectorAll<HTMLTableCellElement>('td');

        if (provinceCell && cells.length > 1) {
          return {
            province: provinceCell.textContent.trim(),
            price: cells[0].textContent.trim(),
            disparity: cells[1].textContent.trim(),
          };
        }

        return [];
      });
    });

    await browser.close();
    return tableData;
  }
}
