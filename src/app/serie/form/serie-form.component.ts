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
  types: string[];
  isLoading: boolean;
  publicationDate: DateModel;
  datePickerOptions: DatePickerOptions;

  constructor(private serieService: SerieService) {
    this.datePickerOptions = new DatePickerOptions();
  }

  ngOnInit() {
    this.myform = new FormGroup({
      name: new FormControl(),
      altNames: new FormControl(),
      type: new FormControl(),
      description: new FormControl(),
      author: new FormControl(),
      artist: new FormControl(),
      magazine: new FormControl(),
      statusOC: new FormControl(),
      statusSC: new FormControl(),
      publicationDate: new FormControl(),
      licensedPublisher: new FormControl(),
      licensedLanguage: new FormControl(),
      cover: new FormControl()
    });
    this.types = ['Manga', 'Manhwa', 'Manhua', 'Artbook', 'Doujinshi', 'Drama CD', 'Novela Ligera'];
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myform.get('cover').setValue(file);
    }
  }

  onSubmit() {
    const serie: Serie = this.myform.value;
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
      .subscribe((staff: any) => { this.staff = staff.staffs; });
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

  public getMagazines() {
    if (!this.magazines) {
      this.serieService.getMagazines()
      .finally(() => {
        this.isLoading = false;
        this.magazines = this.toChipsObject(this.magazines.magazines);
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
      }
      nuevaLista.push(obj);
    });

    return nuevaLista;
  }

}
