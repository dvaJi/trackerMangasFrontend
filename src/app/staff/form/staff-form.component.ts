import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Observable';

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Logger } from '../../core/logger.service';
import Staff from './../../models/staff';

import { StaffService } from './../../services/staff.service';

const log = new Logger('Staff Add');

@Component({
  selector: 'app-staff-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.scss']
})

export class StaffFormComponent implements OnInit {
  myform: FormGroup;

  series: any;
  scans: any;
  types: string[];
  isLoading: boolean;
  birthDate: Date = new Date();
  d: Object;
  isLicensed: boolean;
  formAlert: { active: boolean, msg: string, type: string };

  constructor(private staffService: StaffService) { }

  ngOnInit() {
    this.myform = new FormGroup({
      name: new FormControl(),
      altNames: new FormControl(),
      birthPlace: new FormControl(),
      birthDate: new FormControl(),
      gender: new FormControl(),
      description: new FormControl(),
      website: new FormControl(),
      twitter: new FormControl(),
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
    const staff: Staff = this.myform.value;
    this.staffService.setStaff(staff)
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
      log.debug(`Error al añadir staff: ${error}`);
    });
  }

  /*
  * Obtener Observable de staff según búsqueda
  */
  public getStaff = (text: string): Observable<Response> => {
    return this.staffService.getStaffsByName({ q: text, limit: 10 });
  }

  public closeAlert(alert: { active: boolean, msg: string }) {
    this.formAlert = { active: false, msg: '', type: '' };
  }

}
