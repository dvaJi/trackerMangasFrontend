import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Serie, Magazine, Genre, Demographic, Staff } from '@app/models';
import { environment } from '@env/environment';

@Component({
  selector: 'app-series-form',
  template: `
  <form [formGroup]="form" (ngSubmit)="submit()">
    <div class="form-group">
        <label for="name-input" translate>Nombre</label>
        <input id="name-input" minlength="1" type="text"
        class="form-control" formControlName="name" placeholder="{{'Nombre de la serie' | translate}}"
        required />
    </div>
    <div class="form-group">
        <label for="alt-names-input" translate>Nombres Alternativos</label>
        <tag-input name="altNames" id="alt-names-input" formControlName="altNames" [identifyBy]="'id'"
        [displayBy]="'name'" [secondaryPlaceholder]="'Presionar Enter después de escribir el nombre.'"></tag-input>
    </div>
    <div class="form-row">
        <div class="form-group col-md-4">
        <label for="type-dropdown" translate>Tipo</label>
        <select id="type-dropdown" formControlName="type" class="custom-select d-block col-md-12">
            <option value="{{type}}" *ngFor="let type of types" required>{{type}}</option>
        </select>
        </div>
        <div class="form-group col-md-4">
        <label for="year-input" translate>Fecha publicación</label>
        <div class="input-group">
            <input class="form-control" formControlName="publication_date"
            placeholder="yyyy-mm-dd" name="publicationDate" [navigation]="'select'"
            ngbDatepicker #d="ngbDatepicker" />
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" (click)="d.toggle()" type="button">
                    <i class="fa fa-calendar"></i>
                </button>
            </div>
        </div>
        </div>
        <div class="form-group col-md-4">
        <label for="completelysc-dropdown" translate>Estado traducción</label>
        <select formControlName="completely_sc" class="custom-select d-block col-md-12" id="completelysc-dropdown">
            <option value="1" selected translate>Completado</option>
            <option value="2" translate>En Curso</option>
            <option value="3" translate>Abandonado</option>
        </select>
        </div>
    </div>
    <div class="form-group">
        <label for="description-input" translate>Descripción</label>
        <textarea formControlName="description" class="form-control" id="description-input" rows="3"></textarea>
    </div>
    <div class="form-row">
        <div class="form-group col-md-6">
        <label for="author-input" translate>Guión</label>
        <tag-input [secondaryPlaceholder]="'Buscar...'" [identifyBy]="'id'"
            [displayBy]="'name'" formControlName="author">
            <tag-input-dropdown [autocompleteObservable]="getStaff"
            [identifyBy]="'id'" [displayBy]="'name'"></tag-input-dropdown>
        </tag-input>
        </div>
        <div class="form-group col-md-6">
        <label for="art-input" translate>Arte</label>
        <tag-input [secondaryPlaceholder]="'Buscar...'" [identifyBy]="'id'"
            [displayBy]="'name'" formControlName="artist">
            <tag-input-dropdown [autocompleteObservable]="getStaff"
            [identifyBy]="'id'" [displayBy]="'name'"></tag-input-dropdown>
        </tag-input>
        </div>
    </div>
    <div class="form-group">
        <label for="magazines" translate>Revista</label>
        <tag-input [secondaryPlaceholder]="'Buscar...'" [identifyBy]="'id'"
            [displayBy]="'name'" formControlName="magazine">
        <tag-input-dropdown [autocompleteObservable]="getMagazines"
        [identifyBy]="'id'" [displayBy]="'name'"></tag-input-dropdown>
        </tag-input>
    </div>
    <div class="form-row">
        <div class="form-group col-md-4">
        <label for="statusoc-dropdown" translate>Estado en país origen</label>
        <select id="statusoc-dropdown" formControlName="status_oc" class="custom-select d-block col-md-12">
            <option value="1" selected translate>Completado</option>
            <option value="2" translate>En curso</option>
            <option value="3" translate>Cancelado</option>
            <option value="4" translate>Hiatus</option>
        </select>
        </div>
        <div class="form-group col-md-8">
        <label for="statusoc-note" translate>&zwnj;</label>
        <input id="statusoc-note" formControlName="status_oc_note" type="text" class="col-md-10 form-control"
            placeholder="Completado con 10 Tomos y 2 extras, en hiatus en el capítulo 64, etc."
        />
        </div>
    </div>
    <div class="form-group">
        <label for="licensed-publisher" translate>Licenciado</label>
        <select id="licensed-publisher" formControlName="licensed" class="custom-select d-block col-md-12">
        <option value="0" selected>No</option>
        <option value="1" selected>Sí</option>
        <!--<option value="magazine.value" *ngFor="let magazine of magazines">{{magazine.display}}</option>-->
        </select>
    </div>
    <div class="form-group">
        <label class="d-block" translate>Portada</label>
        <div class="custom-file">
            <input type="file" id="cover"  class="custom-file-input" lang="es"
                (change)="onFileChange($event)"#fileInput />
            <label class="custom-file-label" for="cover">Seleccionar Archivo</label>
        </div>
    </div>
    <div class="form-group">
        <label class="d-block" translate>Demografía</label>
        <div class="custom-control custom-radio custom-control-inline col-md-3" *ngFor="let demo of demographics">
            <input type="radio" id="{{demo?.id}}" class="custom-control-input"
                formControlName="id_demographic" value="{{demo.id}}">
            <label class="custom-control-label" for="{{demo?.id}}">{{demo?.name}}</label>
        </div>
    </div>
    <div class="form-group">
        <label class="d-block" translate>Géneros</label>
        <div class="custom-control custom-checkbox custom-control-inline col-md-3" *ngFor="let genre of genres">
            <input type="checkbox" class="custom-control-input" id="{{genre?.name}}"
                [checked]="genre.checked" (change)="onGenreChange($event, genre)">
            <label class="custom-control-label" for="{{genre?.name}}">{{genre.name}}</label>
        </div>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  `,
  styles: [``]
})
export class SerieFormComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  @Input() getStaff: Observable<Response>;
  @Input() getMagazines: Observable<Magazine>;
  @Input() genres: Genre[];
  @Input() demographics: Demographic[];
  @Input()
  set serie(serie: Serie) {
    if (serie !== null) {
      this.serieForm = serie;
    }
  }

  @Output() submitted = new EventEmitter<Serie>();

  form: FormGroup = new FormGroup({
    id_serie: new FormControl(null),
    uniqid: new FormControl(null),
    name: new FormControl(),
    altNames: new FormControl(),
    type: new FormControl(),
    description: new FormControl(),
    author: new FormControl(),
    artist: new FormControl(),
    magazine: new FormControl(),
    status_oc: new FormControl(),
    status_oc_note: new FormControl(),
    completely_sc: new FormControl(),
    publication_date: new FormControl(),
    licensed: new FormControl(),
    licensedLanguage: new FormControl(),
    id_demographic: new FormControl(),
    cover: new FormControl(),
    genres: new FormControl()
  });

  constructor() {}

  ngOnInit() {}

  set serieForm(serie: any) {
    this.form.controls['id_serie'].setValue(serie.id);
    this.form.controls['uniqid'].setValue(serie.uniqid);
    this.form.controls['name'].setValue(serie.name);
    this.form.controls['altNames'].setValue(serie.names);
    this.form.controls['type'].setValue(serie.type);
    this.form.controls['description'].setValue(serie.description);
    this.form.controls['author'].setValue(this.getAuthors(serie.staff));
    this.form.controls['artist'].setValue(this.getArtists(serie.staff));
    this.form.controls['magazine'].setValue(serie.magazines);
    this.form.controls['status_oc'].setValue(serie.status_oc);
    this.form.controls['status_oc_note'].setValue(serie.status_oc_note);
    this.form.controls['completely_sc'].setValue(serie.completely_sc);
    this.form.controls['publication_date'].setValue(serie.publication_date);
    this.form.controls['licensed'].setValue(serie.licensed);
    this.form.controls['id_demographic'].setValue(serie.id_demographic);
    this.form.controls['cover'].setValue(serie.cover);
    this.form.controls['genres'].setValue(serie.genres);
  }

  get types() {
    return ['Manga', 'Manhwa', 'Manhua', 'Artbook', 'Doujinshi', 'Drama CD', 'Novela Ligera'];
  }

  getAuthors(staffs: Staff[]) {
    return [staffs.find(staff => Number(staff.id_roles) === 1)];
  }

  getArtists(staffs: Staff[]) {
    return [staffs.find(staff => Number(staff.id_roles) === 2)];
  }

  submit() {
    if (this.form.valid) {
      this.submitted.emit(this.form.value);
    } else if (!environment.production && !this.form.valid) {
      console.log(this.findInvalidControls());
    }
  }

  findInvalidControls() {
    const invalid = [];
    const controls = this.form.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

  onGenreChange(event: any, genre: Genre) {
    const formGenres: Genre[] = [...this.form.get('genres').value] || [];
    const isChecked = formGenres.find(gen => gen.id === genre.id) !== undefined;
    if (!isChecked) {
      formGenres.push(genre);
    } else {
      formGenres.forEach(gen => {
        if (gen.id === genre.id) {
          formGenres.splice(formGenres.indexOf(gen), 1);
        }
      });
    }
    this.form.controls['genres'].setValue(formGenres);
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
        this.form.get('cover').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        });
      };
    }
  }
}
