import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { StaffComponent } from './list/staff.component';
import { StaffDetailComponent } from './detail/staff-detail.component';
import { StaffFormComponent } from './form/staff-form.component';

import { AuthenticationGuard } from '../core/authentication/authentication.guard';

const routes: Routes = Route.withShell([
  { path: 'staff', component: StaffComponent, data: { title: extract('Staffs') } },
  {
    path: 'staff/add',
    pathMatch: 'full',
    component: StaffFormComponent,
    data: { title: extract('Add Staff') },
    canActivate: [AuthenticationGuard]
  },
  { path: 'staff/:id/:stub', component: StaffDetailComponent, data: { title: extract('Staff') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class StaffRoutingModule { }
