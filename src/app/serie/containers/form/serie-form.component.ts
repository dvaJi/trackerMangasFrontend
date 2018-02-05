import { Logger } from '@app/core';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Staff, Magazine, Genre, Serie, Demographic } from '@app/models';
import { SerieService, StaffService, MagazineService } from '@app/services';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';

import * as fromSerie from '../../reducers';
import * as Form from '../../actions/serie-form';

const log = new Logger('Serie Add');

@Component({
  selector: 'app-serie-form',
  templateUrl: './serie-form.component.html',
  styleUrls: ['./serie-form.component.scss']
})
export class SerieFormComponent implements OnInit {
  isLoading: boolean;
  formAlert: { active: boolean; msg: string; type: string };
  genres$: Observable<Genre[]>;
  demographics$: Observable<Demographic[]>;
  serie$: Observable<Serie>;

  constructor(
    private serieService: SerieService,
    private staffService: StaffService,
    private magazineService: MagazineService,
    private store: Store<fromSerie.State>,
    private route: ActivatedRoute
  ) {
    this.genres$ = store.pipe(select(fromSerie.getGenres));
    this.demographics$ = store.pipe(select(fromSerie.getDemographics));
    this.serie$ = store.pipe(select(fromSerie.getFormSerie));
  }

  ngOnInit() {
    if (this.route.snapshot.routeConfig.path === 'serie/edit/:id') {
      const id: number = Number(this.route.snapshot.paramMap.get('id'));
      this.store.dispatch(new Form.SubmitGetSerie(id));
      this.store.dispatch(new Form.GetGenres(id));
    } else {
      this.store.dispatch(new Form.GetGenres(-1));
    }
    this.store.dispatch(new Form.GetDemographics());

    this.formAlert = {
      active: false,
      msg: '',
      type: ''
    };
  }

  onSubmit($event: Serie) {
    if (this.route.snapshot.routeConfig.path === 'serie/add') {
      $event.revision_type = 1;
      $event.revision_version = 1;
    } else {
      $event.revision_type = 2;
      $event.revision_version = 1;
    }
    this.store.dispatch(new Form.Submit($event));
  }

  /*onSubmit() {
    const serie: Serie = this.myform.value;
    serie.genres = this.genresSelected;
    this.serieService.setSerie(serie).subscribe(
      (response: any) => {
        this.formAlert = {
          active: true,
          msg: response.message,
          type: 'success'
        };
      },
      error => {
        this.formAlert = {
          active: true,
          msg: JSON.parse(error._body).message,
          type: 'danger'
        };
        log.debug(`Error al añadir serie: ${error}`);
      }
    );
  }*/

  public closeAlert(alert: { active: boolean; msg: string }) {
    this.formAlert = { active: false, msg: '', type: '' };
  }

  /*
  * Obtener Observable de staff según búsqueda
  */
  getStaff = (text: string): Observable<Response> => {
    return this.staffService.getStaffsByName({ q: text, limit: 10 });
  };

  /*
  * Obtener Observable de revistas según búsqueda
  */
  getMagazines = (text: string): Observable<Magazine> => {
    return this.magazineService.searchMagazine({ q: text, limit: 10 });
  };
}
