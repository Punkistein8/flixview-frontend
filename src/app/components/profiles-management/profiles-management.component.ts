import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersLoginService } from 'src/app/services/users-login/users-login.service';
import { ProfilesServiceService } from 'src/app/services/profiles-service/profiles-service.service';
import { PlanServiceService } from 'src/app/services/plan-service/plan-service.service';
import { UsersRegisterService } from 'src/app/services/users-register.service';

@Component({
  selector: 'app-profiles-management',
  templateUrl: './profiles-management.component.html',
  styleUrls: ['./profiles-management.component.css'],
})
export class ProfilesManagementComponent {
  authenticatedUser: any = {};

  cantAddProfile = false;

  listOfPlans: any[] = [];

  constructor(
    private authService: UsersLoginService,
    private router: Router,
    private toastr: ToastrService,
    private profilesService: ProfilesServiceService,
    private planService: PlanServiceService,
    private usersRegisterService: UsersRegisterService
  ) {
    this.authService.isAuthenticated();
  }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      // redirect to login view
      this.router.navigate(['/users-login']);
      this.toastr.error('You must login first!', 'Error');
    } else {
      this.authenticatedUser = this.authService.getAuthenticatedUser();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/users-login']);
    this.toastr.success('User logged out successfully!', 'Success');
  }

  checkIfUserCanAddProfile() {
    this.profilesService
      .checkIfUserCanAddProfile(this.authenticatedUser)
      .subscribe(
        (res) => {
          console.log(res);
          if (!res.error) {
            // this.router.navigate(['/profiles-add']);
            this.toastr.success(res.message, 'Success');
            this.cantAddProfile = false;
          } else {
            this.toastr.error(res.message, 'Error');
            this.cantAddProfile = true;
            this.getAllPlans();
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getAllPlans() {
    this.planService.getAllPlans().subscribe(
      (res) => {
        console.log(res.length);
        if (res.length > 0) {
          this.listOfPlans = res;
        } else {
          this.toastr.error(res.message, 'Error');
        }
        console.log(this.listOfPlans);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  assignPlanToUser(fk_id_pla: number) {
    const data = {
      id_use: this.authenticatedUser.id_use,
      fk_id_pla: fk_id_pla,
    };
    this.usersRegisterService.assignPlanToUser(data).subscribe(
      (res) => {
        console.log(res);
        if (!res.error) {
          this.toastr.success(res.message, 'Success');
          
        } else {
          this.toastr.error(res.message, 'Error');
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
