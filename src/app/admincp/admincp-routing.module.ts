import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PendingsComponent } from './pendings/pendings.component';
import { AuthenticationGuard } from '../core/authentication/authentication.guard';
import { DetailPendingsComponent } from './pendings/detail/detail-pendings.component';

const routes: Routes = Route.withShell([
    { path: 'admincp', redirectTo: '/admincp/dashboard', pathMatch: 'full' },
    {
        path: 'admincp/dashboard',
        pathMatch: 'full',
        component: DashboardComponent,
        data: { title: extract('Dashboard') },
        canActivate: [AuthenticationGuard]
    },
    {
        path: 'admincp/pendings/:module/:id',
        pathMatch: 'full',
        component: DetailPendingsComponent,
        data: { title: extract('Pendientes') },
        canActivate: [AuthenticationGuard]
    },
    {
        path: 'admincp/pendings',
        pathMatch: 'full',
        component: PendingsComponent,
        data: { title: extract('Pendientes') },
        canActivate: [AuthenticationGuard]
    }
]);

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class AdminCPRoutingModule { }
