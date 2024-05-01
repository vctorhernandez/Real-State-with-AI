import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMenuTypeDTO } from './menu-type.domain';
import { baseUrl } from '../../../environments/environment';
import { UserService } from '../users.service';

@Injectable({
    providedIn: 'root',
  })
  export class MenuTypeService {

    constructor(
      private _http: HttpClient,
      private _userService: UserService,
    ) {}

    getAll(): Observable<IMenuTypeDTO[]> {
      let token = this._userService.token;
      return this._http.get<IMenuTypeDTO[]>(`${baseUrl}/menuTypes`, {headers: new HttpHeaders().set('token', token!)});
    }

    create(data: any): Observable<IMenuTypeDTO> {
      let token = this._userService.token;
      return this._http.post<IMenuTypeDTO>(`${baseUrl}/menuType`, data, {headers: new HttpHeaders().set('token', token!)});
    }

    deactivate(id: number): Observable<IMenuTypeDTO> {
      let token = this._userService.token;
      return this._http.put<IMenuTypeDTO>(`${baseUrl}/menuType/${id}`, {headers: new HttpHeaders().set('token', token!)});
    }
  }