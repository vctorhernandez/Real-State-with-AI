import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITaxiRequestDTO } from './taxi-request.domain';
import { baseUrl } from '../../../environments/environment';
import { UserService } from '../users.service';

@Injectable({
    providedIn: 'root',
  })
  export class TaxiRequestService {

    constructor(
      private _http: HttpClient,
      private _userService: UserService,
    ) {}

    getAll(): Observable<ITaxiRequestDTO[]> {
      let token = this._userService.token;
      return this._http.get<ITaxiRequestDTO[]>(`${baseUrl}/taxiRequests`, {headers: new HttpHeaders().set('token', token!)});
    }

    get(id: number): Observable<ITaxiRequestDTO[]> {
      let token = this._userService.token;
      return this._http.get<ITaxiRequestDTO[]>(`${baseUrl}/taxiRequest/${id}`, {headers: new HttpHeaders().set('token', token!)});
    }

    create(id: number, data: any): Observable<ITaxiRequestDTO> {
      let token = this._userService.token;
      return this._http.post<ITaxiRequestDTO>(`${baseUrl}/taxiRequest/${id}`, data, {headers: new HttpHeaders().set('token', token!)});
    }

    deactivate(id: number): Observable<ITaxiRequestDTO> {
      let token = this._userService.token;
      return this._http.put<ITaxiRequestDTO>(`${baseUrl}/taxiRequest/${id}`, {headers: new HttpHeaders().set('token', token!)});
    }
  }