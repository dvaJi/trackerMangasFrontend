import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../core/route.service';
import { extract } from '../core/i18n.service';
import { SeriesComponent } from './list/series.component';
import { SeriesDetailComponent } from './detail/series-detail.component';
import { SerieFormComponent } from './form/serie-form.component';

const routes: Routes = Route.withShell([
  { path: 'serie', component: SeriesComponent, pathMatch: 'full' },
  { path: 'serie/add', pathMatch: 'full', component: SerieFormComponent, data: { title: extract('Add Serie')}},
  { path: 'serie/:id/:stub', component: SeriesDetailComponent, data: { title: extract('Series') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class SeriesRoutingModule { }
