import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../core/route.service';
import { extract } from '../core/i18n.service';
import { ReleasesComponent } from './releases.component';
import { ReleasesFormComponent } from './form/releases-form.component';

const routes: Routes = Route.withShell([
  { path: 'releases', component: ReleasesComponent, data: { title: extract('Releases') } },
  { path: 'releases/add', pathMatch: 'full', component: ReleasesFormComponent, data: { title: extract('Add Release')}}
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ReleasesRoutingModule { }
