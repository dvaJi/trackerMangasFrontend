import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../core/route.service';
import { extract } from '../core/i18n.service';
import { BrowseComponent } from './browse.component';

const routes: Routes = Route.withShell([
  { path: 'serie', component: BrowseComponent, data: { title: extract('Serie') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class BrowseRoutingModule { }
