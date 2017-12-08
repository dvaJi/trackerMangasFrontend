import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Logger } from '../../core/logger.service';
import Release from './../../models/release';
import Demographic from './../../models/demographic';

import { ReleaseService } from './../../services/release.service';
import { ScanService } from './../../services/scan.service';
import { SerieService } from './../../services/serie.service';
import Scan from '../../models/scan';
import Serie from '../../models/serie';

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
  }

  onSubmit() {
    const release: Release = this.myform.value;
    console.log(release);
    this.releaseService.setRelease(release)
      .subscribe(credentials => {
        console.log(credentials);
      }, error => {
        log.debug(`Error al añadir release: ${error}`);
      });
  }

  /*
  * Obtener Observable de staff según búsqueda
  */
  public getSeries = (text: string): Observable<Serie> => {
    return this.serieService.searchSeries({ q: text, limit: 10 });
  }

  /*
  * Obtener Observable de staff según búsqueda
  */
  public getScans = (text: string): Observable<Scan> => {
    return this.scanService.searchScans({ q: text, limit: 10 });
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
