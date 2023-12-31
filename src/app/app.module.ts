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
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { RoleComponentComponent } from './components/admin-page/role-component/role-component/role-component.component';
import { PlanComponentComponent } from './components/admin-page/plan-component/plan-component/plan-component.component';
import { UserflixComponentComponent } from './components/admin-page/userflix-component/userflix-component/userflix-component.component';
import { FamilyMoviesComponent } from './components/movies-list/family-component/family-movies/family-movies.component';
import { HorrorMoviesComponent } from './components/movies-list/horror-component/horror-movies/horror-movies.component';
import { CartoonMoviesComponent } from './components/movies-list/cartoon-component/cartoon-movies/cartoon-movies.component';

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
    RoleComponentComponent,
    PlanComponentComponent,
    UserflixComponentComponent,
    FamilyMoviesComponent,
    HorrorMoviesComponent,
    CartoonMoviesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    TooltipModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
