import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBuDTO } from './bu.domain';
import { baseUrl } from '../../../environments/environment';
import { UserService } from '../users.service';

@Injectable({
    providedIn: 'root',
  })
  export class BuService {

    constructor(
      private _http: HttpClient,
      private _userService: UserService,
    ) {}

    getAll(): Observable<IBuDTO[]> {
      let token = this._userService.token;
      return this._http.get<IBuDTO[]>(`${baseUrl}/bus`, {headers: new HttpHeaders().set('token', token!)});
    }

    create(data: any): Observable<IBuDTO> {
      let token = this._userService.token;
      return this._http.post<IBuDTO>(`${baseUrl}/bu`, data, {headers: new HttpHeaders().set('token', token!)});
    }

    deactivate(id: number): Observable<IBuDTO> {
      let token = this._userService.token;
      return this._http.put<IBuDTO>(`${baseUrl}/bu/${id}`, {headers: new HttpHeaders().set('token', token!)});
    }
  }