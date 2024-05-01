import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './users.service';
import { baseUrl } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class RolesService {
  constructor(private _http: HttpClient, private _userService: UserService){ }
  nameApp = 'ice';
  isAdmin(nameApp: string) : Observable<boolean>{
    let token = this._userService.token;
    return this._http.get<boolean>(`${baseUrl}/isAdmin/${nameApp}`, {headers: new HttpHeaders().set('token', token!)});
  }

  isApprover(): Observable<boolean>{
    let token = this._userService.token;
    return this._http.get<boolean>(`${baseUrl}/isApprover`, {headers: new HttpHeaders().set('token', token!)});
  }
}
