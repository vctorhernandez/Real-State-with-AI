import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IRequestDTO } from '../../../services/requests/request.domain';
import { RequestService } from '../../../services/requests/request.service';


@Component({
  selector: 'app-approvals',
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.scss']
})
export class ApprovalsComponent implements OnInit{

  allRequests: any;
  dataSource = new MatTableDataSource<any>();
  filterValue!: string;
  loading: boolean = true;

  @ViewChild('paginator3') paginator!: MatPaginator;
  
  constructor(private _requestService: RequestService){}
  
  ngOnInit(){
    this._requestService.getByApprover().subscribe((resp : IRequestDTO[])=>{
      this.allRequests = resp;
      this.dataSource= new MatTableDataSource<IRequestDTO>(this.allRequests);
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    })
  }

  applyFilter(filterValue: string): void {
    let filteredRequests = this.allRequests.filter((request: {
      applicant: string; projectCode: string; businessUnit: string; visitorCompanyName: string;
    }) => {
      let searchTerms = filterValue.toLowerCase().split(" ");
      let termFound = [];

      for (let i = 0; i < searchTerms.length; i++) {
        let term = searchTerms[i];
        let found =
          request?.applicant?.toString()?.includes(term) ||
          request?.projectCode?.toLowerCase()?.includes(term) ||
          request?.businessUnit?.toLowerCase()?.includes(term) ||
          request?.visitorCompanyName?.toLowerCase()?.includes(term);
        termFound.push(found);
      }

      return termFound.every(found => found);
    });

    this.dataSource = new MatTableDataSource<any>(filteredRequests);
    this.dataSource.paginator = this.paginator;
  }
}
