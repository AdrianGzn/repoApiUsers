import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CurrencysService } from '../../services/currencys.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [MenuComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {
  convertData: FormGroup;
  base: string = '';
  to: string = '';
  amount: number = 0;
  result: number = 0;
  itemHistorial: {base: string, to: string, amount: number, result: number}={base: "", to:"", amount:0, result:0};
  historial: {base: string, to: string, amount: number, result: number}[] = [];

  constructor(readonly currencysService: CurrencysService) {
    this.convertData = new FormGroup({
      base: new FormControl(null, [Validators.required]),
      to: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(999999)])
    });
  }

  currencies: string[] = ['AUD', 'BGN', 'BRL', 'CAD', 'CHF', 'CNY', 'CZK', 'DKK', 'EUR', 'GBP', 'HKD', 'HUF', 'IDR', 'ILS', 'INR', 'ISK', 'JPY', 'KRW', 'MXN', 'MYR', 'NOK', 'NZD', 'PHP', 'PLN', 'RON', 'SEK', 'SGD', 'THB', 'TRY', 'USD', 'ZAR'];
  message: number = 0;

  calculate() {
    this.base = this.convertData.get('base')?.value;
    this.to = this.convertData.get('to')?.value;
    this.amount = this.convertData.get('amount')?.value;
        
    this.currencysService.convert(this.base, this.to, this.amount).subscribe({
      next: (item: number) => {
        this.message = item;
        this.result = item;
      },
      error: (err) => {
        console.log("Error fetching data for currency : " + err);
      }      
    });
    this.itemHistorial = {base: this.base, to: this.to, amount: this.amount, result: this.result};
    this.historial.push(this.itemHistorial);
    console.log(this.historial);
    
  }

}
