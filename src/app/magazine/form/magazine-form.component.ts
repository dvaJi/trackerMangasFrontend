import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Observable';

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Logger } from '../../core/logger.service';

import Magazine from './../../models/magazine';
import Publisher from '../../models/publisher';

import { MagazineService } from './../../services/magazine.service';

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
  circulation: Date = new Date();
  d: Object;
  isLicensed: boolean;
  searching = false;
  searchFailed = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);

  constructor(private magazineService: MagazineService) { }

  ngOnInit() {
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
    this.magazineService.setMagazine(magazine)
      .subscribe(credentials => {
        console.log(credentials);
      }, error => {
        log.debug(`Error al añadir magazine: ${error}`);
      });
  }

  /*
  * Obtener Observable de los publishers según búsqueda
  */
  getPublishers = (text$: Observable<string>) =>
    text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => this.searching = true)
      .switchMap(term =>
        this.magazineService.getPublisher({ q: term, limit: 10 })
          .do(() => this.searchFailed = false)
          .catch(() => {
            this.searchFailed = true;
            return Observable.of([]);
          }))
      .do(() => this.searching = false)
      .merge(this.hideSearchingWhenUnsubscribed)

  /*
  * Formatea el objeto dentro del input
  */
  formatter = (x: Publisher) => x.name;

}
