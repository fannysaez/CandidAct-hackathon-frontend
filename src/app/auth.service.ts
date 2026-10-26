import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  register(data: { firstname: string; lastname: string; email: string; password: string }) {
    return this.http.post('/api/register', data);
  }
}