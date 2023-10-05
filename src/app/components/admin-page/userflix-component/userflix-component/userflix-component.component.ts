import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProfilesServiceService } from 'src/app/services/profiles-service/profiles-service.service';
import { UserflixServiceService } from 'src/app/services/userflix-service/userflix-service.service';
@Component({
  selector: 'app-userflix-component',
  templateUrl: './userflix-component.component.html',
  styleUrls: ['./userflix-component.component.css'],
})
export class UserflixComponentComponent {
  users: any[] = [];

  profilesByUser: any[] = [];

  constructor(
    private toastr: ToastrService,
    private userService: UserflixServiceService,
    private profileService: ProfilesServiceService
  ) {
    this.userService.getAllUsers().subscribe((res) => {
      this.users = res.data;
    });
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data.data;
    });
  }

  getProfilesListByUser(id: any) {
    const user: any = {
      id_use: id,
    };
    this.profileService.getProfilesListByUser(user).subscribe(
      (res) => {
        this.profilesByUser = res.data;
      },
      (error) => {
        this.toastr.error(error.error.message, 'Error');
      }
    );
  }

  logicallyDeleteUser(id: number) {
    // preguntar con toastr
    const user: any = {
      state_use: 'Inactive',
    };
    this.userService.logicallyDeleteUser(id, user).subscribe(
      (res) => {
        console.log('ELIMINAR', res);
        this.toastr.error(res.message, 'Ok');
        this.getAllUsers();
      },
      (error) => {
        this.toastr.error(error.error.message, 'Error');
      }
    );
  }

  logicallyActivateUser(id: number) {
    // preguntar con toastr
    const user: any = {
      state_use: 'Active',
    };
    this.userService.logicallyDeleteUser(id, user).subscribe(
      (res) => {
        console.log('ACTIVAR', res);
        this.toastr.success('User actived successfully', 'Ok');
        this.getAllUsers();
      },
      (error) => {
        this.toastr.error(error.error.message, 'Error');
      }
    );
  }
}
