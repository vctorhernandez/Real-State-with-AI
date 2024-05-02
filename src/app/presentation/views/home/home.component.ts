import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IRequestDTO } from '../../../services/requests/request.domain';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loading: boolean = true;
  properties: any[] = [
    {name: 'Office 1 Title', price: '$500 / month', image: './../../../../assets/img/card.jpg'}, 
    {name: 'Office 2 Title', price: '$750 / month', image: './../../../../assets/img/card.jpg'}, 
    {name: 'Office 3 Title', price: '$1200 / month', image: './../../../../assets/img/card.jpg'}, 
    {name: 'Office 4 Title', price: '$350 / month', image: './../../../../assets/img/card.jpg'}
  ]  
  
  constructor() {}

  ngOnInit(): void {
    this.loading = false;
  }
}
