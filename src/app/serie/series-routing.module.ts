import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { SeriesComponent } from './list/series.component';
import { SeriesDetailComponent } from './containers/detail/series-detail.component';
import { SerieFormComponent } from './containers/form/serie-form.component';
import { AuthenticationGuard } from '../core/authentication/authentication.guard';

const routes: Routes = Route.withShell([
  { path: 'serie', component: SeriesComponent, pathMatch: 'full' },
  {
    path: 'serie/add',
    pathMatch: 'full',
    component: SerieFormComponent,
    data: { title: extract('Add Serie') },
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'serie/edit/:id',
    pathMatch: 'full',
    component: SerieFormComponent,
    data: { title: extract('Edit Serie') },
    canActivate: [AuthenticationGuard]
  },
  { path: 'serie/:id/:stub', component: SeriesDetailComponent, data: { title: extract('Series') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class SeriesRoutingModule {}
