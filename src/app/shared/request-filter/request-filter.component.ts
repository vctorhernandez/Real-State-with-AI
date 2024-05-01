import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-request-filter',
  templateUrl: './request-filter.component.html',
  styleUrls: ['./request-filter.component.scss']
})
export class RequestFilterComponent {
  @Input() dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @Output() filterChanged: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('paginator2', { static: false }) paginator!: MatPaginator;

  allRequests: any;
  filterValue: string = "";

  clearFilter() {
    this.dataSource = new MatTableDataSource<any>(this.allRequests);
    this.dataSource.paginator = this.paginator;
    this.filterValue = "";
    this.filterChanged.emit(this.filterValue);
  }

  filter(): void {
    this.filterChanged.emit(this.filterValue);
  }
}
