import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User, ApiResponse } from '../models/user';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users/';

  constructor(private http: HttpClient) {}

  register(name: string, password: string): Observable<any> {
    const user: User = { name, password, currency: '', amount: 0 };
    localStorage.setItem('user', JSON.stringify(user));

    return this.http.post(`${this.apiUrl}/post`, user).pipe(
      catchError(error => {
        console.error('Error al registrar el usuario', error);
        throw error;
      })
    );
  }

  login(name: string, password: string): Observable<User | null> {
    return this.http.get<ApiResponse>(this.apiUrl).pipe(
      map(response => {
        const users = response.data;
        const user = users.find(user => user.name === name && user.password === password) || null;
        
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
        }
        
        return user;
      }),
      catchError(error => {
        console.error('Error al obtener todos los usuarios', error);
        throw error;
      })
    );
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error al obtener todos los usuarios', error);
        throw error;
      })
    );
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Error al obtener el usuario con ID ${id}`, error);
        throw error;
      })
    );
  }

  updateUser(id: string, user: User): Observable<User> {
    return this.http.put<{status: boolean, data: any}>(`${this.apiUrl}/${id}`, user).pipe(
      tap((response) => {
        let userData: any = {id_user: response.data.id ,name: response.data.name, password: response.data.password, currency: response.data.currency, amount: response.data.amount} 
        localStorage.setItem('user', JSON.stringify(userData));      
      }),
      map(response => response.data),
      catchError(error => {
        console.error(`Error al actualizar el usuario con ID ${id}`, error);
        throw error;
      })
    );
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Error al eliminar el usuario con ID ${id}`, error);
        throw error;
      })
    );
  }
}
