import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { baseUrl } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  user: any | null;
  token: string | null | undefined;

  constructor(public http: HttpClient, public router: Router) {
    this.chargeStorage();
  }

  loginGoogle(token: string) {
    return this.http.post(`${baseUrl}/google`, { token })
      .pipe(map((resp: any) => {
        this.saveStorage(resp.googleUser, resp.token);
        return true;
      }));
  }

  isLogged() {
    return (this.token != null && this.token.length > 5) ? true : false;
  }

  chargeStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      let u = localStorage.getItem('user')
      this.user = u != null ? JSON.parse(u) : null;
    } else {
      this.token = '';
      this.user = null;
    }
  }

  saveStorage(user: any, token: string) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    this.user = user;
    this.token = token;
  }

  logout() {
    this.user = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin');
    this.router.navigate(['/login']);
  }
}
