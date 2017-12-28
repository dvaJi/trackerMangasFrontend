import { distinctUntilChanged, debounceTime, tap, switchMap, merge, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Logger } from '../../core/logger.service';

import { ReleaseService } from './../../services/release.service';
import { ScanService } from './../../services/scan.service';
import { SerieService } from './../../services/serie.service';

import Scan from '../../models/scan';
import Serie from '../../models/serie';
import Release from './../../models/release';
import Demographic from './../../models/demographic';

const log = new Logger('Releases Add');

@Component({
  selector: 'app-serie-form',
  templateUrl: './releases-form.component.html',
  styleUrls: ['./releases-form.component.scss']
})

export class ReleasesFormComponent implements OnInit {
  myform: FormGroup;

  series: any;
  scans: any;
  types: string[];
  isLoading: boolean;
  publicationDate: Date = new Date();
  d: Object;
  isLicensed: boolean;
  searching = false;
  searchFailed = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);
  formAlert: { active: boolean, msg: string, type: string };

  constructor(
    private releaseService: ReleaseService,
    private serieService: SerieService,
    private scanService: ScanService) { }

  ngOnInit() {
    this.myform = new FormGroup({
      serie: new FormControl(),
      scans: new FormControl(),
      volume: new FormControl(),
      chapter: new FormControl(),
      publicationDate: new FormControl()
    });

    this.formAlert = {
      active: false,
      msg: '',
      type: ''
    };
  }

  onSubmit() {
    const release: Release = this.myform.value;
    this.releaseService.setRelease(release)
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
        log.debug(`Error al añadir release: ${error}`);
      });
  }

  /*
  * Obtener Observable de staff según búsqueda
  */
  getSeries = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.serieService.searchSeries({ q: term, limit: 10 })
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
  formatter = (x: Serie) => x.name;

  /*
  * Obtener Observable de staff según búsqueda
  */
  public getScans = (text: string): Observable<Scan> => {
    return this.scanService.searchScans({ q: text, limit: 10 });
  }

  public closeAlert(alert: { active: boolean, msg: string }) {
    this.formAlert = { active: false, msg: '', type: '' };
  }

}
