import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAdminComponent } from './components/add-admin/add-admin.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AdminsComponent } from './components/admins/admins.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CustomersComponent } from './components/customers/customers.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductsComponent } from './components/products/products.component';
import { AdminGuard } from './guards/admin.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path: 'Login', component: LoginComponent, canActivate: [LoginGuard]},
  {path: 'Admin', 
    canActivate: [AdminGuard],
    children: [
      {path: 'Dashboard', component: DashboardComponent},
      {path: 'Categories', component: CategoriesComponent},
      {path: 'Products', component: ProductsComponent},
      {path: 'Customers', component: CustomersComponent},
      {path: 'Orders', component: OrdersComponent},
      {path: 'Admins', component: AdminsComponent},
      {path: 'AddCategory', component: AddCategoryComponent},
      {path: 'AddProduct', component: AddProductComponent},
      {path: 'AddAdmin', component: AddAdminComponent},
      {path: '', redirectTo: 'Dashboard', pathMatch: 'full'},
    ]
  },
  {path: '**', redirectTo: 'Admin'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
