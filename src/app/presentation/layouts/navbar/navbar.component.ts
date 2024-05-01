import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ApprovalService } from '../../../services/approvals/approval.service';
import { IRequestDTO } from '../../../services/requests/request.domain';
import { RequestService } from '../../../services/requests/request.service';
import { RolesService } from '../../../services/roles.service';
import { UserService } from '../../../services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isApprover: boolean = true;
  isAdmin: boolean = true;
  badgeLength: number = 0;

  constructor(
    private _userService: UserService, 
    private _rolesService: RolesService, 
    private _requestsService: RequestService,
    private _approvalService: ApprovalService
    ){}

  ngOnInit(): void {
    forkJoin([
      this._rolesService.isAdmin("ice"),
      this._rolesService.isApprover(),
      this._requestsService.getByApprover()
    ]).subscribe({
      next: ([isAdminResponse, isApproverResponse, requestsResponse]: [boolean, boolean, IRequestDTO[]]) => {
        this.isAdmin = isAdminResponse;
        this.isApprover = isApproverResponse;
        this.badgeLength = requestsResponse.length;
      },
      error: (error: any) => {
        console.error('Error in forkJoin:', error);
      }
    });
  
    this._approvalService.requestApproved$.subscribe(() => {
      this.updateBadgeLength();
    });
  }

  updateBadgeLength() {
    this._requestsService.getByApprover().subscribe((resp: IRequestDTO[]) => {
      this.badgeLength = resp.length;
    });
  }

  logout() {
    this._userService.logout();
  }
}
