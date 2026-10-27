import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  register(data: { firstname: string; lastname: string; email: string; password: string }) {
    return this.http.post('/api/register', data);
  }

  login(email: string, password: string) {
    return this.http
      .post<{ token: string }>('/auth', { email, password })
      .pipe(tap((res) => localStorage.setItem('token', res.token)));
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return !!this.getToken();
  }
}