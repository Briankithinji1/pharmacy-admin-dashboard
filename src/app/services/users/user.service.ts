import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDTO } from '../../models/user-dto';
import { UserRegistrationRequest } from '../../models/user-registration-request';
import { UserUpdateRequest } from '../../models/user-update-request';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly userUrl = `${environment.api.baseUrl}/${environment.api.userUrl}`;

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(this.userUrl);
  }

  registerUser(user: UserRegistrationRequest): Observable<void> {
    return this.http.post<void>(this.userUrl, user);
  }

  updateUser(userId: number | undefined, user: UserUpdateRequest): Observable<void> {
    return this.http.put<void>(`${this.userUrl}/${userId}`, user);
  }

  deleteUser(userId: number | undefined): Observable<void> {
    return this.http.delete<void>(`${this.userUrl}/${userId}`);
  }
}
