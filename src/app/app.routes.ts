import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomePage),
  },
  {
    path: 'category/:categoryId',
    loadComponent: () => import('./pages/category/category.component').then((m) => m.CategoryPage),
  },
  {
    path: 'create-task',
    loadComponent: () => import('./pages/create-task/create-task.component').then((m) => m.CreateTaskPage),
  },
  {
    path: 'create-category',
    loadComponent: () => import('./pages/create-category/create-category.component').then((m) => m.CreateCategoryPage),
  },
  {
    path: 'edit-category/:categoryId',
    loadComponent: () => import('./pages/create-category/create-category.component').then((m) => m.CreateCategoryPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
