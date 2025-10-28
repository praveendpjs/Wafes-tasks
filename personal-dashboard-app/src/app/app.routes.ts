import { Routes } from '@angular/router';
import { Home } from './Components/home/home';
import { About } from './Components/about/about';
import { Contact } from './Components/contact/contact';
import { Login } from './Components/login/login';
import { Register } from './Components/register/register';
import { Dashboard } from './Components/dashboard/dashboard';
import { authGuard } from './Components/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard]},

  { path: '**', redirectTo: 'register' },

];
