import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Logger } from '../../core/logger.service';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import { Magazine } from '../../shared/model/magazine';

import { MagazineService } from '../magazine.service';

const log = new Logger('Magazine Add');

@Component({
  selector: 'app-magazine-form',
  templateUrl: './magazine-form.component.html',
  styleUrls: ['./magazine-form.component.scss']
})

export class MagazineFormComponent implements OnInit {
  myform: FormGroup;

  publishers: any;
  scans: any;
  types: string[];
  schedules: Array<string>;
  isLoading: boolean;
  circulation: DateModel;
  datePickerOptions: DatePickerOptions;
  isLicensed: boolean;

  constructor(private magazineService: MagazineService) {
    this.datePickerOptions = new DatePickerOptions();
  }

  ngOnInit() {
    this.getPublishers();
    this.schedules = ['Semanal', 'Quincenal', 'Mensual', 'Bi-mensual'];
    this.myform = new FormGroup({
      name: new FormControl(),
      nameAltInput: new FormControl(),
      publisher: new FormControl(),
      circulation: new FormControl(),
      releaseSchedule: new FormControl(),
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
    const magazine: Magazine = this.myform.value;
    console.log(magazine);
    this.magazineService.setMagazine(magazine)
    .subscribe(credentials => {
      console.log(credentials);
    }, error => {
      log.debug(`Error al añadir magazine: ${error}`);
    });
  }

  getPublishers() {
    this.isLoading = true;
    this.magazineService.getPublisher().
      finally(() => {
        this.isLoading = false;
      }).
      subscribe((publishers: any) => { this.publishers = publishers; });
  }

}
