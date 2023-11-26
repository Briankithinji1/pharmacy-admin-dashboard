import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationRequest } from '../../../models/authentication-request';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { MessageModule } from 'primeng/message';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'pd-login',
  standalone: true,
  imports: [CommonModule, AvatarModule, MessageModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  authenticationRequest: AuthenticationRequest = {};
  errorMsg = '';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  login() {
    this.errorMsg = '';
    this.authenticationService.login(this.authenticationRequest)
    .subscribe({
      next: (authenticationResponse) => {
        localStorage.setItem('user', JSON.stringify(authenticationResponse));
        this.router.navigate(['customers']);
      },
      error: (err) => {
        if (err.error.statusCode === 401) {
          this.errorMsg = 'login and / or password is incorrect';
        }
      }
    });
  }

  register() {
    this.router.navigate(['register']);
  }
}
