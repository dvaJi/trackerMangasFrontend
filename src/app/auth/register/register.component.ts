import { finalize } from 'rxjs/operators/finalize';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Logger } from '../../core/logger.service';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { Alert } from '../../models/alert';

const log = new Logger('Register');

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  isLoading = false;
  alert: Alert;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService) {
    this.createForm();
    this.alert = { type: 'danger', msg: '', active: false };
  }

  ngOnInit() { }

  register() {
    this.isLoading = true;
    this.authenticationService.register(this.registerForm.value)
      .pipe(finalize(() => {
        this.registerForm.markAsPristine();
        this.isLoading = false;
      }))
      .subscribe(response => {
        this.alert = { type: 'success', msg: response, active: true };
        this.router.navigate(['/auth/activate'], { replaceUrl: true });
      }, error => {
        log.debug(`Register error: ${error}`);
        this.alert = { type: 'danger', msg: JSON.parse(error._body).message, active: true };
      });
  }

  closeAlert(alert: Alert) {
    this.alert = { type: '', msg: '', active: false };
  }

  private createForm() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
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

}
