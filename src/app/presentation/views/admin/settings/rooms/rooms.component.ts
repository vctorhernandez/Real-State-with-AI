import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { RoomService } from '../../../../../services/rooms/room.service';
import Swal from 'sweetalert2';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  allRooms: any;
  displayedColumns: string[] = ['name', 'Delete'];
  loading: boolean = true;

  creationform = new FormGroup({
    name: new FormControl('', [Validators.required]),
    active: new FormControl(1)
  });
  
  constructor(private _roomService: RoomService) { }

  ngOnInit(): void {
    this._roomService.getAll().subscribe((data) => {
      this.allRooms = data;
      this.dataSource = new MatTableDataSource<any>(this.allRooms);
      this.dataSource.sort = this.sort;
      this.loading = false;
    });
  }

  create() {
    if (this.creationform.valid) {
      this._roomService.create(this.creationform.value).subscribe((data) => {
        Swal.fire({
          title: "Good job!",
          text: "Room was created!",
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
        this._roomService.deactivate(id).subscribe(
          () => {
            Swal.fire(
              'Deleted!',
              'Menu has been removed.',
              'success'
            );
            this.ngOnInit();
          },
          (error) => {
            Swal.fire(
              'Error',
              'There was an error deleting the menu: ' + error.message,
              'error'
            );
          }
        );
      }
    });
  }
}
