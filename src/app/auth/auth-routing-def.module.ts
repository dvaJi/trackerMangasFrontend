import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { AuthActivateComponent } from './activate/auth-activate.component';

const routes: Routes = Route.withShell([
    { path: 'auth/activate/:id/:code', component: AuthActivateComponent, data: { title: extract('Activate') } },
    { path: 'auth/activate', component: AuthActivateComponent, data: { title: extract('Activate') } }
]);

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class AuthDefRoutingModule { }
