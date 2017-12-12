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
  search: (c: SerieContext) => `/serie/search?q=${c.q}&limit=${c.limit}`,
  genres: () => `/genre/list`,
  demographic: () => `/demographic/list`
};

export interface SerieContext {
  id?: number;
  q?: string;
  limit?: number;
}

@Injectable()
export class SerieService {

  constructor(private http: Http, private auth: AuthenticationService) { }

  getSerie(context: SerieContext): Observable<Serie> {
    return this.http.get(routes.serie(context))
      .map((res: Response) => res.json())
      .map(body => body)
      .catch(() => Observable.of('Error, no se encontró la serie.'));
  }

  setSerie(context: Serie): Observable<Serie> {
    if (this.auth.credentials === null) {
      return Observable.throw(new Error('Error, no logeado'));
    }
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
    return this.http.get(routes.series(query))
      .map((res: Response) => res.json())
      .map(body => body)
      .catch(() => Observable.of('Error'));
  }

  /*
  * Buscar series por sus nombres.
  */
  searchSeries(context: SerieContext): Observable<Serie> {
    return this.http.get(routes.search(context))
      .map((res: Response) => res.json())
      .catch(() => Observable.of('Error, No se encontraron series.'));
  }

  /*
   * Obtener todos los géneros de las series.
   */
  getGenres(): Observable<Genre[]> {
    return this.http.get(routes.genres())
      .map((res: Response) => res.json())
      .map(body => body)
      .catch(() => Observable.of('Error, no hay géneros.'));
  }

  /*
   * Obtener todos las demografias.
   */
  getDemographics(): Observable<Demographic[]> {
    return this.http.get(routes.demographic())
      .map((res: Response) => res.json())
      .map(body => body)
      .catch(() => Observable.of('Error, no hay Demografías.'));
  }

}
