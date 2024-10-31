import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { CurrencyLatestBaseTo } from '../models/currency-latest-base-to';
import { CurrencyHistorical } from '../models/currency-historical';

@Injectable({
  providedIn: 'root'
})
export class CurrencysService {
  constructor(readonly httpClient:HttpClient) { }
  private url = 'https://api.frankfurter.app';

  getCurrencyForDates(dateStart: string, dateEnd: string, base: string, symbols: string): Observable<any> {
    let urlModified = `${this.url}/${dateStart}..${dateEnd}?base=${base}&symbols=${symbols}`;
    return this.httpClient.get<CurrencyHistorical>(urlModified).pipe(
      catchError((error: Error) => {return of('Error handled: ' + error.message)})
    );
  }

  convert(base: string, to: string, amount: number): Observable<number | any> {
    const urlModified = `${this.url}/2024-10-28?base=${base}&symbols=${to}`;
    
    return this.httpClient.get<CurrencyLatestBaseTo>(urlModified).pipe(
      map((item: CurrencyLatestBaseTo) => {
        const rate = item.rates[to];
        return rate * amount;
      }),
      catchError((error: Error) => {
        return of('Error handled: ' + error.message)
    })
    );
  }
}