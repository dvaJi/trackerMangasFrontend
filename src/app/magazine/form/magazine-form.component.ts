import { distinctUntilChanged, debounceTime, tap, switchMap, merge, catchError } from 'rxjs/operators';
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
  formAlert: { active: boolean, msg: string, type: string };

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
    const magazine: Magazine = this.myform.value;
    this.magazineService.setMagazine(magazine)
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
        log.debug(`Error al añadir magazine: ${error}`);
      });
  }

  /*
  * Obtener Observable de los publishers según búsqueda
  */
  getPublishers = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.magazineService.getPublisher({ q: term, limit: 10 })
          .pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return Observable.of([]);
          }))
      ),
      tap(() => this.searching = false),
      merge(this.hideSearchingWhenUnsubscribed)
    )

  /*
  * Formatea el objeto dentro del input
  */
  formatter = (x: Publisher) => x.name;

  public closeAlert(alert: { active: boolean, msg: string }) {
    this.formAlert = { active: false, msg: '', type: '' };
  }

}
