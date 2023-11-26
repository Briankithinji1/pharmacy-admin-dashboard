import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationResponse } from '../../models/authentication-response';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AccessGuardService {

  constructor(
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const authResponse: AuthenticationResponse = JSON.parse(storedUser);
      const accessToken = authResponse.accessToken;
      if (accessToken) {
        const jwtHelper = new JwtHelperService();
        const isTokenNonExpired = !jwtHelper.isTokenExpired(accessToken);
        if (isTokenNonExpired) {
          return true;
        }
      }
    }
    this.router.navigate(['login']);
    return false;
  }
}
