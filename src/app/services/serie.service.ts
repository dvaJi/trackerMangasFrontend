import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import Serie from './../models/serie';
import Genre from './../models/genre';
import Staff from './../models/staff';
import Magazine from './../models/magazine';
import Demographic from './../models/demographic';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../core/authentication/authentication.service';

const routes = {
  serie: (c: SerieContext) => `/serie/page/${c.id}`,
  serieSet: () => `/serie/page`,
  series: (query: any) => `/serie/list?type=${query.type}&order=${query.order}&time=${query.time}&limit=${query.limit}`,
  genres: () => `/genre/list`,
  staffs: () => `/staffs/list`,
  magazines: () => `/magazine/list`,
  demographic: () => `/demographic/list`
};

export interface SerieContext {
  id: number;
}

@Injectable()
export class SerieService {

  constructor(private http: Http, private auth: AuthenticationService) { }

  getSerie(context: SerieContext): Observable<Serie> {
    const options = new RequestOptions({
      headers: new Headers({ Authorization: `Bearer ${this.auth.credentials.token}` })
    });
    return this.http.get(routes.serie(context), options)
      .map((res: Response) => res.json())
      .map(body => body)
      .catch(() => Observable.of('Error, no se encontró la serie.'));
  }

  setSerie(context: Serie): Observable<Serie> {
    const options = new RequestOptions({
      headers: new Headers({
        Authorization: `Bearer ${this.auth.credentials.token}`,
        'Content-Type': false,
        'Accept': 'application/json'
      })
    });
    return this.http.post(routes.serieSet(), context, options)
      .map((res: any) => res.json())
      .flatMap((data: any) => {
        return Observable.of(data);
      });
  }

  getSeries(query: any): Observable<Array<Serie>> {
    const headers = new Headers({ Authorization: `Bearer ${this.auth.credentials.token}` });
    const options = new RequestOptions({ withCredentials: true, headers });
    return this.http.get(routes.series(query), options)
      .map((res: Response) => res.json())
      .map(body => body)
      .catch(() => Observable.of('Error'));
  }

  /*
   * Obtener todos los géneros de las series.
   */
  getGenres(): Observable<Genre[]> {
    const options = new RequestOptions({
      headers: new Headers({ Authorization: `Bearer ${this.auth.credentials.token}` })
    });
    return this.http.get(routes.genres(), options)
      .map((res: Response) => res.json())
      .map(body => body)
      .catch(() => Observable.of('Error, no hay géneros.'));
  }

  /*
   * Obtener todos los géneros de las series.
   */
  getStaff(): Observable<Response> {
    const options = new RequestOptions({
      headers: new Headers({ Authorization: `Bearer ${this.auth.credentials.token}` })
    });
    return this.http.get(routes.staffs(), options)
      .map((res: Response) => res.json())
      .map(body => body)
      .catch(() => Observable.of('Error, no hay Staff.'));
  }

  /*
   * Obtener todos las revistas.
   */
  getMagazines(): Observable<Magazine[]> {
    const options = new RequestOptions({
      headers: new Headers({ Authorization: `Bearer ${this.auth.credentials.token}` })
    });
    return this.http.get(routes.magazines(), options)
      .map((res: Response) => res.json())
      .map(body => body)
      .catch(() => Observable.of('Error, no hay Revistas.'));
  }

  /*
   * Obtener todos las demografias.
   */
  getDemographics(): Observable<Demographic[]> {
    const options = new RequestOptions({
      headers: new Headers({ Authorization: `Bearer ${this.auth.credentials.token}` })
    });
    return this.http.get(routes.demographic(), options)
      .map((res: Response) => res.json())
      .map(body => body)
      .catch(() => Observable.of('Error, no hay Demografías.'));
  }

}
