import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Role } from 'src/app/models/Role';
import { RolesServiceService } from 'src/app/services/roles-service/roles-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-role-component',
  templateUrl: './role-component.component.html',
  styleUrls: ['./role-component.component.css'],
})
export class RoleComponentComponent {
  roles: any[] = [];
  newRoleForm: FormGroup;
  constructor(
    private rolesService: RolesServiceService,
    private toastr: ToastrService
  ) {
    this.rolesService.getAllRoles().subscribe((res) => {
      this.roles = res.data;
    });
    this.newRoleForm = new FormGroup({
      type: new FormControl('', [Validators.required, Validators.minLength(2)]),
    });
  }

  getRoles() {
    this.rolesService.getAllRoles().subscribe((res) => {
      this.roles = res.data;
    });
  }

  addRole() {
    const newRole: Role = {
      type: this.newRoleForm.get('type')?.value,
    };
    this.rolesService.addRole(newRole).subscribe((res) => {
      console.log(res);
      this.toastr.success(res.message, 'Success');
      this.getRoles();
      setTimeout(() => {
        document.getElementById('closeModalBtn')?.click();
      }, 200);
    });
  }
}
