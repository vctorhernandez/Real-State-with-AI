import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BuService } from '../../services/bus/bu.service';
import { IBuDTO } from '../../services/bus/bu.domain';
import { IRequestDTO } from '../../services/requests/request.domain';

@Component({
  selector: 'app-request-table',
  templateUrl: './request-table.component.html',
  styleUrls: ['./request-table.component.scss']
})
export class RequestTableComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'creationDate',
    'applicant',
    'projectCode',
    'buId',
    'visitorCompanyName',
    'status',
  ];
  
  @ViewChild(MatSort) sort!: MatSort;
  @Input() dataSource: MatTableDataSource<any> = new MatTableDataSource<IRequestDTO>();
  bus!: IBuDTO[];
  loading: boolean = true;

  constructor(
    private _router: Router,
    private _buService: BuService
  ) {}

  ngOnInit(): void {
    this._buService.getAll().subscribe(response => {
      this.bus = response;
      this.loading = false;
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  goToDetails(row: any) {
    this._router.navigate(['/details', row.id]);
  }

  getBusinessUnitName(buId: number): string {
    return this.bus.find(bu => bu.id === buId)?.name || '';
  }
}
