import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRequestDTO, IRequestResponse } from './request.domain';
import { baseUrl } from '../../../../src/environments/environment';
import { UserService } from '../users.service';
import { IRequestUpdateDTO } from './request-update.domain';

@Injectable({
    providedIn: 'root',
  })
  export class RequestService {

    constructor(
      private _http: HttpClient,
      private _userService: UserService,
    ) {}

    getAll(): Observable<IRequestDTO> {
      let token = this._userService.token;
      return this._http.get<IRequestDTO>(`${baseUrl}/requests`, {headers: new HttpHeaders().set('token', token!)});
    }

    get(id: number): Observable<IRequestResponse> {
      let token = this._userService.token;
      let email = this._userService.user.email;
      return this._http.get<IRequestResponse>(`${baseUrl}/request/${id}?email=${email}`, {headers: new HttpHeaders().set('token', token!)});
    }

    getByUser(): Observable<IRequestDTO> {
      let token = this._userService.token;
      let email = this._userService.user.email; 
      return this._http.get<IRequestDTO>(`${baseUrl}/requests/${email}`, {headers: new HttpHeaders().set('token', token!)});
    }

    getByApprover(): Observable<IRequestDTO[]> {
      let token = this._userService.token;
      let email = this._userService.user.email; 
      return this._http.get<IRequestDTO[]>(`${baseUrl}/requestsApprover/${email}`, {headers: new HttpHeaders().set('token', token!)});
    }

    create(request: any): Observable<any> {
      let token = this._userService.token;
      return this._http.post<any>(`${baseUrl}/request`, request, {headers: new HttpHeaders().set('token', token!)});
    }

    update(id: number, request: IRequestUpdateDTO): Observable<IRequestUpdateDTO> {
      let token = this._userService.token;
      return this._http.put<IRequestUpdateDTO>(`${baseUrl}/request/${id}`, request, {headers: new HttpHeaders().set('token', token!)});
    }

    approve(id: number, comment: string, request: any): Observable<IRequestDTO> {
      let token = this._userService.token;
      let email = this._userService.user.email;
      let body = {request: request, email: email, comment: comment}
      return this._http.put<IRequestDTO>(`${baseUrl}/request/approve/${id}`, body, {headers: new HttpHeaders().set('token', token!)});
    }

    reject(id: number, comment: string, request: any): Observable<IRequestDTO> {
      let token = this._userService.token;
      let email = this._userService.user.email;
      let body = {request: request, email: email, comment: comment}
      return this._http.put<IRequestDTO>(`${baseUrl}/request/reject/${id}`, body, {headers: new HttpHeaders().set('token', token!)});
    }
  }