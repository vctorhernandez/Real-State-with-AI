import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoomService } from '../../../../services/rooms/room.service';
import { IRoomDTO } from '../../../../services/rooms/room.domain';
import { RoomRequestService } from '../../../../services/room-requests/room-request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rooms-dialog',
  templateUrl: './rooms-dialog.component.html',
  styleUrls: ['./rooms-dialog.component.scss']
})
export class RoomsDialogComponent implements OnInit {
  data!: any;

  constructor(
    private _dialogRef: MatDialogRef<RoomsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public requestData: any,
    private _fb: FormBuilder,
    private _roomRequest: RoomRequestService,
    private _roomService: RoomService,
  ) {
    this.data = requestData;
  }

  loading: boolean = true;
  rooms!: IRoomDTO[];
  roomRequests: any[] = [];

  roomBookingForm = this._fb.group({
    date: [null, Validators.required],
    time: [null, Validators.required],
    roomName: [null, Validators.required],
  });

  displayedColumns = ['date', 'time', 'roomName', 'Actions']

  ngOnInit(): void {
    this._roomService.getAll().subscribe(response => {
      this.rooms = response;
      this.loading = false;
    });
  }

  createRoomBooking() {
    if (this.roomBookingForm.valid) {
      const data = {
        date: this.roomBookingForm.value.date,
        time: this.roomBookingForm.value.time,
        roomName: this.roomBookingForm.value.roomName
      };

      this.roomRequests = [data, ...this.roomRequests];
      this.roomBookingForm.reset();
      this.roomBookingForm.markAsPristine();
      this.roomBookingForm.markAsUntouched();
    }
  }

  removeRoomBooking(item: any) {
    const index = this.roomRequests.indexOf(item);
    if (index !== -1) {
      this.roomRequests.splice(index, 1);
    }
    this.roomRequests = [...this.roomRequests];
  }

  onSubmit() {
    Swal.fire({
      title: 'Are you sure?',
      text: "By accepting you are also approving the request.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, accept it'
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.showLoading();
        this._roomRequest.create(this.data.requestId, this.roomRequests).subscribe(response => {
          this._dialogRef.close(result.isConfirmed);
        },
          error => {
            console.error(error);
          });
      }
    })
  }

  addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  closeDialog() {
    this._dialogRef.close();
  }
}
