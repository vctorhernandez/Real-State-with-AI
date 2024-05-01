import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRoomRequestDTO } from './room-request.domain';
import { baseUrl } from '../../../environments/environment';
import { UserService } from '../users.service';

@Injectable({
    providedIn: 'root',
  })
  export class RoomRequestService {

    constructor(
      private _http: HttpClient,
      private _userService: UserService,
    ) {}

    getAll(): Observable<IRoomRequestDTO[]> {
      let token = this._userService.token;
      return this._http.get<IRoomRequestDTO[]>(`${baseUrl}/roomRequests`, {headers: new HttpHeaders().set('token', token!)});
    }

    get(id: number): Observable<IRoomRequestDTO[]> {
      let token = this._userService.token;
      return this._http.get<IRoomRequestDTO[]>(`${baseUrl}/roomRequest/${id}`, {headers: new HttpHeaders().set('token', token!)});
    }

    create(id: number, data: any): Observable<IRoomRequestDTO> {
      let token = this._userService.token;
      return this._http.post<IRoomRequestDTO>(`${baseUrl}/roomRequest/${id}`, data, {headers: new HttpHeaders().set('token', token!)});
    }

    deactivate(id: number): Observable<IRoomRequestDTO> {
      let token = this._userService.token;
      return this._http.put<IRoomRequestDTO>(`${baseUrl}/roomRequest/${id}`, {headers: new HttpHeaders().set('token', token!)});
    }
  }