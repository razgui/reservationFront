import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { UserDTO } from '../models/user.model';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  isChecked: boolean = false;
  username :string =""
  separateDialCode = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      password: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      mailAddress: ['', [Validators.required, Validators.email]],
    });
  }
  onSubmit() {
    const userDto = {} as UserDTO;
    this.username = this.registerForm.value.mailAddress
    userDto.email = this.registerForm.value.mailAddress;
    userDto.password = this.registerForm.value.password;
    userDto.lastname = this.registerForm.value.lastName;
    userDto.firstname = this.registerForm.value.firstName;
    userDto.role = 'ADMIN'

    this.authService.registerUser(userDto).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: this.username + ' Saved Successfully',
          life: 3000,
        });
        setTimeout(() => {
          this.router.navigate(['']);
        }, 1000);
      },
      error: (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message,
          life: 3000,
        });
      },
      complete: () => {
        setTimeout(() => {
          this.router.navigate(['']);
        }, 1000);
      },
    });
  }
  acceptTerms() {
    this.isChecked = !this.isChecked;
  }
}
