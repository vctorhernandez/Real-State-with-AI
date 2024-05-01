import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RolesService } from 'src/app/services/roles.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard {

  constructor(
    private _roleService: RolesService,
    private _router: Router
  ) { }

  canActivate(): Observable<boolean> {
    this._roleService.isAdmin('Capex').subscribe((isAdmin : boolean)=>{
      if(!isAdmin){
        Swal.fire({
          title: 'Error',
          text: "Access Denied. You don't have permisions to do this.",
          icon: 'error',
          showCloseButton: true
        })
        this._router.navigate(['/']);
      }
    });

    return this._roleService.isAdmin('Capex')
  }
  
}