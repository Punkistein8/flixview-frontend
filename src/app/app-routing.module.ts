import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersRegisterComponent } from './components/users-register/users-register.component';
import { UsersLoginComponent } from './components/users-login/users-login.component';
import { AccountManagementComponent } from './components/account-management/account-management.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { PaymentManagementComponent } from './components/payment-management/payment-management.component';
import { PlanManagementComponent } from './components/plan-management/plan-management.component';
import { ProfilesManagementComponent } from './components/profiles-management/profiles-management.component';

const routes: Routes = [
  {
    path: '',
    component: UsersLoginComponent,
  },
  {
    path: 'users-register',
    component: UsersRegisterComponent,
  },
  {
    path: 'account-management',
    component: AccountManagementComponent,
  },
  {
    path: 'admin-page',
    component: AdminPageComponent,
  },
  {
    path: 'movies-list',
    component: MoviesListComponent,
  },
  {
    path: 'payment-management',
    component: PaymentManagementComponent,
  },
  {
    path: 'plan-management',
    component: PlanManagementComponent,
  },
  {
    path: 'profiles-management',
    component: ProfilesManagementComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
