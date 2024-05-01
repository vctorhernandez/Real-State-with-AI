import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRoomDTO } from './room.domain';
import { baseUrl } from '../../../environments/environment';
import { UserService } from '../users.service';

@Injectable({
    providedIn: 'root',
  })
  export class RoomService {

    constructor(
      private _http: HttpClient,
      private _userService: UserService,
    ) {}

    getAll(): Observable<IRoomDTO[]> {
      let token = this._userService.token;
      return this._http.get<IRoomDTO[]>(`${baseUrl}/rooms`, {headers: new HttpHeaders().set('token', token!)});
    }

    create(data: any): Observable<IRoomDTO> {
      let token = this._userService.token;
      return this._http.post<IRoomDTO>(`${baseUrl}/room`, data, {headers: new HttpHeaders().set('token', token!)});
    }

    deactivate(id: number): Observable<IRoomDTO> {
      let token = this._userService.token;
      return this._http.put<IRoomDTO>(`${baseUrl}/room/${id}`, {headers: new HttpHeaders().set('token', token!)});
    }
  }