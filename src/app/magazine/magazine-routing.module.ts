import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../core/route.service';
import { extract } from '../core/i18n.service';
import { MagazineListComponent } from './list/magazine-list.component';
import { MagazineDetailComponent } from './detail/magazine-detail.component';
import { MagazineFormComponent } from './form/magazine-form.component';

const routes: Routes = Route.withShell([
  { path: 'magazine', component: MagazineListComponent, data: { title: extract('Magazines') } },
  { path: 'magazine/add', pathMatch: 'full', component: MagazineFormComponent, data: { title: extract('Add Magazine')}},
  { path: 'magazine/:id/:stub', component: MagazineDetailComponent, data: { title: extract('Magazine') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class MagazineRoutingModule { }
