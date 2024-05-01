import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IVisitDTO } from './visit.domain';
import { baseUrl } from '../../../environments/environment';
import { UserService } from '../users.service';

@Injectable({
    providedIn: 'root',
  })
  export class VisitService {

    constructor(
      private _http: HttpClient,
      private _userService: UserService,
    ) {}

    getAll(): Observable<IVisitDTO[]> {
      let token = this._userService.token;
      return this._http.get<IVisitDTO[]>(`${baseUrl}/visits`, {headers: new HttpHeaders().set('token', token!)});
    }

    create(data: any): Observable<IVisitDTO> {
      let token = this._userService.token;
      return this._http.post<IVisitDTO>(`${baseUrl}/visit`, data, {headers: new HttpHeaders().set('token', token!)});
    }

    deactivate(id: number): Observable<IVisitDTO> {
      let token = this._userService.token;
      return this._http.put<IVisitDTO>(`${baseUrl}/visit/${id}`, {headers: new HttpHeaders().set('token', token!)});
    }
  }