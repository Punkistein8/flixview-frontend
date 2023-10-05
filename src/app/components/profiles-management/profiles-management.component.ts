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

  listOfPlans: any[] = [];

  listOfProfiles: any[] = [];

  newProfileForm: FormGroup;

  // condicionales para mostrar los modales
  tienePlan: boolean = false;

  tituloModal = '';

  constructor(
    private authService: UsersLoginService,
    private router: Router,
    private toastr: ToastrService,
    private profilesService: ProfilesServiceService,
    private planService: PlanServiceService,
    private usersRegisterService: UsersRegisterService
  ) {
    this.permitirEstarAqui();
    //seteando el usuario de la bd en el local storage
    this.setUpdatedAuthenticatedUser();
    //obteniendo el usuario autenticado
    this.authenticatedUser = this.getAuthenticatedUser();

    this.newProfileForm = new FormGroup({
      name_pro: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  permitirEstarAqui() {
    if (!this.authService.isAuthenticated()) {
      // redirect to login view
      this.router.navigate(['/users-login']);
      this.toastr.error('You must login first!', 'Error');
    }
  }

  ngOnInit() {
    //obteniendo los perfiles de este usuario
    this.getProfilesListByUser();
    //obteniendo todos los planes
    this.getAllPlans();
    //saber si tiene plan
    this.saberSiTienePlan();
  }

  getAuthenticatedUser() {
    return this.authService.getAuthenticatedUser();
  }

  setUpdatedAuthenticatedUser(): any {
    this.authService.setUpdatedAuthenticatedUser();
  }

  getProfilesListByUser() {
    this.profilesService
      .getProfilesListByUser(this.authenticatedUser)
      .subscribe(
        (res) => {
          if (res.data.length > 0) {
            this.listOfProfiles = res.data;
            console.log('Profiles found for this user', this.listOfProfiles);
          } else {
            this.listOfProfiles = res.data;
            console.log('No profiles found for this user', this.listOfProfiles);
          }
        },
        (err) => {
          console.log('Error al obtener los perfiles de este usuario ->', err);
        }
      );
  }

  getAllPlans() {
    this.planService.getAllPlans().subscribe(
      (res) => {
        if (res.length > 0) {
          this.listOfPlans = res;
          console.log('Plans found', this.listOfPlans);
        } else {
          console.log('No plans found', this.listOfPlans);
        }
      },
      (err) => {
        console.log('Error al obtener los planes ->', err);
      }
    );
  }

  saberSiTienePlan(): any {
    const user = localStorage.getItem('user');
    if (!user) {
      return null;
    }
    const { fk_id_pla } = JSON.parse(user);

    if (fk_id_pla != null) {
      this.tienePlan = true;
    } else {
      this.tienePlan = false;
    }
  }

  clickModalPlan() {
    this.saberSiTienePlan();
    if (this.tienePlan) {
      this.tituloModal = 'Change plan';
    } else {
      this.tituloModal = 'Choose plan';
    }
  }

  clickModalProfile() {
    this.saberSiTienePlan();
    if (this.tienePlan) {
      this.tituloModal = 'Add profile';
    } else {
      this.tituloModal = 'Choose a plan first before adding a profile!';
      this.toastr.info("You don't have a plan yet!", 'Info');
    }
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
          this.getProfilesListByUser();
          this.newProfileForm.reset();
          this.setUpdatedAuthenticatedUser();
          this.authenticatedUser = this.getAuthenticatedUser();

          // setTimeout(() => {
          //   window.location.reload();
          // }, 500);
        }
      },
      (err) => {
        this.toastr.error(err.error.message, 'Error');
      }
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/users-login']);
    this.toastr.success('User logged out successfully!', 'Success');
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
          localStorage.setItem('user', JSON.stringify(res.data));
          this.setUpdatedAuthenticatedUser();
          this.saberSiTienePlan();
          this.authenticatedUser = this.getAuthenticatedUser();
          // setTimeout(() => {
          //   window.location.reload();
          // }, 500);
        } else {
          this.toastr.error(res.message, 'Error');
        }
      },
      (err) => {
        this.toastr.error(err, 'Error');
      }
    );
  }

  deleteProfileById(id_pro: number) {
    const profileToDelete = {
      id_pro: id_pro,
    };
    this.profilesService.deleteProfileById(profileToDelete).subscribe(
      (res) => {
        if (!res.error) {
          this.toastr.error(res.message, 'Deleted');
          this.getProfilesListByUser();
          this.newProfileForm.reset();
          this.setUpdatedAuthenticatedUser();
          this.authenticatedUser = this.getAuthenticatedUser();
          // setTimeout(() => {
          //   window.location.reload();
          // }, 500);
        }
      },
      (err) => {
        console.log('Error al eliminar el perfil ->', err);
        this.toastr.error(err, 'Error');
      }
    );
  }
}
