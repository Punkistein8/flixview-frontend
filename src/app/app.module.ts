import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersRegisterComponent } from './components/users-register/users-register.component';
import { UsersLoginComponent } from './components/users-login/users-login.component';
import { ProfilesManagementComponent } from './components/profiles-management/profiles-management.component';
import { PlanManagementComponent } from './components/plan-management/plan-management.component';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { AccountManagementComponent } from './components/account-management/account-management.component';
import { PaymentManagementComponent } from './components/payment-management/payment-management.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    UsersRegisterComponent,
    UsersLoginComponent,
    ProfilesManagementComponent,
    PlanManagementComponent,
    MoviesListComponent,
    AccountManagementComponent,
    PaymentManagementComponent,
    AdminPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
