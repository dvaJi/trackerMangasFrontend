import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../core/route.service';
import { extract } from '../core/i18n.service';
import { StaffComponent } from './staff.component';
import { StaffFormComponent } from './form/staff-form.component';

const routes: Routes = Route.withShell([
  { path: 'staff', component: StaffComponent, data: { title: extract('Staffs') } },
  { path: 'staff/add', pathMatch: 'full', component: StaffFormComponent, data: { title: extract('Add Staff')}},
  { path: 'staff/:id/:stub', component: StaffComponent, data: { title: extract('Staff') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class StaffRoutingModule { }
