import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProjectDTO } from './project.domain';
import { baseUrl } from '../../../environments/environment';
import { UserService } from '../users.service';

@Injectable({
    providedIn: 'root',
  })
  export class ProjectService {

    constructor(
      private _http: HttpClient,
      private _userService: UserService,
    ) {}

    getAll(): Observable<IProjectDTO[]> {
      let token = this._userService.token;
      return this._http.get<IProjectDTO[]>(`${baseUrl}/projects`, {headers: new HttpHeaders().set('token', token!)});
    }
  }