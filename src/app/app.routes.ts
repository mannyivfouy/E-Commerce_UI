import { Routes } from '@angular/router';
import { Auth } from './features/auth/auth/auth';
import { AdminLayout } from './features/admin/admin-layout/admin-layout';
import { ClientLayout } from './features/client/client-layout/client-layout';

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
        loadComponent: () =>
          import('./features/admin/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'users',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/admin/user/user-list/user-list').then((m) => m.UserList),
          },
          {
            path: 'create',
            loadComponent: () =>
              import('./features/admin/user/user-form/user-form').then((m) => m.UserForm),
          },
          {
            path: 'edit/:id',
            loadComponent: () =>
              import('./features/admin/user/user-form/user-form').then((m) => m.UserForm),
          },
        ],
      },
      {
        path: 'products',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/admin/product/product-list/product-list').then(
                (m) => m.ProductList,
              ),
          },
          {
            path: 'create',
            loadComponent: () =>
              import('./features/admin/product/product-form/product-form').then(
                (m) => m.ProductForm,
              ),
          },
          {
            path: 'edit/:id',
            loadComponent: () =>
              import('./features/admin/product/product-form/product-form').then(
                (m) => m.ProductForm,
              ),
          },
        ],
      },
      {
        path: 'categoty',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/admin/categoty/categoty-list/categoty-list').then(
                (m) => m.CategotyList,
              ),
          },
          {
            path: 'create',
            loadComponent: () =>
              import('./features/admin/categoty/categoty-form/categoty-form').then(
                (m) => m.CategotyForm,
              ),
          },
          {
            path: 'edit/:id',
            loadComponent: () =>
              import('./features/admin/categoty/categoty-form/categoty-form').then(
                (m) => m.CategotyForm,
              ),
          },
        ],
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  {
    path: 'client',
    component: ClientLayout,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./features/client/home/home').then((m) => m.Home),
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];
