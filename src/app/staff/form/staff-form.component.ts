import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Logger } from '../../core/logger.service';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import { Staff } from '../../shared/model/staff';

import { StaffService } from '../staff.service';

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
  birthDate: DateModel;
  datePickerOptions: DatePickerOptions;
  isLicensed: boolean;

  constructor(private staffService: StaffService) {
    this.datePickerOptions = new DatePickerOptions();
  }

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
    console.log(staff);
    this.staffService.setStaff(staff)
    .subscribe(credentials => {
      console.log(credentials);
    }, error => {
      log.debug(`Error al añadir staff: ${error}`);
    });
  }

  public getStaff() {
    if ((!this.series) && !this.isLoading) {
      this.isLoading = true;
      this.staffService.getStaff()
      .finally(() => {
        this.isLoading = false;
        this.series = this.seriesNamesToChipsObject(this.series);
      })
      .subscribe((series: any) => { this.series = series; });
    }
  }

  /* Convierte el array con los valores necesarios para los chips */
  seriesNamesToChipsObject(lista: any[]) {
    const nuevaLista: any = [];
    lista.forEach(serie => {
      for (const name in serie.names) {
        if (name !== null) {
          const obj = {
            value: serie.id,
            display: serie.names[name].name
          };
          nuevaLista.push(obj);
        }
      }
    });

    return nuevaLista;
  }

  toChipsObject(lista: any[]) {
    const nuevaLista: any = [];
    lista.forEach(objeto => {
      const obj = {
        value: objeto.id,
        display: objeto.name
      };
      nuevaLista.push(obj);
    });

    return nuevaLista;
  }

}
