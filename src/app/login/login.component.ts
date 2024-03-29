import { MessageService } from 'primeng/api';
import { UserDTO } from '../models/user.model';
import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  valCheck: string[] = ['remember'];

  password!: string;
  username!: string;
  email ! : string
  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}
  loginIn() {
    const userDto = {} as UserDTO;
    userDto.email = this.email;
    userDto.password = this.password;
    
    this.authService.loginUser(userDto).subscribe({
      next: (res) => {
        this.authService.setToken(res.access_token)
        this.authService.storeCurrentUser()
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: userDto.email + ' Logged In Successfully',
          life: 3000,
        });
      },
      error: (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Something went wrong',
          detail: error.error.exception,
          life: 3000,
        });
      },
      complete: () => {
        this.router.navigate(["/dashboard"])

      },
    });
  }
}
