import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IZoneRequestDTO } from './zone-request.domain';
import { baseUrl } from '../../../environments/environment';
import { UserService } from '../users.service';

@Injectable({
    providedIn: 'root',
  })
  export class ZoneRequestService {

    constructor(
      private _http: HttpClient,
      private _userService: UserService,
    ) {}

    getAll(): Observable<IZoneRequestDTO[]> {
      let token = this._userService.token;
      return this._http.get<IZoneRequestDTO[]>(`${baseUrl}/zoneRequests`, {headers: new HttpHeaders().set('token', token!)});
    }

    get(id: number): Observable<IZoneRequestDTO[]> {
      let token = this._userService.token;
      return this._http.get<IZoneRequestDTO[]>(`${baseUrl}/zoneRequest/${id}`, {headers: new HttpHeaders().set('token', token!)});
    }

    create(id: number, data: any): Observable<IZoneRequestDTO> {
      let token = this._userService.token;
      return this._http.post<IZoneRequestDTO>(`${baseUrl}/zoneRequest/${id}`, data, {headers: new HttpHeaders().set('token', token!)});
    }

    delete(requestId: number, zoneId: number): Observable<IZoneRequestDTO> {
      let token = this._userService.token;
      return this._http.delete<IZoneRequestDTO>(`${baseUrl}/zoneRequest/${requestId}?zone=${zoneId}`, {headers: new HttpHeaders().set('token', token!)});
    }
  }