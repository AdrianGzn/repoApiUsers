import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { OnInit } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit{
  name: string = ''

  ngOnInit(): void {
    let user = localStorage.getItem('user');
    if (user) {
      let userData: User | any = JSON.parse(user);
      this.name = userData.name;
      console.log(this.name);
    }    
  }

}
