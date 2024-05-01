import { CommonModule } from "@angular/common";
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { MaterialModule } from "../app-material.module";
import { RoutingModule } from "../presentation/routing/routing.module";
import { RequestFilterComponent } from "./request-filter/request-filter.component";
import { RequestTableComponent } from "./request-table/request-table.component";
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
      CommonModule,
      MaterialModule,
      FormsModule
  ],
  exports: [RoutingModule, RequestFilterComponent, RequestTableComponent],
  declarations: [  
    RequestFilterComponent,
    RequestTableComponent
  ], providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es-ES'
     },
     {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'EUR'
    },
]})
export class SharedModule {}
