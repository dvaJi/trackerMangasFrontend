import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Logger } from '../../core/logger.service';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import { Staff } from '../../shared/model/staff';
import { Magazine } from '../../shared/model/magazine';
import { Genre } from '../../shared/model/genre';
import { Serie } from '../../shared/model/serie';
import { Demographic } from '../../shared/model/demographic';

import { SerieService } from '../serie.service';

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
  publicationDate: DateModel;
  datePickerOptions: DatePickerOptions;
  isLicensed: boolean;

  constructor(private serieService: SerieService) {
    this.datePickerOptions = new DatePickerOptions();
  }

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
    .subscribe(credentials => {
      console.log(credentials);
    }, error => {
      log.debug(`Error al añadir serie: ${error}`);
    });
  }

  public getStaff() {
    if ((!this.staff) && !this.isLoading) {
      this.isLoading = true;
      this.serieService.getStaff()
      .finally(() => {
        this.isLoading = false;
        this.staff = this.toChipsObject(this.staff);
      })
      .subscribe((staff: any) => { this.staff = staff; });
    }
  }

  getGenres() {
    if (!this.genres) {
      this.serieService.getGenres()
      .finally(() => {
        this.isLoading = false;
      })
      .subscribe((genres: Genre[]) => { this.genres = genres; });
    }
  }

  getDemographics() {
    if (!this.demographics) {
      this.serieService.getDemographics()
      .finally(() => {
        this.isLoading = false;
      })
      .subscribe((demographics: Demographic[]) => { this.demographics = demographics; });
    }
  }

  public getMagazines() {
    if (!this.magazines) {
      this.serieService.getMagazines()
      .finally(() => {
        this.isLoading = false;
        this.magazines = this.toChipsObject(this.magazines);
      })
      .subscribe((magazines: any) => { this.magazines = magazines; });
    }
  }

  /* Convierte el array con los valores necesarios para los chips */
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

  get genresSelected() {
    return this.genres
      .filter(opt => opt.checked)
      .map(opt => opt.id);
  }

}
