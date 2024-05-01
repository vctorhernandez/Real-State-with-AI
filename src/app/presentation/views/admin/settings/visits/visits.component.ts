import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { VisitService } from '../../../../../services/visits/visit.service';
import Swal from 'sweetalert2';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.scss']
})
export class VisitsComponent {
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  allVisits: any;
  displayedColumns: string[] = ['name', 'Delete'];
  loading: boolean = true;

  creationform = new FormGroup({
    name: new FormControl('', [Validators.required]),
    active: new FormControl(1)

  });

  constructor(private _visitService: VisitService) {}

  ngOnInit(): void {
    this._visitService.getAll().subscribe((data) => {
      this.allVisits = data;
      this.dataSource = new MatTableDataSource<any>(this.allVisits);
      this.dataSource.sort = this.sort;
      this.loading = false;
    });
  }

  create() {
    if (this.creationform.valid) {
      this._visitService.create(this.creationform.value).subscribe((data) => {
        Swal.fire({
          title: "Good job!",
          text: "Visit was created!",
          icon: "success"
        });
        this.creationform.reset()
        this.dataSource.data = [data, ...this.dataSource.data];
      })
    }
  }

  onDeactivate(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to reverse this.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'No, cancel',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.showLoading();
        this._visitService.deactivate(id).subscribe(
          () => {
            Swal.fire(
              'Deleted!',
              'Visit has been removed.',
              'success'
            );
            this.ngOnInit();
          },
          (error) => {
            Swal.fire(
              'Error',
              'There was an error deleting the visit: ' + error.message,
              'error'
            );
          }
        );
      }
    });
  }
}
