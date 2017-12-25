import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Observable';

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Logger } from '../../core/logger.service';
import Staff from './../../models/staff';
import Magazine from './../../models/magazine';
import Genre from './../../models/genre';
import Serie from './../../models/serie';
import Demographic from './../../models/demographic';

import { SerieService } from './../../services/serie.service';
import { StaffService } from './../../services/staff.service';
import { MagazineService } from './../../services/magazine.service';

const log = new Logger('Serie Add');

@Component({
  selector: 'app-serie-form',
  templateUrl: './serie-form.component.html',
  styleUrls: ['./serie-form.component.scss']
})

export class SerieFormComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  myform: FormGroup;

  staff: any;
  genres: Genre[];
  magazines: any;
  demographics: Demographic[];
  types: string[];
  isLoading: boolean;
  publicationDate: Date = new Date();
  d: Object;
  isLicensed: boolean;
  formAlert: { active: boolean, msg: string, type: string };

  constructor(
    private serieService: SerieService,
    private staffService: StaffService,
    private magazineService: MagazineService
  ) { }

  ngOnInit() {
    this.getGenres();
    this.getDemographics();
    this.myform = new FormGroup({
      name: new FormControl(),
      altNames: new FormControl(),
      type: new FormControl(),
      description: new FormControl(),
      author: new FormControl(),
      artist: new FormControl(),
      magazine: new FormControl(),
      statusOC: new FormControl(),
      statusOCNote: new FormControl(),
      statusSC: new FormControl(),
      publicationDate: new FormControl(),
      licensedPublisher: new FormControl(),
      licensedLanguage: new FormControl(),
      demographic: new FormControl(),
      cover: new FormControl(),
      genres: new FormControl()
    });
    this.types = ['Manga', 'Manhwa', 'Manhua', 'Artbook', 'Doujinshi', 'Drama CD', 'Novela Ligera'];

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
    const serie: Serie = this.myform.value;
    serie.genres = this.genresSelected;
    this.serieService.setSerie(serie)
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
        log.debug(`Error al añadir serie: ${error}`);
      });
  }

  public closeAlert(alert: { active: boolean, msg: string }) {
    this.formAlert = { active: false, msg: '', type: '' };
  }

  get genresSelected(): Genre[] {
    return this.genres
      .filter(opt => opt.checked);
  }

  /*
  * Obtener Observable de staff según búsqueda
  */
  public getStaff = (text: string): Observable<Response> => {
    return this.staffService.getStaffsByName({ q: text, limit: 10 });
  }

  /*
  * Obtener Observable de revistas según búsqueda
  */
  public getMagazines = (text: string): Observable<Magazine> => {
    return this.magazineService.searchMagazine({ q: text, limit: 10 });
  }

  private getGenres() {
    if (!this.genres) {
      this.serieService.getGenres()
        .finally(() => {
          this.isLoading = false;
        })
        .subscribe((genres: Genre[]) => { this.genres = genres; });
    }
  }

  private getDemographics() {
    if (!this.demographics) {
      this.serieService.getDemographics()
        .finally(() => {
          this.isLoading = false;
        })
        .subscribe((demographics: Demographic[]) => { this.demographics = demographics; });
    }
  }

}
