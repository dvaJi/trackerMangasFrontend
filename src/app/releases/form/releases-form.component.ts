import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Logger } from '../../core/logger.service';
import { DatepickerOptions } from 'ng2-datepicker';
import { Release } from '../release';
import { Demographic } from '../../shared/model/demographic';

import { ReleaseService } from '../release.service';
import { SerieService } from '../../serie/serie.service';

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
  datePickerOptions: DatepickerOptions = {
    minYear: 1960,
    maxYear: 2018,
    displayFormat: 'D MMM [,] YYYY',
    barTitleFormat: 'MMMM YYYY',
    firstCalendarDay: 1
  };
  isLicensed: boolean;

  constructor(private releaseService: ReleaseService, private serieService: SerieService) { }

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

  public getSeries() {
    if ((!this.series) && !this.isLoading) {
      this.isLoading = true;
      this.serieService.getSeries({type: 'Manga', order: 'created'})
      .finally(() => {
        this.isLoading = false;
        this.series = this.seriesNamesToChipsObject(this.series);
      })
      .subscribe((series: any) => { this.series = series; });
    }
  }

  public getScans() {
    if ((!this.scans) && !this.isLoading) {
      this.isLoading = true;
      this.releaseService.getScans()
      .finally(() => {
        this.isLoading = false;
        this.scans = this.toChipsObject(this.scans);
      })
      .subscribe((scans: any) => { this.scans = scans; });
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
