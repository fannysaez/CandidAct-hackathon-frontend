import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { API_URL } from './api_url';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

    register(data: { firstname: string; lastname: string; email: string; password: string }) {
    return this.http.post(`${API_URL}/api/register`, {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      plainPassword: data.password,
    });
  }

  login(email: string, password: string) {
    return this.http
      .post<{ token: string }>(`${API_URL}/auth`, { email, password })
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