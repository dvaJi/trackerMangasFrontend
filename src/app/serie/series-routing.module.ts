import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../core/route.service';
import { extract } from '../core/i18n.service';
import { SeriesComponent } from './series.component';
import { SerieFormComponent } from './form/serie-form.component';

const routes: Routes = Route.withShell([
  { path: 'serie', redirectTo: '/browse', pathMatch: 'full' },
  { path: 'serie/add', pathMatch: 'full', component: SerieFormComponent, data: { title: extract('Add Serie')}},
  { path: 'serie/:id', component: SeriesComponent, data: { title: extract('Series') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class SeriesRoutingModule { }
