import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMenuRequestDTO } from './menu-request.domain';
import { baseUrl } from '../../../environments/environment';
import { UserService } from '../users.service';

@Injectable({
    providedIn: 'root',
  })
  export class MenuRequestService {

    constructor(
      private _http: HttpClient,
      private _userService: UserService,
    ) {}

    getAll(): Observable<IMenuRequestDTO[]> {
      let token = this._userService.token;
      return this._http.get<IMenuRequestDTO[]>(`${baseUrl}/menuRequests`, {headers: new HttpHeaders().set('token', token!)});
    }

    get(id: number): Observable<IMenuRequestDTO[]> {
      let token = this._userService.token;
      return this._http.get<IMenuRequestDTO[]>(`${baseUrl}/menuRequest/${id}`, {headers: new HttpHeaders().set('token', token!)});
    }

    create(id: number, data: any): Observable<IMenuRequestDTO> {
      let token = this._userService.token;
      return this._http.post<IMenuRequestDTO>(`${baseUrl}/menuRequest/${id}`, data, {headers: new HttpHeaders().set('token', token!)});
    }

    deactivate(id: number): Observable<IMenuRequestDTO> {
      let token = this._userService.token;
      return this._http.put<IMenuRequestDTO>(`${baseUrl}/menuRequest/${id}`, {headers: new HttpHeaders().set('token', token!)});
    }
  }