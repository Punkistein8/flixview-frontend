import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersLoginService } from 'src/app/services/users-login/users-login.service';
import { ProfilesServiceService } from 'src/app/services/profiles-service/profiles-service.service';
import { PlanServiceService } from 'src/app/services/plan-service/plan-service.service';
import { UsersRegisterService } from 'src/app/services/users-register.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Profile } from 'src/app/models/Profile';

@Component({
  selector: 'app-profiles-management',
  templateUrl: './profiles-management.component.html',
  styleUrls: ['./profiles-management.component.css'],
})
export class ProfilesManagementComponent {
  authenticatedUser: any = {};

  cantAddProfile = true;

  listOfPlans: any[] = [];

  listOfProfiles: any[] = [];

  modalTitle = 'Add new profile';

  newProfileForm: FormGroup;

  constructor(
    private authService: UsersLoginService,
    private router: Router,
    private toastr: ToastrService,
    private profilesService: ProfilesServiceService,
    private planService: PlanServiceService,
    private usersRegisterService: UsersRegisterService
  ) {
    this.authService.isAuthenticated();

    // OJO
    this.authenticatedUser = this.authService.getAuthenticatedUser();
    // OJO

    this.newProfileForm = new FormGroup({
      name_pro: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });

    this.getProfilesListByUser();
  }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      // redirect to login view
      this.router.navigate(['/users-login']);
      this.toastr.error('You must login first!', 'Error');
    } else {
      this.authenticatedUser = this.authService.getAuthenticatedUser();
      this.checkIfUserCanAddProfile();
    }
  }

  getProfilesListByUser() {
    this.profilesService
      .getProfilesListByUser(this.authenticatedUser)
      .subscribe(
        (res) => {
          if (res.data.length > 0) {
            this.listOfProfiles = res.data;
          } else {
            console.log("You don't have profiles yet!");
          }
          console.log('Profiles: ', this.listOfProfiles);
        },
        (err) => {
          console.log('ERRORRR ->', err);
        }
      );
  }

  addNewProfile() {
    const newProfile: Profile = {
      name_pro: this.newProfileForm.get('name_pro')?.value,
      fk_id_use: this.authenticatedUser.id_use,
      contentType_pro: 'Familiar',
      state_pro: 'Active',
    };
    this.profilesService.addProfile(newProfile).subscribe(
      (res) => {
        if (!res.error) {
          this.toastr.success(res.message, 'Success');
          this.cantAddProfile = false;
          this.getProfilesListByUser();
          // setTimeout(() => {
          //   window.location.reload();
          // }, 500);
        }
      },
      (err) => {
        this.toastr.error(err.error.message, 'Error');
        console.log(err);
      }
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/users-login']);
    this.toastr.success('User logged out successfully!', 'Success');
  }

  checkIfUserCanAddProfile() {
    this.modalTitle = 'Add new profile';
    this.profilesService
      .checkIfUserCanAddProfile(this.authenticatedUser)
      .subscribe(
        (res) => {
          // console.log(res);
          if (!res.error) {
            // this.router.navigate(['/profiles-add']);
            // this.toastr.success(res.message, 'Success');
            this.cantAddProfile = false;
          } else {
            this.toastr.info(res.message, 'Info');
            this.cantAddProfile = true;
            this.getAllPlans();
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  changePlan() {
    this.toastr.info('Change Plan', 'Info');
    this.getAllPlans();
    this.modalTitle = 'Change Plan';
  }

  getAllPlans() {
    this.planService.getAllPlans().subscribe(
      (res) => {
        if (res.length > 0) {
          this.listOfPlans = res;
        } else {
          this.toastr.error(res.message, 'Error');
        }
        // console.log(this.listOfPlans);
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
        if (!res.error) {
          this.toastr.success(res.message, 'Success');
          this.cantAddProfile = false;
          localStorage.setItem('user', JSON.stringify(res.data));
          setTimeout(() => {
            window.location.reload();
          }, 500);
        } else {
          this.toastr.error(res.message, 'Error');
          this.cantAddProfile = true;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
