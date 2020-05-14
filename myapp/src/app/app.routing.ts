import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';
import { AppComponent }          from './app.component';
import { IndexComponent }        from './app.index';
import { RegisterComponent }        from './app.register';
import { LoginComponent }        from './app.login';
import { AdminComponent }        from './app.admin';
import { ProductsComponent }        from './app.products';
import { ManageComponent }        from './app.manage';
import { UpdateComponent }       from './app.update';
import { PageDefault }           from './app.pagedefault';

const appRoutes: Routes = [
  { path: 'index', component: IndexComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'products', component: ProductsComponent },
  {path: 'manage', component: ManageComponent },
  {path: 'update/:id', component: UpdateComponent },
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: '**', component: PageDefault }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
