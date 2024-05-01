import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IZoneDTO } from './zone.domain';
import { baseUrl } from '../../../environments/environment';
import { UserService } from '../users.service';

@Injectable({
    providedIn: 'root',
  })
  export class ZoneService {

    constructor(
      private _http: HttpClient,
      private _userService: UserService,
    ) {}

    getAll(): Observable<IZoneDTO[]> {
      let token = this._userService.token;
      return this._http.get<IZoneDTO[]>(`${baseUrl}/zones`, {headers: new HttpHeaders().set('token', token!)});
    }

    create(data: any): Observable<IZoneDTO> {
      let token = this._userService.token;
      return this._http.post<IZoneDTO>(`${baseUrl}/zone`, data, {headers: new HttpHeaders().set('token', token!)});
    }

    deactivate(id: number): Observable<IZoneDTO> {
      let token = this._userService.token;
      return this._http.put<IZoneDTO>(`${baseUrl}/zone/${id}`, {headers: new HttpHeaders().set('token', token!)});
    }
  }