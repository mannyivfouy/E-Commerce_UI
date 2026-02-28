import { Routes } from '@angular/router';
import { Auth } from './features/auth/auth/auth';
import { AdminLayout } from './features/admin/admin-layout/admin-layout';
import { Dashboard } from './features/admin/dashboard/dashboard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: Auth,
  },
  {
    path: 'admin',
    component: AdminLayout,
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];
