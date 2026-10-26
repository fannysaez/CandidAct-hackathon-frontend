import { Routes } from '@angular/router';
import { Register } from './pages/register';

export const routes: Routes = [
  { path: 'register', component: Register },
  { path: '**', redirectTo: 'register' }
];