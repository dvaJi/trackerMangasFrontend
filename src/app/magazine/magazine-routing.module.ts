import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../core/route.service';
import { extract } from '../core/i18n.service';
import { MagazineComponent } from './magazine.component';
import { MagazineFormComponent } from './form/magazine-form.component';

const routes: Routes = Route.withShell([
  { path: 'magazine', component: MagazineComponent, data: { title: extract('Magazines') } },
  { path: 'magazine/add', pathMatch: 'full', component: MagazineFormComponent, data: { title: extract('Add Magazine')}},
  { path: 'magazine/:id/:stub', component: MagazineComponent, data: { title: extract('Magazine') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class MagazineRoutingModule { }
