import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { ReleasesComponent } from './releases.component';
import { ReleasesFormComponent } from './form/releases-form.component';
import { AuthenticationGuard } from '../core/authentication/authentication.guard';

const routes: Routes = Route.withShell([
  { path: 'releases', component: ReleasesComponent, data: { title: extract('Releases') } },
  {
    path: 'releases/add',
    pathMatch: 'full',
    component: ReleasesFormComponent,
    data: { title: extract('Add Release') },
    canActivate: [AuthenticationGuard]
  }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ReleasesRoutingModule { }
