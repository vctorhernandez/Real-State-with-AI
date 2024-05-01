import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { registerLocaleData } from '@angular/common';
import { NgModule, LOCALE_ID, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { RoutingModule } from "../routing/routing.module";
import { LayoutsModule } from "../layouts/layouts.module";
import { MaterialModule } from "../../app-material.module";
import { HomeComponent } from "./home/home.component";
import localeES from '@angular/common/locales/es';
import { SharedModule } from "../../shared/shared.module";
import { DetailsComponent } from "./details/details.component";
import { ApprovalsComponent } from "./approvals/approvals.component";
import { CreateDialogComponent } from "./home/create-dialog/create-dialog.component";
import { AllRequestsComponent } from "./admin/all-requests/all-requests.component";
import { SettingsComponent } from "./admin/settings/settings.component";
import { RoomsComponent } from "./admin/settings/rooms/rooms.component";
import { VisitsComponent } from "./admin/settings/visits/visits.component";
import { MenusComponent } from "./admin/settings/menus/menus.component";
import { RoomsDialogComponent } from './details/rooms-dialog/rooms-dialog.component';
import { MAT_DATE_LOCALE } from "@angular/material/core";

// Register the localization
registerLocaleData(localeES, 'es-ES');


@NgModule({
  imports: [
    CommonModule,
    RoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    LayoutsModule,
    SharedModule
  ],
  exports: [RoutingModule],
  declarations: [
    HomeComponent,
    CreateDialogComponent,
    DetailsComponent,
    ApprovalsComponent,
    AllRequestsComponent,
    SettingsComponent,
    RoomsComponent,
    VisitsComponent,
    MenusComponent,
    RoomsDialogComponent
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    {
      provide: LOCALE_ID,
      useValue: 'es-ES'
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'EUR'
    },
  ]})
export class PresentationModule { }
