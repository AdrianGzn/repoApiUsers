import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  constructor(private router: Router, private userService: UserService) {}

  endSesion(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  deleteAccount(): void {
    let userData = localStorage.getItem('user');
    if (!userData) {
      alert('No se encontró información de usuario.');
      return;
    }
    
    let user = JSON.parse(userData);
    let id_user = user.id_user;

    this.userService.deleteUser(id_user).subscribe({
      next: (item) => {
        if (item) {
          localStorage.removeItem('user');
          alert('Eliminación de cuenta exitoso');
          this.router.navigate(['/']);
        } else {
          console.log('No se pudo eliminar la cuenta');
          
        }
      },
      error: (err) => {console.log(err);}
    });
  }

}
