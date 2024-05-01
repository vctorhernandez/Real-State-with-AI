import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApprovalService {
  private requestApprovedSubject = new Subject<void>();

  requestApproved$ = this.requestApprovedSubject.asObservable();

  notifyRequestApproved() {
    this.requestApprovedSubject.next();
  }
}