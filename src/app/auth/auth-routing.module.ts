import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '../core/i18n.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotComponent } from './forgot/forgot.component';

const routes: Routes = [
    { path: 'auth/login', component: LoginComponent, data: { title: extract('Login') } },
    { path: 'auth/register', component: RegisterComponent, data: { title: extract('Register') } },
    { path: 'auth/forgot', component: ForgotComponent, data: { title: extract('Forgot') } }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class AuthRoutingModule { }
