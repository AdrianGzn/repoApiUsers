import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  register(name: string, password: string): Observable<any> {
    let currency = '';
    let amount = 0;
    const user: User = { name, password, currency, amount };
    localStorage.setItem('user', JSON.stringify(user));

    return this.http.post(this.apiUrl, user);
  }

  login(name: string, password: string): Observable<User | null> {
    return this.http.get<{ status: boolean, data: User[] }>(`${this.apiUrl}`).pipe(
      map(response => {
        let user: User|null = null;

        for (let user of response.data) {
          if (user.name === name && user.password === password) {
            user = { name: user.name, password: user.password, currency: user.currency, amount: user.amount };
            break;
          }
        }
        
        if (user != null) {
          localStorage.setItem('user', JSON.stringify(user));
          return user;
        } else {
          return null;
        }
      })
    )
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}`, user);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  updateUser(id: string, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
