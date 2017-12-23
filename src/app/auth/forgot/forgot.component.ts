import 'rxjs/add/operator/finally';

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Logger } from '../../core/logger.service';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { Alert } from '../../models/alert';

const log = new Logger('Register');

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  forgotForm: FormGroup;
  hideForgotForm = true;
  resetPasswordForm: FormGroup;
  hideResetPasswordForm = true;
  resetCode: string;
  isLoading = false;
  alert: Alert;

  constructor(private router: Router,
    private activeRouter: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService) {
    this.createForgotForm();
    this.createResetPasswordForm();
    this.selectForm();
    this.alert = { type: 'danger', msg: '', active: false };
  }

  ngOnInit() { }

  forgot() {
    this.isLoading = true;
    this.authenticationService.forgot(this.forgotForm.value)
      .finally(() => {
        this.forgotForm.markAsPristine();
        this.isLoading = false;
      })
      .subscribe(credentials => {
        this.alert = { type: 'success', msg: credentials.message, active: true };
      }, error => {
        log.error(`${error}`);
        this.alert = { type: 'danger', msg: JSON.parse(error._body).message, active: true };
      });
  }

  resetPassword() {
    this.isLoading = true;
    this.authenticationService.resetPassword(this.resetPasswordForm.value)
      .finally(() => {
        this.resetPasswordForm.markAsPristine();
        this.isLoading = false;
      })
      .subscribe(credentials => {
        this.alert = { type: 'success', msg: credentials.message, active: true };
        this.router.navigate(['/auth/login'], { replaceUrl: true });
      }, error => {
        log.debug(`${error}`);
        this.alert = { type: 'danger', msg: JSON.parse(error._body).message, active: true };
      });
  }

  closeAlert(alert: Alert) {
    this.alert = { type: '', msg: '', active: false };
  }

  private createForgotForm() {
    this.forgotForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  private createResetPasswordForm() {
    this.resetPasswordForm = this.formBuilder.group({
      code: ['', Validators.required],
      password: ['', [
        Validators.minLength(6),
        Validators.maxLength(25),
        Validators.required
      ]],
      repassword: ['', [
        Validators.minLength(6),
        Validators.maxLength(25),
        Validators.required
      ]]
    });
  }

  private selectForm() {
    // Valida el parámetro para saber que formulario debe desplegar
    this.activeRouter.queryParams
    .subscribe(params => {
      if (params['code'] !== undefined && params['code'] !== null) {
        this.resetCode = params['code'];
        this.resetPasswordForm.controls['code'].setValue(this.resetCode);
        this.hideForgotForm = true;
        this.hideResetPasswordForm = false;
      } else {
        this.hideForgotForm = false;
        this.hideResetPasswordForm = true;
      }
    });
  }

}
