import 'rxjs/add/operator/finally';

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { environment } from '../../../environments/environment';
import { Logger } from '../../core/logger.service';
import { I18nService } from '../../core/i18n.service';
import { AuthenticationService } from '../../core/authentication/authentication.service';

const log = new Logger('Activate');

@Component({
  selector: 'app-auth-activate',
  templateUrl: './auth-activate.component.html',
  styleUrls: ['./auth-activate.component.scss']
})
export class AuthActivateComponent implements OnInit {

  version: string = environment.version;
  error: string = null;
  loginForm: FormGroup;
  isLoading = false;

  constructor(private activeRouter: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private i18nService: I18nService,
    private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    const id = Number(this.activeRouter.snapshot.paramMap.get('id'));
    const code = this.activeRouter.snapshot.paramMap.get('code');

    if (id !== 0 && code !== null) {
      this.authenticationService.activate({ id: id, code: code })
        .finally(() => {
          this.router.navigate(['/auth/login'], { replaceUrl: true });
        })
        .subscribe(credentials => {
          log.debug(`${credentials.username} successfully logged in`);
        }, error => {
          log.debug(`Login error: ${error}`);
          this.error = error;
        });
    }
  }

}
