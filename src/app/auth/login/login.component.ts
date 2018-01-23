import { finalize } from 'rxjs/operators/finalize';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { environment } from '@env/environment';
import { AuthenticationService, I18nService, Logger } from '@app/core';
import { Alert } from '@app/models';

const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  version: string = environment.version;
  error: string = null;
  loginForm: FormGroup;
  isLoading = false;
  alert: Alert;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private i18nService: I18nService,
    private authenticationService: AuthenticationService) {
    this.createForm();
    this.alert = { type: 'danger', msg: '', active: false };
  }

  ngOnInit() { }

  login() {
    this.isLoading = true;
    this.authenticationService.login(this.loginForm.value)
      .pipe(finalize(() => {
        this.loginForm.markAsPristine();
        this.isLoading = false;
      }))
      .subscribe(credentials => {
        log.debug(`${credentials.username} successfully logged in`);
        this.router.navigate(['/'], { replaceUrl: true });
      }, error => {
        log.debug(`Login error: ${error}`);
        this.alert = { type: 'danger', msg: JSON.parse(error._body).message, active: true };
      });
  }

  closeAlert(alert: Alert) {
    this.alert = { type: '', msg: '', active: false };
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true
    });
  }

}
