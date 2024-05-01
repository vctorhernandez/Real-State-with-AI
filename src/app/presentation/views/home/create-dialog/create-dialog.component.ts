import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { IBuDTO } from '../../../../services/bus/bu.domain';
import { BuService } from '../../../../services/bus/bu.service';
import { IMenuTypeDTO } from '../../../../services/menu-types/menu-type.domain';
import { MenuTypeService } from '../../../../services/menu-types/menu-type.service';
import { IVisitDTO } from '../../../../services/visits/visit.domain';
import { VisitService } from '../../../../services/visits/visit.service';
import { UserService } from '../../../../services/users.service';
import { RequestService } from '../../../../services/requests/request.service';
import { MenuRequestService } from '../../../../services/menu-requests/menu-request.service';
import { TaxiRequestService } from '../../../../services/taxi-requests/taxi-request.service';
import { ZoneService } from '../../../../services/zones/zone.service';
import { IZoneDTO } from '../../../../services/zones/zone.domain';
import { ZoneRequestService } from '../../../../services/zone-requests/zone-request.service';
import { ProjectService } from '../../../../services/projects/project.service';
import { IProjectDTO } from '../../../../services/projects/project.domain';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnInit {

  brak: any;

  loading: boolean = true;

  displayedColumns1 = ['breakfastDate', 'breakfastTime', 'breakfastMenuType', 'breakfastPeopleNumber', 'Actions']
  displayedColumns2 = ['lunchDate', 'lunchTime', 'lunchMenuType', 'lunchCoffee', 'lunchPeopleNumber', 'Actions']
  displayedColumns3 = ['taxiDate', 'taxiTime', 'taxiOrigin', 'taxiDestination', 'taxiWhoPays', 'Actions']

  businessUnits!: IBuDTO[];
  projects!: IProjectDTO[];
  visits!: IVisitDTO[];
  breakfastMenus!: IMenuTypeDTO[];
  breakfastRequests: any = [];
  lunchMenus!: IMenuTypeDTO[];
  lunchRequests: any = [];
  taxiRequests: any = [];
  zones: any = [];
  comments: string | null = null;
  zoneRequests: number[] = [];
  tourNeeded: number | undefined;

  startDate = new Date();
  finishDate = this.addDays(this.startDate, 1);

  step1Form = this._fb.group({
    buId: [null, Validators.required],
    projectCode: [null, [Validators.required, Validators.maxLength(10)]],
    creationDate: [new Date()],
  });

  step2Form = this._fb.group({
    visitorType: [null, [Validators.required, Validators.maxLength(10)]],
    visitorCompanyName: [null, Validators.required],
    coordinator: [null, [Validators.required, Validators.email]],
    externalPeopleNum: [null, Validators.required],
    internalPeopleNum: [null, Validators.required],
    welcomeWithLogo: [null, Validators.required],
    invitationLetter: [null, Validators.required]
  });

  step3Form = this._fb.group({
    startDate: [null, Validators.required],
    finishDate: [null, Validators.required],
    tourNeeded: [null, Validators.required],
    tourResponsibleName: [null],
    tourResponsiblePhone: [null],
  });

  breakfastForm = this._fb.group({
    type: ["Breakfast"],
    name: [null,Validators.required],
    date: [null,Validators.required],
    time: [null,Validators.required],
    peopleNum: [null,Validators.required],
  });

  lunchForm = this._fb.group({
    type: ["Lunch"],
    name: [null, Validators.required],
    date: [null,Validators.required],
    time: [null,Validators.required],
    coffee: [null,Validators.required],
    peopleNum: [null,Validators.required],
  });

  taxiForm = this._fb.group({
    date: [null,Validators.required],
    time: [null,Validators.required],
    peopleNum: [null,Validators.required],
    origin: [null,Validators.required],
    destination: [null,Validators.required],
    whoPays: [null,Validators.required]
  });


  constructor(
    private _dialogRef: MatDialogRef<CreateDialogComponent>,
    private _fb: FormBuilder,
    private _buService: BuService,
    private _visitService: VisitService,
    private _menuTypeService: MenuTypeService,
    private _menuRequestService: MenuRequestService,
    private _userService: UserService,
    private _requestService: RequestService,
    private _taxiRequestService: TaxiRequestService,
    private _zoneService: ZoneService,
    private _zoneRequestService: ZoneRequestService,
    private _projectService: ProjectService
  ) { 
    this.step3Form.get("tourNeeded")?.valueChanges.subscribe((selectedValue: any) => {
      this.tourNeeded = selectedValue;
      if (selectedValue == 1) {
        this.step3Form.get('tourResponsibleName')?.addValidators([Validators.required, Validators.maxLength(255)]);
        this.step3Form.get('tourResponsiblePhone')?.addValidators([Validators.required, Validators.maxLength(20)]);
        this.step3Form.controls['tourResponsibleName'].updateValueAndValidity();
        this.step3Form.controls['tourResponsiblePhone'].updateValueAndValidity();
      } else {
        this.step3Form.get('tourResponsibleName')?.clearValidators();
        this.step3Form.get('tourResponsiblePhone')?.clearValidators();
        this.step3Form.controls['tourResponsibleName'].updateValueAndValidity();
        this.step3Form.controls['tourResponsiblePhone'].updateValueAndValidity();
      }
    })
  }


  ngOnInit() {
    forkJoin([
      this._buService.getAll(),
      this._projectService.getAll(),
      this._visitService.getAll(),
      this._menuTypeService.getAll(),
      this._zoneService.getAll()
    ]).subscribe(
      ([busResponse, projectsResponse, visitsResponse, menusResponse, zonesResponse]: [IBuDTO[], IProjectDTO[], IVisitDTO[], IMenuTypeDTO[], IZoneDTO[]]) => {
        this.businessUnits = busResponse;
        this.projects = projectsResponse;
        this.visits = visitsResponse;
        this.breakfastMenus = menusResponse.filter(item => item.type == "Breakfast");
        this.lunchMenus = menusResponse.filter(item => item.type == "Lunch");
        this.zones = zonesResponse;
        this.loading = false;
      },
      error => {
        console.error('Error:', error);
      }
    )
  }

  addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  selected_chart(input: any, id: number) {
    if (input.checked) {
      this.zoneRequests.push(id);
    } else {
      const index = this.zoneRequests.indexOf(id);
      if (index > -1) {
        this.zoneRequests.splice(index, 1);
      }
    }
    console.log(this.zoneRequests);
  }

  closeDialog() {
    this._dialogRef.close();
  }

  createBreakfastMenu() {
    if (this.breakfastForm.valid) {
      const data = {
        type: 'Breakfast',
        date: this.breakfastForm.value.date,
        time: this.breakfastForm.value.time,
        name: this.breakfastForm.value.name,
        coffee: 0,
        peopleNum: this.breakfastForm.value.peopleNum,
      };

      this.breakfastRequests = [data, ...this.breakfastRequests];
      this.breakfastForm.reset();
      this.breakfastForm.markAsPristine();
      this.breakfastForm.markAsUntouched();
    }
  }

  createLunchMenu() {
    if (this.lunchForm.valid) {
      const data = {
        type: 'Lunch',
        date: this.lunchForm.value.date,
        time: this.lunchForm.value.time,
        name: this.lunchForm.value.name,
        coffee: this.lunchForm.value.coffee,
        peopleNum: this.lunchForm.value.peopleNum,
      };

      this.lunchRequests = [data, ...this.lunchRequests];
      this.lunchForm.reset();
      this.lunchForm.markAsPristine();
      this.lunchForm.markAsUntouched();
    }
    console.log(this.lunchRequests);
  }

  createTaxiMenu() {
    if (this.taxiForm.valid) {
      const data = {
        date: this.taxiForm.value.date,
        time: this.taxiForm.value.time,
        peopleNum: this.taxiForm.value.peopleNum,
        origin: this.taxiForm.value.origin,
        destination: this.taxiForm.value.destination,
        whoPays: this.taxiForm.value.whoPays,
      };

      this.taxiRequests = [data, ...this.taxiRequests];
      this.taxiForm.reset();
      this.taxiForm.markAsPristine();
      this.taxiForm.markAsUntouched();
    }
  }

  removeBreakfast(item: any) {
    const index = this.breakfastRequests.indexOf(item);
    if (index !== -1) {
      this.breakfastRequests.splice(index, 1);
    }
    this.breakfastRequests = [...this.breakfastRequests];
  }

  removeLunch(item: any) {
    const index = this.lunchRequests.indexOf(item);
    if (index !== -1) {
      this.lunchRequests.splice(index, 1);
    }
    this.lunchRequests = [...this.lunchRequests];
  }

  removeTaxi(item: any) {
    const index = this.taxiRequests.indexOf(item);
    if (index !== -1) {
      this.taxiRequests.splice(index, 1);
    }
    this.taxiRequests = [...this.taxiRequests];
  }
  

  onSubmit() {
    if (this.step1Form.valid &&
      this.step2Form.valid &&
      this.step3Form.valid) {

      Swal.isLoading();
      const data1 = this.step1Form.value;
      const data2 = this.step2Form.value;
      const data3 = this.step3Form.value;
      const menuRequests = [...this.breakfastRequests, ...this.lunchRequests];
      const taxiRequests = [...this.taxiRequests];

      const data = {
        applicant: this._userService.user.email,
        projectCode: (data1.projectCode || '').toUpperCase(),
        buId: data1.buId,
        creationDate: new Date(),

        visitorType: data2.visitorType,
        visitorCompanyName: data2.visitorCompanyName,
        coordinator: data2.coordinator,
        externalPeopleNum: data2.externalPeopleNum,
        internalPeopleNum: data2.internalPeopleNum,
        welcomeWithLogo: data2.welcomeWithLogo,
        invitationLetter: data2.invitationLetter,

        startDate: this.startDate,
        finishDate: this.finishDate,
        tourNeeded: data3.tourNeeded,
        tourResponsibleName: data3?.tourResponsibleName,
        tourResponsiblePhone: data3?.tourResponsiblePhone,
        comments: this.comments,
        status: 0
      };

      this._requestService.create(data).subscribe(response => {
        const requestId = response.data.id;
        console.log('menuRequests', menuRequests);
        if (menuRequests.length > 0) {
          this._menuRequestService.create(requestId, menuRequests).subscribe(response => {
            console.log(response);
          })
        }
        if (taxiRequests.length > 0) {
          this._taxiRequestService.create(requestId, taxiRequests).subscribe(response => {
            console.log(response);
          })
        }
        if (this.zoneRequests.length > 0) {
          this._zoneRequestService.create(requestId, this.zoneRequests).subscribe(response => {
            console.log(response);
          })
        }
        this._dialogRef.close(response);
        Swal.fire({
          title: 'Success!',
          text: 'Request added successfully!',
          icon: 'success',
          timer: 2300,
          confirmButtonColor: '#556add',
          customClass: {
            popup: 'swal-popup-success'
          }

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
}