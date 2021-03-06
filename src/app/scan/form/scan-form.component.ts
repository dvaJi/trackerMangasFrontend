import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Logger } from '@app/core';
import { Scan } from '@app/models';
import { ScanService } from '@app/services';

const log = new Logger('Scan Add');

@Component({
  selector: 'app-scan-form',
  templateUrl: './scan-form.component.html',
  styleUrls: ['./scan-form.component.scss']
})

export class ScanFormComponent implements OnInit {
  myform: FormGroup;

  publishers: any;
  scans: any;
  types: string[];
  schedules: Array<string>;
  isLoading: boolean;
  creationDate: Date = new Date();
  d: Object;
  isLicensed: boolean;
  formAlert: { active: boolean, msg: string, type: string };

  constructor(private scanService: ScanService) { }

  ngOnInit() {
    this.myform = new FormGroup({
      name: new FormControl(),
      description: new FormControl(),
      creationDate: new FormControl(),
      website: new FormControl(),
      twitter: new FormControl(),
      facebook: new FormControl(),
      cover: new FormControl()
    });

    this.formAlert = {
      active: false,
      msg: '',
      type: ''
    };
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const filesTypeAllowed: Array<string> = ['image/png', 'image/jpeg'];

      if (!filesTypeAllowed.includes(file.type)) {
        throw new Error('Archivo no permitido');
      }
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.myform.get('cover').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        });
      };
    }
  }

  onSubmit() {
    const scan: Scan = this.myform.value;
    this.scanService.setScan(scan)
    .subscribe((response: any) => {
      this.formAlert = {
        active: true,
        msg: response.message,
        type: 'success'
      };
    }, error => {
      this.formAlert = {
        active: true,
        msg: JSON.parse(error._body).message,
        type: 'danger'
      };
      log.debug(`Error al añadir scan: ${error}`);
    });
  }

  public closeAlert(alert: { active: boolean, msg: string }) {
    this.formAlert = { active: false, msg: '', type: '' };
  }

}
