import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../core/route.service';
import { extract } from '../core/i18n.service';
import { ScanComponent } from './scan.component';
import { ScanFormComponent } from './form/scan-form.component';

const routes: Routes = Route.withShell([
  { path: 'scan', component: ScanComponent, data: { title: extract('Scans') } },
  { path: 'scan/add', pathMatch: 'full', component: ScanFormComponent, data: { title: extract('Add Scan')}},
  { path: 'scan/:id/:stub', component: ScanComponent, data: { title: extract('Scan') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ScanRoutingModule { }
