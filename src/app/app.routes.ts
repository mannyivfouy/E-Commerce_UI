import { Routes } from '@angular/router';
import { Auth } from './features/auth/auth/auth';
import { AdminLayout } from './features/admin/admin-layout/admin-layout';
import { ClientLayout } from './features/client/client-layout/client-layout';
import { authGuard } from './core/guards/auth-guard';

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
    canActivate: [authGuard],
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
        path: 'categories',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/admin/category/category-list/category-list').then(
                (m) => m.CategoryList,
              ),
          },
          {
            path: 'create',
            loadComponent: () =>
              import('./features/admin/category/category-form/category-form').then(
                (m) => m.CategoryForm,
              ),
          },
          {
            path: 'edit/:id',
            loadComponent: () =>
              import('./features/admin/category/category-form/category-form').then(
                (m) => m.CategoryForm,
              ),
          },
        ],
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./features/admin/order-list/order-list').then((m) => m.OrderList),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  {
    path: 'client',
    component: ClientLayout,
    canActivate: [authGuard],
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
