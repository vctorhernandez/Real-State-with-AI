import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ApprovalService } from '../../../services/approvals/approval.service';
import { IBuDTO } from '../../../services/bus/bu.domain';
import { BuService } from '../../../services/bus/bu.service';
import { IMenuTypeDTO } from '../../../services/menu-types/menu-type.domain';
import { MenuTypeService } from '../../../services/menu-types/menu-type.service';
import { RequestService } from '../../../services/requests/request.service';
import { IVisitDTO } from '../../../services/visits/visit.domain';
import { VisitService } from '../../../services/visits/visit.service';
import { IZoneDTO } from '../../../services/zones/zone.domain';
import { ZoneService } from '../../../services/zones/zone.service';
import { IMenuRequestDTO } from '../../../services/menu-requests/menu-request.domain';
import { MenuRequestService } from '../../../services/menu-requests/menu-request.service';
import { TaxiRequestService } from '../../../services/taxi-requests/taxi-request.service';
import { RoomsDialogComponent } from './rooms-dialog/rooms-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { RoomRequestService } from '../../../services/room-requests/room-request.service';
import { ZoneRequestService } from '../../../services/zone-requests/zone-request.service';
import { IZoneRequestDTO } from '../../../services/zone-requests/zone-request.domain';
import { RoomService } from '../../../services/rooms/room.service';
import { IRoomDTO } from '../../../services/rooms/room.domain';
import { ProjectService } from '../../../services/projects/project.service';
import { IProjectDTO } from '../../../services/projects/project.domain';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  // STATUS
  FULLYAPPROVED: number = 10;
  REJECTED: number = 50;

  isEditMode: boolean = false;
  loading: boolean = true;

  requestForm: FormGroup = new FormGroup({});
  requestId = +this._route.snapshot.paramMap.get('id')!;

  displayedColumns = ['date', 'time', 'room']

  approveComment: string = "";
  rejectComment: string = "";

  // DATA
  request: any;
  tourZones: IZoneDTO[] = [];
  bus: IBuDTO[] = [];
  projects: IProjectDTO[] = [];
  rooms: IRoomDTO[] = [];
  visits: IVisitDTO[] = [];
  zones: IZoneDTO[] = [];
  menuTypes: IMenuTypeDTO[] = [];
  menuRequests: IMenuRequestDTO[] = [];
  breakfastRequests: any[] = [];
  lunchRequests: any[] = [];
  taxiRequests: any[] = [];
  roomRequests: any[] = [];
  zoneRequests: IZoneRequestDTO[] = [];
  zoneRequestsIds: number[] = [];
  zoneRequestsIdsCopy: number[] = [];
  startDate: any;
  finishDate: any;

  ICanApprove: boolean = false;
  approvers: any;

  constructor(
    private _dialog: MatDialog,
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _requestService: RequestService,
    private _zoneService: ZoneService,
    private _visitService: VisitService,
    private _roomService: RoomService,
    private _menuTypeService: MenuTypeService,
    private _menuRequestService: MenuRequestService,
    private _buService: BuService,
    private _approvalService: ApprovalService,
    private _taxiRequestService: TaxiRequestService,
    private _roomRequestService: RoomRequestService,
    private _zoneRequestService: ZoneRequestService,
    private _projectService: ProjectService
  ) { }

  ngOnInit(): void {
    forkJoin([
      this._requestService.get(this.requestId),
      this._zoneService.getAll(),
      this._buService.getAll(),
      this._visitService.getAll(),
      this._roomService.getAll(),
      this._menuTypeService.getAll(),
      this._menuRequestService.get(this.requestId),
      this._taxiRequestService.get(this.requestId),
      this._roomRequestService.get(this.requestId),
      this._zoneRequestService.get(this.requestId),
      this._projectService.getAll()
    ])
      .subscribe(
        ([requestsResponse, zonesResponse, busResponse, visitsResponse, roomsResponse, menuTypesResponse, menuRequestsResponse, taxiRequestsResponse, roomRequestsResponse, zoneRequestsReponse, projectsResponse]) => {
          this.request = requestsResponse.data;
          this.ICanApprove = requestsResponse.ICanApprove;
          this.zones = zonesResponse;
          this.bus = busResponse;
          this.projects = projectsResponse;
          this.rooms = roomsResponse;
          this.visits = visitsResponse;
          this.menuTypes = menuTypesResponse;
          this.menuRequests = menuRequestsResponse;
          this.breakfastRequests = menuRequestsResponse.filter(item => item.type == 'Breakfast');
          this.breakfastRequests.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).sort((a, b) => a.time - b.time);
          this.lunchRequests = menuRequestsResponse.filter(item => item.type == 'Lunch');
          this.lunchRequests.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).sort((a, b) => a.time - b.time);
          this.taxiRequests = taxiRequestsResponse;
          this.taxiRequests.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).sort((a, b) => a.time - b.time);
          this.roomRequests = roomRequestsResponse;
          this.roomRequests.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).sort((a, b) => a.time - b.time);
          this.zoneRequests = zoneRequestsReponse;
          this.zoneRequests.forEach(request => {
            this.zoneRequestsIds.push(request.zoneId);
            this.zoneRequestsIdsCopy.push(request.zoneId);
          });
          this.requestForm = this._fb.group({
            id: [{ value: this.request.id, disabled: true }, [Validators.required, Validators.maxLength(50)]],
            applicant: [{ value: this.request.applicant, disabled: true }, Validators.required],
            projectCode: [{ value: this.request.projectCode, disabled: !this.isEditMode }, [Validators.required, Validators.maxLength(10)]],
            buId: [{ value: this.request.buId, disabled: !this.isEditMode }, [Validators.required]],
            visitorCompanyName: [{ value: this.request.visitorCompanyName, disabled: !this.isEditMode }, [Validators.required, Validators.maxLength(255)]],
            visitorType: [{ value: this.request.visitorType, disabled: !this.isEditMode }, [Validators.required]],
            coordinator: [{ value: this.request.coordinator, disabled: !this.isEditMode }, [Validators.required, Validators.email, Validators.maxLength(255)]],
            externalPeopleNum: [{ value: this.request.externalPeopleNum, disabled: !this.isEditMode }, [Validators.required, Validators.max(10)]],
            internalPeopleNum: [{ value: this.request.internalPeopleNum, disabled: !this.isEditMode }, [Validators.required, Validators.max(10)]],
            invitationLetter: [{ value: this.request.invitationLetter, disabled: !this.isEditMode }, Validators.required],
            welcomeWithLogo: [{ value: this.request.welcomeWithLogo, disabled: !this.isEditMode }, Validators.required],
            startDate: [{ value: this.request.startDate, disabled: !this.isEditMode }, [Validators.required]],
            finishDate: [{ value: this.request.finishDate, disabled: !this.isEditMode }, [Validators.required]],
            tourNeeded: [{ value: this.request.tourNeeded, disabled: !this.isEditMode }, Validators.required],
            tourResponsibleName: [{ value: this.request.tourResponsibleName, disabled: !this.isEditMode }],
            tourResponsiblePhone: [{ value: this.request.tourResponsiblePhone, disabled: !this.isEditMode }],
            comments: [{ value: this.request.comments, disabled: !this.isEditMode }, [Validators.maxLength(255)]],
          });
          this.startDate = this.request.startDate;
          this.finishDate = this.request.finishDate;
          this.loading = false;
          console.log(this.zoneRequests);
        },
        error => {
          console.error('Error in forkJoin:', error);
        });
  }

  onEditButtonClick() {
    this.isEditMode = !this.isEditMode;
    if (this.isEditMode) {
      this.requestForm.enable();
      this.requestForm.get('applicant')?.disable();
    } else {
      this.requestForm.disable();
      this.requestForm.patchValue(this.request);
    }
  }


  async onUpdateButtonClick() {
    console.log(this.requestForm);
    if (this.requestForm.get('tourNeeded')?.value == 1) {
      this.requestForm.get('tourResponsibleName')?.addValidators(Validators.required);
      this.requestForm.get('tourResponsiblePhone')?.addValidators(Validators.required);
    } else {
      this.requestForm.get('tourResponsibleName')?.clearValidators();
      this.requestForm.get('tourResponsiblePhone')?.clearValidators();
    }
    this.requestForm.controls['tourResponsibleName'].updateValueAndValidity();
    this.requestForm.controls['tourResponsiblePhone'].updateValueAndValidity();
    Swal.showLoading();
    if (this.requestForm.valid) {
      const data = this.requestForm.value;
      const updatedRequest = {
        projectCode: data.projectCode,
        buId: data.buId,
        visitorCompanyName: data.visitorCompanyName,
        visitorType: data.visitorType,
        coordinator: data.coordinator,
        externalPeopleNum: data.externalPeopleNum,
        internalPeopleNum: data.internalPeopleNum,
        welcomeWithLogo: data.welcomeWithLogo,
        invitationLetter: data.invitationLetter,
        tourNeeded: data.tourNeeded,
        tourResponsibleName: data.tourResponsibleName,
        tourResponsiblePhone: data.tourResponsiblePhone,
        startDate: data.startDate,
        finishDate: data.finishDate,
        comments: data.comments
      }
      const newZones = this.zoneRequestsIds.filter((id) => !this.zoneRequestsIdsCopy.some((idCopy) => idCopy === id));
      const deletedZones = this.zoneRequestsIdsCopy.filter((idCopy) => !this.zoneRequestsIds.some((id) => id === idCopy));
      if (newZones.length > 0) {
        this._zoneRequestService.create(this.requestId, newZones).subscribe(response => {
          console.log(response);
        })
      }
      if (deletedZones.length > 0) {
        deletedZones.forEach(async zoneId => {
          await this._zoneRequestService.delete(this.requestId, zoneId).subscribe(response => {
            console.log(response);
          });
        });
      }
      this._requestService.update(this.requestId, updatedRequest).subscribe((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Request updated!',
          showConfirmButton: false,
          timer: 1000
        });
        this.isEditMode = !this.isEditMode;
        this.requestForm.disable();
      },
        (error) => {
          console.log(error);
          Swal.fire({
            title: 'Error',
            text: error.message,
            icon: 'error',
          });
        });
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Make sure you fill in all fields correctly!',
      })
    }
  }

  onAcceptRequest() {
    if (this.request.status === 0) {
      const dialogRef = this._dialog.open(RoomsDialogComponent, {
        disableClose: true,
        width: '80%',
        data: {
          requestId: this.requestId,
          startDate: this.startDate,
          finishDate: this.finishDate
        }
      });

      dialogRef.afterClosed().subscribe((response: any) => {
        console.log(response);
        if (response) {
          try {
            Swal.showLoading();
            this._requestService.approve(this.requestId, this.approveComment, this.request).subscribe((res) => {
              Swal.fire({
                title: 'Request approved!',
                icon: 'success',
              });
              this._approvalService.notifyRequestApproved();
              this.ngOnInit();
            },
              (error) => {
                console.error(error);
                Swal.fire({
                  title: 'Error',
                  text: error.error.message,
                  icon: 'error',
                });
              });
          }
          catch (error) {
            console.error(error);
          }
        }
      })
    } else {
      try {
        Swal.fire({
          title: 'Do you want to approve this request?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, approve it'
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              Swal.showLoading();
              this._requestService.approve(this.requestId, this.approveComment, this.request).subscribe((res) => {
                Swal.fire({
                  title: 'Request approved!',
                  icon: 'success',
                });
                this._approvalService.notifyRequestApproved();
                this.ngOnInit();
              },
                (error) => {
                  console.error(error);
                  Swal.fire({
                    title: 'Error',
                    text: error.error.message,
                    icon: 'error',
                  });
                });
            } catch (error) {
              console.error(error);
            }
          }
        })
      }
      catch (error) {
        console.error(error);
      }
    }
  }


  onRejectRequest() {
    Swal.fire({
      title: 'Do you want to reject this request?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, reject it'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          Swal.showLoading();
          this._requestService.reject(this.requestId, this.rejectComment, this.request).subscribe((res) => {
            console.log(res);
            Swal.fire({
              title: 'Success',
              icon: 'success',
            });
            this._approvalService.notifyRequestApproved();
            this.ngOnInit();
          },
            (error) => {
              console.error(error);
              Swal.fire({
                title: 'Error',
                text: error.error.message,
                icon: 'error',
              });
            });
        } catch (error) {
          console.error(error);
        }
      }
    })
  }

  get limitedApprovers() {
    // const numberOfApprovers = this.request.ApprovalsRequired;
    // const approverNames = new Set<string>();
    // this.approvers.forEach((objeto: IApproversDTO) => {
    //   approverNames.add(objeto.Name);
    // });
    // const uniqueApprovers = Array.from(approverNames).slice(0, numberOfApprovers);
    // uniqueApprovers.push("SAP");
    // return uniqueApprovers
    return ['Business Support', 'BU Director']
  }

  addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  selected_chart(input: any, id: number) {
    if (input.checked) {
      this.zoneRequestsIds.push(id);
    } else {
      const index = this.zoneRequestsIds.indexOf(id);
      if (index > -1) {
        this.zoneRequestsIds.splice(index, 1);
      }
    }
  }

  isZoneChecked(id: number): boolean {
    return this.zoneRequests.some(zone => zone.zoneId === id);
  }
}