import { Routes } from '@angular/router';
import { GeneralCurrencysComponent } from './components/general-currencys/general-currencys.component';
import { UserLogComponent } from './components/user-log/user-log.component';
import { MyCurrencysComponent } from './components/my-currencys/my-currencys.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { CalculatorComponent } from './components/calculator/calculator.component';

export const routes: Routes = [
    {path: '',component: UserLogComponent},
    {path: 'welcome', component: WelcomeComponent},
    {path: 'generalCurrencys', component: GeneralCurrencysComponent},
    {path: 'myCurrencys', component: MyCurrencysComponent},
    {path: 'calculator', component: CalculatorComponent}
];