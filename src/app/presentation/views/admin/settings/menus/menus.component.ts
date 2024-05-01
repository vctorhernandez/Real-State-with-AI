import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MenuTypeService } from '../../../../../services/menu-types/menu-type.service';
import { IMenuTypeDTO } from '../../../../../services/menu-types/menu-type.domain';
import Swal from 'sweetalert2';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})
export class MenusComponent {
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: MatTableDataSource<IMenuTypeDTO> = new MatTableDataSource<IMenuTypeDTO>([]);
  allMenus: any;
  displayedColumns: string[] = ['name', 'type', 'Delete'];

  loading: boolean = true;
  creationform = new FormGroup({
    name: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    active: new FormControl(1)
  });

  constructor(private _menuTypeService: MenuTypeService) {}


  ngOnInit(): void {
    this._menuTypeService.getAll().subscribe((data) => {
      this.allMenus = data;
      this.dataSource = new MatTableDataSource<IMenuTypeDTO>(this.allMenus);
      this.dataSource.sort = this.sort;
      this.loading = false;
    });
  }

  create(){
    if (this.creationform.valid) {
      this._menuTypeService.create(this.creationform.value).subscribe((data) => {
        Swal.fire({
          title: "Good job!",
          text: "Menu was created!",
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
        this._menuTypeService.deactivate(id).subscribe(
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
