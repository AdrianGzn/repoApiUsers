import { Component, OnInit } from '@angular/core';
import { CurrencysService } from '../../services/currencys.service';
import { MenuComponent } from '../menu/menu.component';
import { CurrencyHistorical } from '../../models/currency-historical';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-general-currencys',
  standalone: true,
  imports: [MenuComponent, NgApexchartsModule, CommonModule],
  templateUrl: './general-currencys.component.html',
  styleUrl: './general-currencys.component.css'
})
export class GeneralCurrencysComponent implements OnInit {
  constructor(readonly currencysService: CurrencysService) {}

  currencies: string[] = ['AUD', 'BGN', 'BRL', 'CAD', 'CHF', 'CNY', 'CZK', 'DKK', 'EUR', 'GBP', 'HKD', 'HUF', 'IDR', 'ILS', 'INR', 'ISK', 'JPY', 'KRW', 'MXN', 'MYR', 'NOK', 'NZD', 'PHP', 'PLN', 'RON', 'SEK', 'SGD', 'THB', 'TRY', 'ZAR'];

  chartsData: { [currency: string]: { date: string; value: number; }[] } = {};
  chartOptions: { [currency: string]: any } = {};

  ngOnInit(): void {
    this.currencies.forEach((currency) => {
      this.currencysService.getCurrencyForDates('2024-09-28', '2024-10-28', currency, 'USD').subscribe({
        next: (item: CurrencyHistorical) => {
          this.extractChartData(item, currency);
        },
        error: (err) => {
          console.log("Error fetching data for currency " + currency + ": " + err);
        }
      });
    });
  }

  private extractChartData(item: CurrencyHistorical, currency: string): void {
    const currencyData: { date: string; value: number; }[] = [];

    for (const date in item.rates) {
      const value = item.rates[date]['USD'];
      currencyData.push({ date, value });
    }

    this.chartsData[currency] = currencyData;
    this.setChartOptions(currency, currencyData);
  }

  private setChartOptions(currency: string, data: { date: string; value: number; }[]): void {
    this.chartOptions[currency] = {
      series: [
        {
          name: `${currency} Value`,
          data: data.map(d => d.value)
        }
      ],
      chart: {
        type: 'line',
        height: 350
      },
      xaxis: {
        categories: data.map(d => d.date)
      },
      title: {
        text: `Historial de valores de ${currency} en USD`,
        align: 'left'
      }
    };
  }
}
