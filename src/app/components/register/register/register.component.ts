import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegistrationRequest } from '../../../models/user-registration-request';
import { Router } from '@angular/router';
import { UserService } from '../../../services/users/user.service';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { AuthenticationRequest } from '../../../models/authentication-request';
import { MessageModule } from 'primeng/message';
import { AvatarModule } from 'primeng/avatar';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'pd-register',
  standalone: true,
  imports: [CommonModule, MessageModule, AvatarModule, FormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  errorMsg = '';
  user: UserRegistrationRequest = {};

  constructor(
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) {}

  login() {
    this.router.navigate(['login']);
  }

  createAccount() {
    this.userService.registerUser(this.user)
    .subscribe({
      next: () => {
        const authRequest: AuthenticationRequest = {
          email: this.user.email,
          password: this.user.password
        }
        this.authenticationService.login(authRequest)
        .subscribe({
          next: (AuthenticatorResponse) => {
            localStorage.setItem('user', JSON.stringify(AuthenticatorResponse));
            this.router.navigate(['customers'])
          },
          error: (err) => {
            if (err.error.statusCode === 401) {
              this.errorMsg = 'Login and / or pasword is incorrect';
            }
          }
        });
      }
    });
  }
}
