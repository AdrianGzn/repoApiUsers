import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CurrencysService } from '../../services/currencys.service';
import { OnInit } from '@angular/core';
import { CurrencyHistorical } from '../../models/currency-historical';
import { NgApexchartsModule } from 'ng-apexcharts';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-currencys',
  standalone: true,
  imports: [MenuComponent, ReactiveFormsModule, NgApexchartsModule, CommonModule],
  templateUrl: './my-currencys.component.html',
  styleUrl: './my-currencys.component.css'
})
export class MyCurrencysComponent implements OnInit{
  userDataForm: FormGroup;
  currency: string = '';
  amount: number = 0;
  user: any;


  chartsData: { [currency: string]: { date: string; value: number; }[] } = {};
  chartOptions: { [currency: string]: any } = {};

  constructor(private formBuilder: FormBuilder, private userService: UserService, private currenciesService: CurrencysService) {
    this.userDataForm = this.formBuilder.group({
      currency: ['', Validators.required],
      amount: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    const usuarioData = localStorage.getItem('user');
    if (usuarioData) {
      this.user = JSON.parse(usuarioData);

      this.userDataForm.patchValue({
        currency: this.user.currency,
        amount: this.user.amount
      })

      this.currency = this.userDataForm.value.currency;
      this.currenciesService.getCurrencyForDates('2024-09-28', '2024-10-28', this.currency, 'USD').subscribe({
        next: (item: CurrencyHistorical) => {
          this.extractChartData(item, this.userDataForm.value.currency)
          
        },
        error: (err) => {
          console.log("Error fetching data for currency " + this.currency + ": " + err);
        }
      });
      
    } else {
      console.log('No hay datos de usuario en el localStorage');
    }
  }

  save(): void {   
    let dataOfUser: User = {name: this.user.name, password: this.user.password, currency: this.userDataForm.value.currency, amount: this.userDataForm.value.amount};    
    this.userService.updateUser(this.user.id_user, dataOfUser).subscribe({
      next: (item: User) => {
        console.log(localStorage.getItem('user'));
      },
      error: (err) => {
        console.log("Error fetching data of user " + this.user.name + ": " + err);
      }
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
