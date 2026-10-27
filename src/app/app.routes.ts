import { Routes } from '@angular/router';
import { Register } from './pages/register';
import { Login } from './pages/login';
import { Dashboard } from './pages/dashboard';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' },
];