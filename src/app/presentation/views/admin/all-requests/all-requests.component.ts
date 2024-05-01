import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IRequestDTO } from '../../../../services/requests/request.domain';
import { RequestService } from '../../../../services/requests/request.service';

@Component({
  selector: 'app-all-requests',
  templateUrl: './all-requests.component.html',
  styleUrls: ['./all-requests.component.scss']
})
export class AllRequestsComponent implements OnInit{
  allRequests: any;
  dataSource = new MatTableDataSource<any>();
  loading: boolean = true;
  @ViewChild('paginator3') paginator!: MatPaginator;

  constructor(private _requestService: RequestService){}

  ngOnInit(): void {
    this._requestService.getAll().subscribe((resp : IRequestDTO)=>{
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

  generateReport(): void {
    
  }
}
