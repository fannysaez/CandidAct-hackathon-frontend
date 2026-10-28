import { Routes } from '@angular/router';
import { Register } from './pages/register';
import { Login } from './pages/login';
import { Dashboard } from './pages/dashboard';
import { authGuard } from './auth.guard';
import { DetailsComponent } from './pages/details/details.component';

export const routes: Routes = [
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: 'details/:id', component: DetailsComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' },
];