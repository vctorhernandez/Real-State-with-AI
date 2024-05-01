import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/users.service';
declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit{
  constructor(
    private _userService: UserService,
    private _router: Router,
    private _zone: NgZone
  ) {}
  
  ngOnInit(): void {
    this.googleInit();
  }
  
  googleInit() {
        google.accounts.id.initialize({
          client_id: "563264259112-5natdgm5vmu2hd9gnma9fpp2j9kvb0ie.apps.googleusercontent.com",
          callback: this.handleCredentialResponse.bind(this)
        });      
    
        google.accounts.id.renderButton(
          document.getElementById("g_id_signin"),
          { theme: "outline", size: "large" }
        );    
    
        google.accounts.id.prompt(); // ** Comentar para deshabilitar onetap
  }
  
  handleCredentialResponse( response: any ) {
    this._userService.loginGoogle(response.credential).subscribe((resp: any) => {
      this._zone.run(() => this._router.navigate(['/']));
    })
  }
}
