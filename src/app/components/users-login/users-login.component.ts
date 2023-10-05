import { Component } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/User';
import { UsersLoginService } from 'src/app/services/users-login/users-login.service';
@Component({
  selector: 'app-users-login',
  templateUrl: './users-login.component.html',
  styleUrls: ['./users-login.component.css'],
})
export class UsersLoginComponent {
  validateLoginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute,
    private userLoginService: UsersLoginService
  ) {
    this.validateLoginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  onLogin() {
    const user: User = {
      email: this.validateLoginForm.get('email')?.value,
      password: this.validateLoginForm.get('password')?.value,
    };
    this.userLoginService.onLogin(user).subscribe(
      (res) => {
        this.toastr.success(res.message, 'Success');
        localStorage.setItem('user', JSON.stringify(res.data));
        const { type } = res.data.fk_id_rol;
        if (type === 'Admin') {
          this.router.navigate(['/admin-page']);
        } else {
          this.router.navigate(['/profiles-management']);
        }
      },
      (err) => {
        this.toastr.error(err.error.message, 'Error');
      }
    );
  }
}
