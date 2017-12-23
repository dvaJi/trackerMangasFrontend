import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthDefRoutingModule } from './auth-routing-def.module';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotComponent } from './forgot/forgot.component';
import { AuthActivateComponent } from './activate/auth-activate.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    NgbModule,
    AuthRoutingModule,
    AuthDefRoutingModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthActivateComponent,
    ForgotComponent
  ]
})
export class AuthModule { }
