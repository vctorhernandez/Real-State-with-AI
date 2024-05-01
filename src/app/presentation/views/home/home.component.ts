import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { forkJoin } from 'rxjs';
import { RolesService } from '../../../services/roles.service';
import { RequestService } from '../../../services/requests/request.service';
import { IRequestDTO } from '../../../services/requests/request.domain';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loading: boolean = true;
  isAdmin: any = false;

  dataSource: MatTableDataSource<IRequestDTO> = new MatTableDataSource<IRequestDTO>();
  allRequests: any;
  items: any[] = ['', '', '', '']
  filterValue: string = "";
  
  @ViewChild('paginator2', {static: false}) paginator!: MatPaginator;
  
  constructor(
    private _dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loading = false;
  }

  creationDialog(): void {
    const dialogRef = this._dialog.open(CreateDialogComponent, {
      disableClose: true,
      width: '80%',
    });
    dialogRef.afterClosed().subscribe((changed) => {
      if (changed) {
        this.ngOnInit();
      }
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
