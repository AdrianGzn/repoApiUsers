import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-log',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-log.component.html',
  styleUrl: './user-log.component.css'
})
export class UserLogComponent {
  authForm: FormGroup;
  errorMessage = '';

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.authForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogIn() {
    const name = this.authForm.get('name')?.value;
    const password = this.authForm.get('password')?.value;

    this.userService.login(name, password).subscribe({
      next: (user) => {
        if (user) {
          alert('Inicio de sesión exitoso');
          this.router.navigate(['/welcome']);
        } else {
          this.errorMessage = 'Credenciales incorrectas';
        }
      },
      error: (err) => this.errorMessage = err.error?.message || 'Error en el inicio de sesión'
    });
  }

  onRegister() {
    const name = this.authForm.get('name')?.value;
    const password = this.authForm.get('password')?.value;

    this.userService.register(name, password).subscribe({
      next: () => {
        alert('Registro exitoso');
        this.router.navigate(['/welcome']);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error?.message || 'Error en el registro';
      }
    });
    
  }
}
