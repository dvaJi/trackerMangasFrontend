import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../core/route.service';
import { extract } from '../core/i18n.service';
import { ScanListComponent } from './list/scan-list.component';
import { ScanDetailComponent } from './detail/scan-detail.component';
import { ScanFormComponent } from './form/scan-form.component';
import { AuthenticationGuard } from '../core/authentication/authentication.guard';

const routes: Routes = Route.withShell([
  { path: 'scan', component: ScanListComponent, data: { title: extract('Scans') } },
  {
    path: 'scan/add',
    pathMatch: 'full',
    component: ScanFormComponent,
    data: { title: extract('Add Scan') },
    canActivate: [AuthenticationGuard]
  },
  { path: 'scan/:id/:stub', component: ScanDetailComponent, data: { title: extract('Scan') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ScanRoutingModule { }
