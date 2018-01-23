import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { BrowseComponent } from './browse.component';

const routes: Routes = Route.withShell([
  { path: 'browse', component: BrowseComponent, data: { title: extract('Browse') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class BrowseRoutingModule { }
