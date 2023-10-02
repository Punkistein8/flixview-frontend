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
import { UsersRegisterService } from 'src/app/services/users-register.service';

@Component({
  selector: 'app-users-register',
  templateUrl: './users-register.component.html',
  styleUrls: ['./users-register.component.css'],
})
export class UsersRegisterComponent {
  newUserForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute,
    private userRegisterService: UsersRegisterService
  ) {
    this.newUserForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      age: new FormControl('', [Validators.required, Validators.min(13)]),
      state_use: new FormControl('Active'),
    });
  }

  registerUser() {
    const user: User = {
      email: this.newUserForm.get('email')?.value,
      password: this.newUserForm.get('password')?.value,
      age: this.newUserForm.get('age')?.value,
      state_use: this.newUserForm.get('state_use')?.value,
    };

    this.userRegisterService.registerUser(user).subscribe(
      (res) => {
        // console.log(res);
        this.toastr.success('User registered successfully!', 'Success');
        this.router.navigate(['/']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
