import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from '../layouts/pages.component';
import { HomeComponent } from '../views/home/home.component';
import { ComparsionComponent } from '../views/comparison/comparison.component';
import { AllRequestsComponent } from '../views/admin/all-requests/all-requests.component';
import { SettingsComponent } from '../views/admin/settings/settings.component';
import { LoginComponent } from '../views/login/login.component';
import { DetailsComponent } from '../views/details/details.component';
import { LoginGuard } from '../../core/guards/login.guard';
import { PropertyIdeasComponent } from '../views/property-ideas/property-ideas.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    // canActivate: [LoginGuard],
    children: [
      {
        path: '', redirectTo: '/home', pathMatch: 'full'
      },
      {
        path: 'home', component: HomeComponent
      },
      {
        path: 'comparison', component: ComparsionComponent
      },
      {
        path: 'property-ideas', component: PropertyIdeasComponent
      },
      {
        path: 'admin/allRequests', component: AllRequestsComponent
      },
      {
        path: 'admin/settings', component: SettingsComponent
      },
      {
        path: 'details/:id',
        component: DetailsComponent
      },
    ]
  },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: '**', component: LoginComponent, pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
