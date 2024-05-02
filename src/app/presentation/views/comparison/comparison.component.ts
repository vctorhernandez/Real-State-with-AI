import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.scss']
})
export class ComparsionComponent implements OnInit{

  loading: boolean = true;
  products:any[] = ['', '']
  selectedProductId: number = 0;
  
  ngOnInit(){
    this.loading = false;
  }

  onProductSelected(item: any){

  }
}
