// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserLoginComponent } from './components/user-login/user-login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: UserLoginComponent },
  { path: 'users', component: UserListComponent },
  { path: 'add', component: UserFormComponent },
  { path: 'edit/:id', component: UserFormComponent },
  { path: '**', component: PageNotFoundComponent },
];
